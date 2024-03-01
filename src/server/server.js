require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const dbSetup = require('./dbSetup'); // Import dbSetup file




const app = express(); // Uses environment variables for configuration


app.use(bodyParser.json());

app.get("/api", (req, res) => {
    res.json({ "users": ["Admin", "Surveyor", "Respondent"] });
});



// Endpoint for creating a new user
app.post("/api/users", async (req, res) => {
    const { username, email, password } = req.body; // Extract password from request body
    try {
        const result = await pool.query(
            "INSERT INTO users (username, email, password, created_at, updated_at) VALUES ($1, $2, $3, NOW(), NOW()) RETURNING *;",
            [username, email, password] // Include password in SQL query parameters
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Failed to create user' });
    }
});


app.listen(5000, () => {
    console.log("Server started on port 5000");
});
