import { Pool } from 'pg';

// Initialize the database connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Use the most reliable SSL config for Render
  ssl: {
    rejectUnauthorized: false, 
  },
  max: 10, 
  idleTimeoutMillis: 30000, 
  connectionTimeoutMillis: 5000, 
});

export default async function handler(req, res) {
  // 1. Ensure the request method is POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed', details: 'Only POST requests are accepted.' });
  }

  const { firstname, lastname, email, phn, category, userdescription } = req.body;

  // 2. Simple input validation
  if (!firstname || !lastname || !email || !phn) {
    return res.status(400).json({ error: 'Bad Request', details: 'Missing required fields: firstname, lastname, email, or phn.' });
  }

  // 3. Define the SQL INSERT query
  const queryText = `
    INSERT INTO ashley."user" 
    (firstname, lastname, email, phn, category, userdescription) 
    VALUES ($1, $2, $3, $4, $5, $6) 
    RETURNING *;`; // RETURNING * allows us to see the inserted row

  const queryValues = [
    firstname, 
    lastname, 
    email, 
    phn, 
    category || null, // Allow category to be NULL if not provided
    userdescription || null // Allow description to be NULL if not provided
  ];

  try {
    const result = await pool.query(queryText, queryValues);
    
    // Success: Return the newly inserted row
    res.status(201).json({ 
      message: 'User successfully saved.',
      user: result.rows[0] 
    });
    
  } catch (error) {
    console.error('Database Error during user insertion:', error);

    // Handle specific errors like unique violation for email
    if (error.code === '23505' && error.constraint === 'user_email_key') {
      return res.status(409).json({ error: 'Conflict', details: 'The provided email address is already in use.' });
    }

    // General server error
    res.status(500).json({ 
      error: 'Internal Server Error', 
      details: 'Failed to save user data due to a database issue.' 
    });
  }
}