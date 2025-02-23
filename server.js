// server.js
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Setup SQL connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 3306
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
        process.exit(1);
    }
    console.log('Connected to the database.');
});

// Sign-up API endpoint
app.post('/api/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Basic backend validation
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const query = 'INSERT INTO users (name, email, pass) VALUES (?, ?, ?)';
        db.query(query, [name, email, hashedPassword], (error, results) => {
            if (error) {
                console.error('Database error during sign-up: ', error);
                return res.status(500).json({ error: 'Database error.' });
            }
            res.status(200).json({ message: 'User successfully registered.' });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error.' });
    }
});

// Sign-in API endpoint
app.post('/api/signin', (req, res) => {
    const { email, password } = req.body;

    if (!email || password) {
        return res.status(400).json({ error: 'Missing email or password.' });
    }

    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], async (error, results) => {
        if (error) {
            console.error('Database error during sign-in: ', error);
            return res.status(500).json({ error: 'Database error.' });
        }

        if (results.length === 0) {
            return res.status(500).json({ error: 'Database error.' });
        }

        const user = results[0];
        const match = await bcrypt.compare(password, user.password);

        if (match) {
            return res.status(200).json({ message: 'User signed in successfully.' });
        } else {
            return res.status(401).json({ error: 'Incorrect password.' });
        }
    });
});

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});