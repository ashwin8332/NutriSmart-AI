// === CHAT.JS — AI Nutritionist Mock ===
document.addEventListener('DOMContentLoaded', () => {
    const sendBtn = document.getElementById('send-btn');
    const aiInput = document.getElementById('ai-input');
    const chatOutput = document.getElementById('chat-output');

    // AI response database (mock)
    const AI_RESPONSES = {
        breakfast: `Great start! A typical healthy breakfast should include:\n• **Protein**: Eggs, Greek yogurt, or tofu (~20g)\n• **Complex carbs**: Oats, whole wheat toast (~30g)\n• **Healthy fats**: Avocado, nuts (~10g)\n\n**Estimated**: 350-450 kcal | Health Score: 8.5/10`,
        dinner: `For a healthy dinner, try:\n🥗 **Grilled salmon with roasted vegetables**\n• Salmon fillet (200g): 380 kcal, 42g protein\n• Broccoli + sweet potato: 150 kcal, 8g fiber\n• Total: ~530 kcal | Score: 9.2/10\n\nAlternative: Lentil soup with whole grain bread.`,
        snack: `Smart snacking options:\n• 🥜 Handful of almonds (23 nuts): 164 kcal, 6g protein\n• 🍎 Apple with peanut butter: 200 kcal\n• 🥒 Veggies with hummus: 120 kcal\n\nAvoid: chips, candy bars, sugary drinks.`,
        protein: `Daily protein needs depend on your goals:\n• **Maintenance**: 0.8g per kg body weight\n• **Muscle gain**: 1.6-2.2g per kg\n• **Weight loss**: 1.2-1.6g per kg\n\nFor a 70kg person, that's **56g-154g daily**.\nBest sources: chicken, fish, eggs, lentils, Greek yogurt.`,
        default: [
            `Based on your description, here's my analysis:\n• **Estimated calories**: 420 kcal\n• **Protein**: 28g | **Carbs**: 45g | **Fats**: 14g\n• **Health Score**: 7.8/10\n\n💡 **Tip**: Adding leafy greens would boost micronutrient density.`,
            `Interesting choice! Here's the breakdown:\n• **Estimated calories**: 550 kcal\n• **Protein**: 32g | **Carbs**: 60g | **Fats**: 18g\n• **Health Score**: 7.2/10\n\n💡 **Suggestion**: Swap white rice for brown rice to add 3g fiber.`,
            `Good meal! Analysis:\n• **Estimated calories**: 380 kcal\n• **Protein**: 24g | **Carbs**: 35g | **Fats**: 12g\n• **Health Score**: 8.5/10\n\n✅ Well balanced! Keep this pattern going.`,
            `Noted! Let me break that down:\n• **Estimated calories**: 620 kcal\n• **Protein**: 18g | **Carbs**: 78g | **Fats**: 24g\n• **Health Score**: 6.5/10\n\n⚠️ High carbs detected. Consider more protein in your next meal.`
        ]
    };

    function getAIResponse(input) {
        const lower = input.toLowerCase();
        if (lower.includes('breakfast')) return AI_RESPONSES.breakfast;
        if (lower.includes('dinner') || lower.includes('healthy')) return AI_RESPONSES.dinner;
        if (lower.includes('snack')) return AI_RESPONSES.snack;
        if (lower.includes('protein')) return AI_RESPONSES.protein;
        const defaults = AI_RESPONSES.default;
        return defaults[Math.floor(Math.random() * defaults.length)];
    }

    function appendMessage(sender, text, isAI) {
        const div = document.createElement('div');
        div.className = 'chat-msg ' + (isAI ? 'ai' : 'user');
        div.innerHTML = `<strong>${sender}:</strong> ${text.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}`;
        chatOutput.appendChild(div);
        chatOutput.scrollTop = chatOutput.scrollHeight;
    }

    function handleSend() {
        const text = aiInput.value.trim();
        if (!text) return;
        appendMessage('User', text, false);
        aiInput.value = '';

        // Simulate AI thinking delay
        const thinking = document.createElement('div');
        thinking.className = 'chat-msg ai';
        thinking.innerHTML = '<strong>AI:</strong> Analyzing...';
        thinking.style.opacity = '0.6';
        chatOutput.appendChild(thinking);
        chatOutput.scrollTop = chatOutput.scrollHeight;

        setTimeout(() => {
            chatOutput.removeChild(thinking);
            appendMessage('AI', getAIResponse(text), true);
        }, 800 + Math.random() * 700);
    }

    if (sendBtn) sendBtn.addEventListener('click', handleSend);
    if (aiInput) aiInput.addEventListener('keypress', e => { if (e.key === 'Enter') handleSend(); });

    // Quick prompts
    document.querySelectorAll('.quick-prompt').forEach(btn => {
        btn.addEventListener('click', () => {
            aiInput.value = btn.textContent;
            handleSend();
        });
    });
});
