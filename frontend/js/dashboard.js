// === DASHBOARD.JS — Analytics (Backend Connected) ===
document.addEventListener('DOMContentLoaded', () => {
    const authData = JSON.parse(localStorage.getItem('nutrismart_auth') || '{}');
    const userId = authData.userId || 1;

    // --- Daily Tip ---
    const TIPS = [
        "Drink a glass of water before every meal — it aids digestion and prevents overeating.",
        "Include protein in every meal to stay satiated. Try eggs, lentils, or Greek yogurt.",
        "Eat 5 different colors of vegetables today for a full spectrum of micronutrients.",
        "Mindful eating: put your phone away during meals for better satiety signals.",
        "Replace refined carbs with whole grains — the fiber keeps blood sugar stable.",
        "Snack on nuts instead of chips. Almonds have 6g protein per handful."
    ];
    const tipEl = document.getElementById('daily-tip');
    if (tipEl) {
        tipEl.textContent = TIPS[new Date().getDate() % TIPS.length];
    }

    // --- Load stats from backend, fallback to simulated ---
    loadDashboardData();

    async function loadDashboardData() {
        let stats = null;
        let meals = [];

        try {
            const [statsRes, mealsRes] = await Promise.all([
                fetch(`/api/meals/stats/${userId}`),
                fetch(`/api/meals/${userId}`)
            ]);
            const statsData = await statsRes.json();
            const mealsData = await mealsRes.json();
            stats = statsData.stats;
            meals = mealsData.meals || [];
        } catch (e) {
            // Backend unavailable — use simulated data
        }

        // Use real data if available, otherwise simulated
        const consumed = stats && stats.totalCalories > 0 ? stats.totalCalories : 1450;
        const protein = stats && stats.totalProtein > 0 ? Math.round(stats.totalProtein) : 68;
        const carbs = stats && stats.totalCarbs > 0 ? Math.round(stats.totalCarbs) : 185;
        const fats = stats && stats.totalFats > 0 ? Math.round(stats.totalFats) : 52;
        const mealCount = stats && stats.mealCount > 0 ? stats.mealCount : 12;
        const avgScore = stats && stats.avgScore > 0 ? stats.avgScore.toFixed(1) : '7.8';

        // --- Calorie Progress Animation ---
        const calFill = document.getElementById('cal-fill');
        const calLabel = document.getElementById('cal-label');
        const calMsg = document.getElementById('cal-msg');
        const goal = 2200;
        if (calFill) {
            const pct = Math.min(Math.round((consumed / goal) * 100), 100);
            setTimeout(() => {
                calFill.style.width = pct + '%';
                calLabel.textContent = consumed + ' / ' + goal + ' kcal';
                if (pct < 50) calMsg.textContent = 'Still early — make sure to eat balanced meals today.';
                else if (pct < 80) calMsg.textContent = 'On track! ' + (goal - consumed) + ' kcal remaining.';
                else calMsg.textContent = 'Almost at your limit. Choose light snacks if needed.';
            }, 300);
        }

        // --- Weekly Bar Chart ---
        const chartEl = document.getElementById('weekly-chart');
        if (chartEl) {
            const weekData = [
                { day: 'Mon', cal: 1800 }, { day: 'Tue', cal: 2100 },
                { day: 'Wed', cal: 1650 }, { day: 'Thu', cal: 2300 },
                { day: 'Fri', cal: 1900 }, { day: 'Sat', cal: 2450 },
                { day: 'Sun', cal: consumed }
            ];
            const maxCal = Math.max(...weekData.map(d => d.cal));
            const colors = ['#3742fa', '#ff4757', '#2ed573', '#ffa502', '#7c5cfc', '#3742fa', '#ff4757'];
            weekData.forEach((d, i) => {
                const bar = document.createElement('div');
                bar.className = 'bar';
                bar.style.height = '0%';
                bar.style.background = colors[i];
                bar.title = d.day + ': ' + d.cal + ' kcal';
                const label = document.createElement('span');
                label.textContent = d.day;
                bar.appendChild(label);
                chartEl.appendChild(bar);
                setTimeout(() => { bar.style.height = Math.round((d.cal / maxCal) * 100) + '%'; }, 200 + i * 100);
            });
        }

        // --- Macro Breakdown Animation ---
        const macros = { protein, carbs, fats, fiber: 28 };
        Object.keys(macros).forEach(key => {
            const el = document.getElementById('macro-' + key);
            if (el) {
                let current = 0;
                const target = macros[key];
                const interval = setInterval(() => {
                    current += Math.ceil(target / 20);
                    if (current >= target) { current = target; clearInterval(interval); }
                    el.textContent = current + 'g';
                }, 50);
            }
        });

        // --- Recent Meal Log ---
        const logEl = document.getElementById('meal-log');
        if (logEl) {
            if (meals.length > 0) {
                // Real data from backend
                meals.forEach(m => {
                    const card = document.createElement('div');
                    card.className = 'loc-card';
                    const time = new Date(m.logged_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    card.innerHTML = `
                        <div><strong>${time}</strong> — ${m.description}</div>
                        <div style="text-align:right;">
                            <strong>${m.calories} kcal</strong><br>
                            <span style="font-size:0.8rem; color:#666;">Score: ${m.health_score}/10</span>
                        </div>`;
                    logEl.appendChild(card);
                });
            } else {
                // Simulated data
                const simMeals = [
                    { time: '8:30 AM', meal: 'Oatmeal with berries and almonds', cal: 380, score: 9.2 },
                    { time: '12:45 PM', meal: 'Grilled chicken salad with quinoa', cal: 520, score: 8.7 },
                    { time: '3:15 PM', meal: 'Greek yogurt with honey', cal: 180, score: 7.5 },
                    { time: '7:00 PM', meal: 'Salmon with steamed vegetables', cal: 370, score: 9.0 }
                ];
                simMeals.forEach(m => {
                    const card = document.createElement('div');
                    card.className = 'loc-card';
                    card.innerHTML = `
                        <div><strong>${m.time}</strong> — ${m.meal}</div>
                        <div style="text-align:right;">
                            <strong>${m.cal} kcal</strong><br>
                            <span style="font-size:0.8rem; color:#666;">Score: ${m.score}/10</span>
                        </div>`;
                    logEl.appendChild(card);
                });
            }
        }
    }
});
