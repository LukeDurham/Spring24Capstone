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



//get user roles
app.get("/api/roles", async (req, res) => {
    try {
        // Query the database to get role IDs and names
        const queryResult = await pool.query('SELECT id, name FROM roles');

        // Send the roles with their IDs and names as JSON response
        res.json({ roles: queryResult.rows });
    } catch (error) {
        console.error('Error fetching roles:', error);
        res.status(500).json({ message: 'Failed to fetch roles' });
    }
});

// Create a new role
//3/25/2024 made to have create role page to work with permissions.
app.post("/api/roles", async (req, res) => {
    try {
        const { name } = req.body;

        // Check if role name is provided
        if (!name) {
            return res.status(400).json({ message: 'Role name is required' });
        }

        // Query the database to insert a new role
        const queryResult = await pool.query('INSERT INTO roles (name) VALUES ($1) RETURNING id, name', [name]);

        // Send the newly created role as JSON response
        res.status(201).json({ role: queryResult.rows[0] });
    } catch (error) {
        console.error('Error creating role:', error);
        res.status(500).json({ message: 'Failed to create role' });
    }
});



app.get('/api/verifyRole/:roleId', async (req, res) => {
    const { roleId } = req.params;
  
    try {
      // Dynamically fetch the valid permissions for the role
      // This might involve querying your database to get permissions
      // based on the role's specific requirements or business logic
      const validPermissionsResult = await db.query(`
        SELECT permission_id
        FROM role_valid_permissions
        WHERE role_id = $1
      `, [roleId]);
  
      // Extract permission IDs into an array
      const validPermissions = validPermissionsResult.rows.map(row => row.permission_id);
  
      // Now verify if the role has these valid permissions
      // Adjust the query to fit your database schema
      const rolePermissionsResult = await db.query(`
        SELECT p.id AS permission_id
        FROM roles r
        JOIN role_permissions rp ON r.id = rp.role_id
        JOIN permissions p ON rp.permission_id = p.id
        WHERE r.id = $1
      `, [roleId]);
  
      // Check if the role has all the valid permissions
      // This logic might need to be adjusted based on how you define "valid"
      const hasValidPermissions = rolePermissionsResult.rows.every(row =>
        validPermissions.includes(row.permission_id)
      );
  
      res.json({ isRoleValid: hasValidPermissions });
    } catch (error) {
      console.error('Error verifying role:', error);
      res.status(500).send('Server error during role verification.');
    }
  });

  app.get('/api/verifyRole/:roleId', async (req, res) => {
    const { roleId } = req.params;
  
    try {
      // Query to check if the role has the correct permissions
      // This is a simplified example; adjust according to your schema and needs
      const queryResult = await db.query(`
        SELECT p.id AS permission_id
        FROM roles r
        JOIN role_permissions rp ON r.id = rp.role_id
        JOIN permissions p ON rp.permission_id = p.id
        WHERE r.id = $1
      `, [roleId]);
  
      // Assuming permissions 1, 2, and 3 are valid for role creation
      const validPermissions = [1, 2, 3];
      const isRoleValid = queryResult.rows.some(row => validPermissions.includes(row.permission_id));
  
      res.json({ isRoleValid });
    } catch (error) {
      console.error('Error verifying role:', error);
      res.status(500).send('Server error during role verification.');
    }
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



//endpoint for creating a question
app.post("/api/questions", async (req, res) => {
    const { question_type, question, options } = req.body;

    try {
        // Generate a random integer ID for the question

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


//Get all user emails and IDs
app.get("/api/users", async (req, res) => {
    try {
        // Query the database to get all user emails and their IDs
        const queryResult = await pool.query('SELECT id, email FROM users');

        // Send the query result as JSON response
        res.json(queryResult.rows);
    } catch (error) {
        console.error('Error fetching user emails and IDs:', error);
        res.status(500).json({ message: 'Failed to fetch user emails and IDs' });
    }
});

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


//api call for assign-user-role
app.post("/api/assign_role", async (req, res) => {
    const { userId, roleId } = req.body; // Correctly use userId and roleId

    try {
        await pool.query('BEGIN');

        // Generate a random ID for user_roles entry. Consider using a sequence or UUID in production for uniqueness.
        const randomId = Math.floor(Math.random() * 1000000);

        // Insert the new record with the provided userId and roleId
        await pool.query(
            "INSERT INTO user_roles (id, user_id, role_id) VALUES ($1, $2, $3)",
            [randomId, userId, roleId]
        );

        await pool.query('COMMIT');
        res.status(201).json({ message: 'Role assigned successfully' });
    } catch (error) {
        await pool.query('ROLLBACK');
        console.error('Error assigning role:', error);
        res.status(500).json({ message: 'Failed to assign role' });
    }
});

//create Survey Template

app.post("/api/survey_templates", async (req, res) => {
    const { name } = req.body;

    try {
        // Insert the survey template into the database without specifying the ID
        const result = await pool.query(
            "INSERT INTO survey_templates (name) VALUES ($1) RETURNING id",
            [name]
        );

        // Retrieve the auto-generated ID
        const id = result.rows[0].id;

        res.status(201).json({ message: 'Survey template created successfully', id });
    } catch (error) {
        console.error('Error creating survey template:', error);
        res.status(500).json({ message: 'Failed to create survey template' });
    }
});


// Endpoint to fetch all survey templates
app.get("/api/survey_templates", async (req, res) => {
    try {
        // Query the database to get all survey templates
        const queryResult = await pool.query('SELECT * FROM survey_templates');

        // Send the survey templates as JSON response
        res.json({ survey_templates: queryResult.rows });
    } catch (error) {
        console.error('Error fetching survey templates:', error);
        res.status(500).json({ message: 'Failed to fetch survey templates' });
    }
});


// Endpoint for creating a survey question
app.post("/api/survey_questions", async (req, res) => {
    const { survey_template_id, question_id, description } = req.body;

    try {
        // Insert the survey question into the database
        const result = await pool.query(
            "INSERT INTO survey_template_questions (survey_template_id, question_id, description, created_at, updated_at) VALUES ($1, $2, $3, NOW(), NOW()) RETURNING *;",
            [survey_template_id, question_id, description]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating survey question:', error);
        res.status(500).json({ message: 'Failed to create survey question' });
    }
});


//login api endpoint 
app.post("/api/login", async (req, res) => {
    const { username, email } = req.body;

    try {
        const userRes = await pool.query(
            'SELECT id FROM users WHERE username = $1 AND email = $2',
            [username.trim(), email.trim()]
        );

        if (userRes.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = userRes.rows[0];

        const userRolesRes = await pool.query(
            'SELECT role_id FROM user_roles WHERE user_id = $1',
            [user.id]
        );

        if (userRolesRes.rows.length === 0) {
            return res.status(404).json({ message: 'No roles found for user' });
        }

        let userRole = null; // Keep track of the user's role
        for (const userRoleRow of userRolesRes.rows) {
            const rolesRes = await pool.query(
                'SELECT name FROM roles WHERE id = $1',
                [userRoleRow.role_id]
            );

            if (rolesRes.rows.length > 0) {
                const roleName = rolesRes.rows[0].name;
                if (roleName === 'Admin' || roleName === 'Surveyor') {
                    userRole = roleName; // Set role to Admin or Surveyor
                    break; // Stop once a matching role is found
                }
            }
        }

        res.json({ role: userRole }); // Respond with the user's role

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Login failed due to server error' });
    }
});


// Endpoint for creating a survey
app.post("/api/surveys", async (req, res) => {
    const { survey_template_id, surveyor_id, organization_id, project_id, surveyor_role_id } = req.body;

    try {
        // Find the maximum ID from the surveys table
        const maxIdResult = await pool.query('SELECT MAX(id) FROM surveys');
        const maxId = maxIdResult.rows[0].max || 0;
        const newId = maxId + 1;

        // Insert the survey into the database with the new ID
        await pool.query(
            "INSERT INTO surveys (id, survey_template_id, surveyor_id, organization_id, project_id, surveyor_role_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())",
            [newId, survey_template_id, surveyor_id, organization_id, project_id, surveyor_role_id]
        );

        res.status(201).json({ message: 'Survey created successfully', id: newId });
    } catch (error) {
        console.error('Error creating survey:', error);
        res.status(500).json({ message: 'Failed to create survey' });
    }
});



// Get all Question Types
app.get("/api/question_types", async (req, res) => {
    try {
        // Query the database to get all question types
        const queryResult = await pool.query('SELECT * FROM question_types');

        // Send the query result as JSON response
        res.json(queryResult.rows);
    } catch (error) {
        console.error('Error fetching question types:', error);
        res.status(500).json({ message: 'Failed to fetch question types' });
    }
});

// Get all Organizations
app.get("/api/organizations", async (req, res) => {
    try {
        // Query the database to get all organizations
        const queryResult = await pool.query('SELECT * FROM organizations');

        // Send the query result as JSON response
        res.json(queryResult.rows);
    } catch (error) {
        console.error('Error fetching organizations:', error);
        res.status(500).json({ message: 'Failed to fetch organizations' });
    }
});

// Get all Projects
app.get("/api/projects", async (req, res) => {
    try {
        // Query the database to get all projects
        const queryResult = await pool.query('SELECT * FROM projects');

        // Send the query result as JSON response
        res.json(queryResult.rows);
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ message: 'Failed to fetch projects' });
    }
});



//3/25/24 Made a permission api to create the perismission for role
// Express route for creating a new permission
// POST endpoint for creating a new role
app.post('/api/permissions', requireAuth, async (req, res) => {
    try {
        // Retrieve user_id from the session
        const { user_id } = req.user;

        // Extract role name from request body
        const { name } = req.body;

        // Insert the new role into the database along with the createdBy user_id
        await pool.query('INSERT INTO roles (name, created_by) VALUES ($1, $2)', [name, user_id]);

        // Send success response
        res.status(201).json({ message: 'Role created successfully' });
    } catch (error) {
        console.error('Error creating role:', error);
        res.status(500).json({ message: 'Failed to create role' });
    }
});




// Example middleware to check authentication
function requireAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}



app.listen(5000, () => {
    console.log("Server started on port 5000");
});
