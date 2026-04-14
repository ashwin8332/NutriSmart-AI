// === CHAT ROUTES — /api/chat ===
const express = require('express');
const router = express.Router();
const db = require('../db/database');

// POST /api/chat — Send message and get AI response
router.post('/', async (req, res) => {
    const { userId, message } = req.body;
    if (!message) {
        return res.status(400).json({ error: 'Message required.' });
    }

    // Save user message
    if (userId) {
        db.prepare('INSERT INTO chat_history (user_id, role, message) VALUES (?, ?, ?)').run(userId, 'user', message);
    }

    // Call Gemini API if key exists, otherwise return mock
    const apiKey = process.env.GEMINI_API_KEY;
    let aiResponse;

    if (apiKey && apiKey !== 'your_gemini_api_key_here') {
        try {
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{ text: `You are a professional AI nutritionist. Analyze the following food input and provide: calorie estimate, macro breakdown (protein, carbs, fats), a health score out of 10, and one actionable improvement tip. Be concise and helpful.\n\nUser says: ${message}` }]
                        }]
                    })
                }
            );
            const data = await response.json();
            aiResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not analyze that. Please try again.';
        } catch (err) {
            console.error('Gemini API error:', err.message);
            aiResponse = 'AI service is temporarily unavailable. Please try again later.';
        }
    } else {
        // Mock response when no API key is configured
        const mocks = [
            'Based on your description, estimated calories: ~420 kcal. Protein: 28g, Carbs: 45g, Fats: 14g. Health Score: 7.8/10. Tip: Add leafy greens for micronutrients.',
            'Good choice! Estimated: ~550 kcal. Protein: 32g, Carbs: 60g, Fats: 18g. Score: 7.2/10. Tip: Swap white rice for brown rice.',
            'Well balanced meal! ~380 kcal. Protein: 24g, Carbs: 35g, Fats: 12g. Score: 8.5/10. Keep this pattern.',
            'Noted! Estimated: ~620 kcal. Protein: 18g, Carbs: 78g, Fats: 24g. Score: 6.5/10. Warning: High carbs. Add more protein next meal.'
        ];
        aiResponse = mocks[Math.floor(Math.random() * mocks.length)];
    }

    // Save AI response
    if (userId) {
        db.prepare('INSERT INTO chat_history (user_id, role, message) VALUES (?, ?, ?)').run(userId, 'ai', aiResponse);
    }

    res.json({ response: aiResponse });
});

// GET /api/chat/history/:userId — Get chat history for a user
router.get('/history/:userId', (req, res) => {
    const history = db.prepare('SELECT role, message, created_at FROM chat_history WHERE user_id = ? ORDER BY created_at ASC LIMIT 50').all(req.params.userId);
    res.json({ history });
});

module.exports = router;
