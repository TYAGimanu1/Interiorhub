// pages/api/project.js
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // CRITICAL FIX: Explicitly allow self-signed certificates for Render connection
  ssl: {
    rejectUnauthorized: false, 
  },
  max: 10,
  idleTimeoutMillis: 30000, 
  connectionTimeoutMillis: 5000, 
});

export default async function handler(req, res) {
  const retryAttempts = 3;
  let attempt = 0;

  // FIX: Query to fetch ALL projects (all IDs and data) from the correct table
  const queryText = 'SELECT * FROM ashley.project1';

  while (attempt < retryAttempts) {
    try {
      const result = await pool.query(queryText);
      res.status(200).json(result.rows);
      return;
    } catch (error) {
      attempt++;
      console.error(`Attempt ${attempt} - Error fetching all projects:`, {
        message: error.message,
        code: error.code,
      });

      if (attempt >= retryAttempts) {
        res.status(500).json({
          error: 'Internal Server Error - DB Connection Failed',
          details: {
            message: error.message,
            code: error.code,
          },
        });
        return;
      }
    }
  }
}