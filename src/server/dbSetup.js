require('dotenv').config();
const { Pool } = require('pg');
const fs = require('fs');

// Initialize a new pool using environment variables
const pool = new Pool();

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
setupDatabase();
