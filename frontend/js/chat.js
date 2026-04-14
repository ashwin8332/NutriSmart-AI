// === CHAT.JS — AI Nutritionist (Backend Connected) ===
document.addEventListener('DOMContentLoaded', () => {
    const sendBtn = document.getElementById('send-btn');
    const aiInput = document.getElementById('ai-input');
    const chatOutput = document.getElementById('chat-output');

    // Get user from localStorage
    const authData = JSON.parse(localStorage.getItem('nutrismart_auth') || '{}');
    const userId = authData.userId || 1;

    // Load chat history from backend
    fetch(`/api/chat/history/${userId}`)
        .then(r => r.json())
        .then(data => {
            if (data.history && data.history.length > 0) {
                chatOutput.innerHTML = '';
                data.history.forEach(msg => {
                    appendMessage(msg.role === 'ai' ? 'AI' : 'User', msg.message, msg.role === 'ai');
                });
            }
        })
        .catch(() => { /* Backend not available, keep default greeting */ });

    // Fallback mock responses (used if backend is down)
    const FALLBACK = [
        'Estimated: ~420 kcal. Protein: 28g, Carbs: 45g, Fats: 14g. Score: 7.8/10. Tip: Add leafy greens.',
        'Good choice! ~550 kcal. Protein: 32g, Carbs: 60g, Fats: 18g. Score: 7.2/10.',
        'Well balanced! ~380 kcal. Protein: 24g, Carbs: 35g, Fats: 12g. Score: 8.5/10.',
        'Noted! ~620 kcal. Protein: 18g, Carbs: 78g, Fats: 24g. Score: 6.5/10. High carbs detected.'
    ];

    function appendMessage(sender, text, isAI) {
        const div = document.createElement('div');
        div.className = 'chat-msg ' + (isAI ? 'ai' : 'user');
        div.innerHTML = `<strong>${sender}:</strong> ${text.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}`;
        chatOutput.appendChild(div);
        chatOutput.scrollTop = chatOutput.scrollHeight;
    }

    async function handleSend() {
        const text = aiInput.value.trim();
        if (!text) return;
        appendMessage('User', text, false);
        aiInput.value = '';

        // Show thinking indicator
        const thinking = document.createElement('div');
        thinking.className = 'chat-msg ai';
        thinking.innerHTML = '<strong>AI:</strong> Analyzing...';
        thinking.style.opacity = '0.6';
        chatOutput.appendChild(thinking);
        chatOutput.scrollTop = chatOutput.scrollHeight;

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, message: text })
            });
            const data = await res.json();
            chatOutput.removeChild(thinking);
            appendMessage('AI', data.response, true);
        } catch (err) {
            // Fallback if backend is unavailable
            chatOutput.removeChild(thinking);
            const reply = FALLBACK[Math.floor(Math.random() * FALLBACK.length)];
            appendMessage('AI', reply, true);
        }
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
