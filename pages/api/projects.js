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
  const { slug } = req.query; // Extract slug from query parameters
  if (!slug) {
    res.status(400).json({ error: 'Slug is required' });
    return;
  }

  try {
    const result = await pool.query('SELECT * FROM ashley.project1 WHERE slug = $1', [slug]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching project:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}