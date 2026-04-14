// === MAPS.JS — Local Finder Mock ===
document.addEventListener('DOMContentLoaded', () => {
    const locateBtn = document.getElementById('locate-btn');
    const resultsDiv = document.getElementById('location-results');
    const filterSection = document.getElementById('filter-section');
    const mapPlaceholder = document.getElementById('map-placeholder');

    const MOCK_LOCATIONS = [
        { name: 'Green Bowl Cafe', type: 'salad', dist: '0.2 mi', rating: '9.1/10', cuisine: '🥗 Salads & Bowls' },
        { name: 'The Vegan Joint', type: 'vegan', dist: '0.5 mi', rating: '8.8/10', cuisine: '🥬 Vegan' },
        { name: 'Organic Harvest Market', type: 'organic', dist: '0.7 mi', rating: '9.3/10', cuisine: '🌿 Organic Grocery' },
        { name: 'FitMeals Kitchen', type: 'salad', dist: '1.1 mi', rating: '8.5/10', cuisine: '🍗 Meal Prep' },
        { name: 'Zen Garden', type: 'vegan', dist: '1.4 mi', rating: '8.9/10', cuisine: '🥬 Asian Vegan' },
        { name: 'FreshCo Supermarket', type: 'organic', dist: '1.8 mi', rating: '7.8/10', cuisine: '🌿 Health Foods' }
    ];

    let loaded = false;

    function renderResults(filter) {
        resultsDiv.innerHTML = '';
        const filtered = filter === 'all' ? MOCK_LOCATIONS : MOCK_LOCATIONS.filter(l => l.type === filter);

        if (filtered.length === 0) {
            resultsDiv.innerHTML = '<div class="brutal-card"><p style="text-align:center; font-weight:600;">No results for this filter.</p></div>';
            return;
        }

        filtered.forEach(loc => {
            const card = document.createElement('div');
            card.className = 'loc-card';
            card.innerHTML = `
                <div>
                    <strong>${loc.name}</strong><br>
                    <span style="font-size:0.85rem; color:#666;">${loc.cuisine} • ${loc.dist}</span>
                </div>
                <div style="text-align:right;">
                    <strong style="color:var(--accent-green);">${loc.rating}</strong><br>
                    <span style="font-size:0.8rem;">Health Score</span>
                </div>
            `;
            resultsDiv.appendChild(card);
        });
    }

    if (locateBtn) {
        locateBtn.addEventListener('click', () => {
            locateBtn.textContent = 'Scanning...';
            locateBtn.disabled = true;
            mapPlaceholder.textContent = '📍 Scanning your area...';
            mapPlaceholder.style.background = '#c8e6c9';

            setTimeout(() => {
                loaded = true;
                locateBtn.textContent = 'Rescan Area';
                locateBtn.disabled = false;
                mapPlaceholder.textContent = '📍 6 healthy options found near you';
                mapPlaceholder.style.background = '#d4edda';
                filterSection.style.display = 'block';
                renderResults('all');
            }, 1500);
        });
    }

    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (!loaded) return;
            document.querySelectorAll('.filter-btn').forEach(b => b.style.background = '');
            btn.style.background = '#fff';
            btn.style.boxShadow = 'inset 3px 3px 0 #111';
            renderResults(btn.dataset.filter);
        });
    });
});
