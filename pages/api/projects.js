import { Pool } from 'pg';

const pool = new Pool({
  // Use the full connection string from your .env.local
  connectionString: process.env.DATABASE_URL,
  
  // FIX: Explicitly tells Node to ignore self-signed certificate errors, 
  // which is mandatory for many cloud providers like Render.
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

  // Correctly querying the table within the 'ashley' schema
   const queryText = 'SELECT * FROM ashley.project1';

  while (attempt < retryAttempts) {
    try {
      const result = await pool.query(queryText);
      res.status(200).json(result.rows);
      return;
    } catch (error) {
      attempt++;
      console.error(`Attempt ${attempt} - Error fetching ${queryText}:`, {
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