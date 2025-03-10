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

        const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
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

    if (!email || !password) {
        return res.status(400).json({ error: 'Missing email or password.' });
    }

    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], async (error, results) => {
        if (error) {
            console.error('Database error during sign-in: ', error);
            return res.status(500).json({ error: 'Database error.' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'User does not exist.' });
        }

        const user = results[0];
        const match = await bcrypt.compare(password, user.password);

        if (match) {
            return res.status(200).json({ message: 'User signed in successfully.' });
            // redirect SIGNED IN
        } else {
            return res.status(401).json({ error: 'Incorrect password.' });
        }
    });
});

// Cologne API endpoint
app.get('/api/colognes', (req, res) => {
    const query = `
        SELECT
            c.reference_id, c.product_id, c.model_name, c.size, c.price, c.fragrance_notes, c.quantity,
            p.brand, p.image_url
        FROM colognes c
        JOIN products p ON c.product_id = p.product_id
        WHERE p.product_category = 'Cologne'
    `;
    db.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching colognes:', error);
            return res.status(500).json({ error: 'Database error.' });
        }
        res.status(200).json(results);
    });
});

// Glasses API endpoint
app.get('/api/glasses', (req, res) => {
    const query = `
        SELECT
            g.reference_id, g.product_id, g.model_name, g.size, g.price, g.quantity,
            p.brand, p.image_url
        FROM glasses g
        JOIN products p ON g.product_id = p.product_id
        WHERE p.product_category = 'Glasses'
    `;
    db.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching glasses:', error);
            return res.status(500).json({ error: 'Database error.' });
        }
        res.status(200).json(results);
    });
});

// Watches API endpoint
app.get('/api/watches', (req, res) => {
    const query = `
        SELECT
            w.reference_id, w.product_id, w.model_name, w.size, w.price, w.quantity,
            p.brand, p.image_url
        FROM watches w
        JOIN products p ON w.product_id = p.product_id
        WHERE p.product_category = 'Watches'
    `;
    db.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching watches:', error);
            return res.status(500).json({ error: 'Database error.' });
        }
        res.status(200).json(results);
    });
});

// Start the server
const PORT = process.env.SERVER_PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});