document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('login-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const sendBtn = document.getElementById('send-btn');
    const aiInput = document.getElementById('ai-input');
    const chatOutput = document.getElementById('chat-output');
    const dailyTip = document.getElementById('daily-tip');

    const landing = document.getElementById('landing');
    const dashboard = document.getElementById('dashboard');

    const TIPS = [
        "Drink water before every meal to aid digestion and prevent overeating.",
        "Include a portion of protein in every meal to stay full longer.",
        "Aim for 5 different colors of vegetables each day.",
        "Eating mindfully and slowly can help you digest better and enjoy your food."
    ];

    // Check auth state
    if (localStorage.getItem('nutrismart_demo_auth')) {
        showDashboard();
    }

    loginBtn.addEventListener('click', () => {
        localStorage.setItem('nutrismart_demo_auth', 'true');
        showDashboard();
    });

    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('nutrismart_demo_auth');
        showLanding();
    });

    sendBtn.addEventListener('click', handleChat);
    aiInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleChat();
    });

    function showDashboard() {
        landing.classList.remove('active');
        dashboard.classList.add('active');
        dailyTip.innerText = TIPS[Math.floor(Math.random() * TIPS.length)];
    }

    function showLanding() {
        dashboard.classList.remove('active');
        landing.classList.add('active');
    }

    function handleChat() {
        const text = aiInput.value.trim();
        if (!text) return;

        appendMessage('Alex', text);
        aiInput.value = '';

        // Mock Gemini AI response for MVP
        setTimeout(() => {
            const mockResponses = [
                `That sounds like a balanced choice! Keep an eye on portion sizes. Based on a typical serving, it's around 450 calories.`,
                `Great! Pasta with chicken provides good carbs and lean protein. Maybe add a side of broccoli for extra micronutrients?`,
                `If weight loss is your goal, consider swapping to a whole-wheat pasta to increase fiber intake!`,
                `Noted and logged! That meal will help you stay energized for your next coding session.`
            ];
            const reply = mockResponses[Math.floor(Math.random() * mockResponses.length)];
            appendMessage('Gemini', reply);
        }, 800);
    }

    function appendMessage(sender, message) {
        const p = document.createElement('p');
        p.innerHTML = `<strong>${sender}:</strong> ${message}`;
        chatOutput.appendChild(p);
        chatOutput.scrollTop = chatOutput.scrollHeight;
    }
});
