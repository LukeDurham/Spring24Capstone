require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
// Ensure you're importing the pool instance correctly
const pool = require('./dbSetup');

const app = express();

app.use(bodyParser.json());

app.get("/api", (req, res) => {
    res.json({ "users": ["Admin", "Surveyor", "Respondent"] });
});



app.get("/api/get_question_types", async (req, res) => {
    try {
        // Query the database to get the unique names of question types
        const queryResult = await pool.query('SELECT DISTINCT name FROM question_types');

        // Extract the names from the query result
        const questionTypes = queryResult.rows.map(row => row.name);

        // Send the unique question types as JSON response
        res.json({ questionTypes });
    } catch (error) {
        console.error('Error fetching question types:', error);
        res.status(500).json({ message: 'Failed to fetch question types' });
    }
});

app.post("/api/question_types", async (req, res) => {
    const { name } = req.body;
    try {
        // Generate a random integer ID for the question type
        const questionTypeId = generateRandomInteger();

        const result = await pool.query(
            "INSERT INTO question_types (id, name, created_at, updated_at) VALUES ($1, $2, NOW(), NOW()) RETURNING *;",
            [questionTypeId, name]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating question type:', error);
        res.status(500).json({ message: 'Failed to create question type' });
    }
});

// Function to generate a random integer ID
function generateRandomInteger() {
    // Generate a random number between 1 and 1000000 (adjust the range as needed)
    return Math.floor(Math.random() * 1000000) + 1;
}

//endpoint for creating a question
app.post("/api/questions", async (req, res) => {
    const { question_type, question, options } = req.body;

    try {
        // Generate a random integer ID for the question
        const question_id = generateRandomInteger();

        // Find the question type ID based on the question type name
        const questionTypeResult = await pool.query('SELECT id FROM question_types WHERE name = $1', [question_type]);
        const question_type_id = questionTypeResult.rows[0].id;

        // Insert the question into the database
        const result = await pool.query(
            "INSERT INTO questions (id, question_type_id, question, created_at, updated_at) VALUES ($1, $2, $3, NOW(), NOW()) RETURNING *;",
            [question_id, question_type_id, question]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating question:', error);
        res.status(500).json({ message: 'Failed to create question' });
    }
});




// Endpoint for creating a new user
app.post("/api/users", async (req, res) => {
    const { username, email } = req.body;

    try {
        // Start a transaction
        await pool.query('BEGIN');

        // Get the current number of users to determine the next ID
        const countRes = await pool.query('SELECT COUNT(*) FROM users');
        const nextId = parseInt(countRes.rows[0].count, 10) + 1;

        // Insert the new user with the calculated ID
        const insertRes = await pool.query(
            "INSERT INTO users (id, username, email, created_at, updated_at) VALUES ($1, $2, $3, NOW(), NOW()) RETURNING *;",
            [nextId, username, email]
        );

        // Commit the transaction
        await pool.query('COMMIT');

        res.status(201).json(insertRes.rows[0]);
    } catch (error) {
        // Rollback the transaction in case of error
        await pool.query('ROLLBACK');

        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Failed to create user' });
    }
});


// //endpoint for creating a survey
// app.post("/api/surveys", async (req, res) => {
//     const { question, options } = req.body;

//     try {
//         // Insert the new survey into the database
//         const result = await pool.query(
//             "INSERT INTO surveys (question, options, created_at, updated_at) VALUES ($1, $2, NOW(), NOW()) RETURNING *;",
//             [question, options]
//         );
//         res.status(201).json(result.rows[0]);
//     } catch (error) {
//         console.error('Error creating survey:', error);
//         res.status(500).json({ message: 'Failed to create survey' });
//     }
// });





// Endpoint for creating a new question
app.post("/api/questions", async (req, res) => {
    const { question_type_id, question, created_at, updated_at } = req.body;
    try {
        const result = await pool.query(
            "INSERT INTO questions (question_type_id, question, created_at, updated_at) VALUES ($1, $2, $3, $4) RETURNING *;",
            [question_type_id, question, created_at, updated_at]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating question:', error);
        res.status(500).json({ message: 'Failed to create question' });
    }
});




app.listen(5000, () => {
    console.log("Server started on port 5000");
});
