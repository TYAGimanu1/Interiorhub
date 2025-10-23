// pages/api/projects.js
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Allow self-signed certificates
  },
  max: 10, // Maximum number of connections
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 5000, // Return an error after 5 seconds if connection cannot be established
});

export default async function handler(req, res) {
  const { category } = req.query; // Extract category from query parameters
  const retryAttempts = 3;
  let attempt = 0;

  // Adjust query to filter by category if provided
  const queryText = category
    ? 'SELECT * FROM ashley.project1 WHERE category = $1'
    : 'SELECT * FROM ashley.project1';
  const queryParams = category ? [category] : [];

  while (attempt < retryAttempts) {
    try {
      const result = await pool.query(queryText, queryParams);
      if (result.rows.length === 0) {
        res.status(404).json({ error: 'No projects found for the specified category.' });
        return;
      }
      res.status(200).json(result.rows);
      return;
    } catch (error) {
      attempt++;
      console.error(`Attempt ${attempt} - Error fetching projects:`, error.message);

      if (attempt >= retryAttempts) {
        res.status(500).json({
          error: 'Internal Server Error',
          details: error.message,
        });
        return;
      }
    }
  }
}