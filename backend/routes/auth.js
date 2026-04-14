// === AUTH ROUTES — /api/auth ===
const express = require('express');
const router = express.Router();
const db = require('../db/database');

// POST /api/auth/login
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password required.' });
    }

    const user = db.prepare('SELECT id, name, email FROM users WHERE email = ? AND password = ?').get(email, password);
    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials.' });
    }

    res.json({ success: true, user: { id: user.id, name: user.name, email: user.email } });
});

// POST /api/auth/signup
router.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'All fields required.' });
    }

    const exists = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
    if (exists) {
        return res.status(409).json({ error: 'Email already registered.' });
    }

    const result = db.prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)').run(name, email, password);
    res.json({ success: true, userId: result.lastInsertRowid });
});

module.exports = router;
