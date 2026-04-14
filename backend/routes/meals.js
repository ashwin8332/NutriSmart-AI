// === MEALS ROUTES — /api/meals ===
const express = require('express');
const router = express.Router();
const db = require('../db/database');

// POST /api/meals — Log a new meal
router.post('/', (req, res) => {
    const { userId, description, calories, protein, carbs, fats, healthScore } = req.body;
    if (!userId || !description) {
        return res.status(400).json({ error: 'userId and description required.' });
    }

    const result = db.prepare(
        'INSERT INTO meals (user_id, description, calories, protein, carbs, fats, health_score) VALUES (?, ?, ?, ?, ?, ?, ?)'
    ).run(userId, description, calories || 0, protein || 0, carbs || 0, fats || 0, healthScore || 0);

    res.json({ success: true, mealId: result.lastInsertRowid });
});

// GET /api/meals/:userId — Get meals for a user
router.get('/:userId', (req, res) => {
    const meals = db.prepare(
        'SELECT * FROM meals WHERE user_id = ? ORDER BY logged_at DESC LIMIT 20'
    ).all(req.params.userId);
    res.json({ meals });
});

// GET /api/meals/stats/:userId — Get daily stats
router.get('/stats/:userId', (req, res) => {
    const today = new Date().toISOString().split('T')[0];
    const stats = db.prepare(`
        SELECT 
            COALESCE(SUM(calories), 0) as totalCalories,
            COALESCE(SUM(protein), 0) as totalProtein,
            COALESCE(SUM(carbs), 0) as totalCarbs,
            COALESCE(SUM(fats), 0) as totalFats,
            COUNT(*) as mealCount,
            COALESCE(AVG(health_score), 0) as avgScore
        FROM meals 
        WHERE user_id = ? AND DATE(logged_at) = ?
    `).get(req.params.userId, today);
    res.json({ stats });
});

module.exports = router;
