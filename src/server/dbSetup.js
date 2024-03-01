require('dotenv').config();
const { Pool } = require('pg');
const fs = require('fs');

// Initialize a new pool using environment variables
// Explicitly parse and use environment variables for the Pool configuration
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: String(process.env.DB_PASSWORD), // Ensure this is treated as a string
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432, // Parse port as integer
});

module.exports = pool;
// const testDatabaseConnection = async () => {
//   try {
//     const res = await pool.query('SELECT NOW()');
//     console.log('Connection test successful:', res.rows);
//     pool.end(); // Close the pool after testing the connection
//   } catch (err) {
//     console.error('Database connection test failed:', err);
//     pool.end(); // Ensure the pool is closed even if there's an error
//   }
// };


// Function to read the SQL file and execute its commands
const setupDatabase = async () => {
  try {
    // Specify the full path to your SQL file
    const sqlFilePath = 'C:/Users/luked/Desktop/Spring24Capstone/db/Customer Survey Capstone.sql';

    // Read the SQL file
    const sqlQuery = fs.readFileSync(sqlFilePath, { encoding: 'utf-8' });

    // Connect to the database
    const client = await pool.connect();

    // Split the file content by SQL statement terminator if necessary
    // This example assumes you can execute all commands in a single batch
    await client.query(sqlQuery);
    
    console.log('Database setup completed successfully.');

    // Release the client back to the pool
    client.release();
  } catch (err) {
    console.error('Error setting up the database:', err);
  }
};

// Execute the setup function
// testDatabaseConnection();
setupDatabase();


