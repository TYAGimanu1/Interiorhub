// pages/api/projects.js
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // CRITICAL: Must be false for Render's SSL certificates
  ssl: {
    rejectUnauthorized: false, 
  },
  max: 10, 
  idleTimeoutMillis: 30000, 
  // Increase connection timeout for Vercel cold starts
  connectionTimeoutMillis: 5000, 
});

export default async function handler(req, res) {
  const retryAttempts = 3;
  let attempt = 0;

  // FIX: Use the correct schema and table name
  const queryText = 'SELECT * FROM ashley.project1'; 

  while (attempt < retryAttempts) {
    try {
      const result = await pool.query(queryText);
      // Ensure the array is not empty before sending (optional check)
      if (result.rows.length === 0) {
          console.warn("Database returned 0 rows. Check 'ashley.project1' data.");
      }
      res.status(200).json(result.rows);
      return;
    } catch (error) {
      attempt++;
      console.error(`Attempt ${attempt} - Runtime DB Error:`, error.message);

      if (attempt >= retryAttempts) {
        // Return 500 status if DB connection permanently fails
        res.status(500).json({
          error: 'Internal Server Error - Database Unavailable at Runtime',
          details: error.message,
        });
        return;
      }
    }
  }
}