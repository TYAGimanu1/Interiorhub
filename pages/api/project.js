import { query } from '@/lib/db';

export default async function handler(req, res) {
  try {
    const result = await pool.query('SELECT * FROM project');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
