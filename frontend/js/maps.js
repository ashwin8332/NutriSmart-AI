// === MAPS.JS — Local Finder with OpenStreetMap ===
document.addEventListener('DOMContentLoaded', () => {
    const locateBtn = document.getElementById('locate-btn');
    const resultsDiv = document.getElementById('location-results');
    const filterSection = document.getElementById('filter-section');

    // Default center (New Delhi) — will update if geolocation is available
    let userLat = 28.6139;
    let userLng = 77.2090;

    // Initialize Leaflet map
    const map = L.map('map').setView([userLat, userLng], 14);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
    }).addTo(map);

    let userMarker = null;
    let locationMarkers = [];

    // Mock healthy restaurant data (simulates Maps Grounding API response)
    const MOCK_LOCATIONS = [
        { name: 'Green Bowl Cafe', type: 'salad', dist: '0.2 mi', rating: '9.1/10', cuisine: '🥗 Salads & Bowls', latOff: 0.004, lngOff: 0.003 },
        { name: 'The Vegan Joint', type: 'vegan', dist: '0.5 mi', rating: '8.8/10', cuisine: '🥬 Vegan', latOff: -0.003, lngOff: 0.006 },
        { name: 'Organic Harvest Market', type: 'organic', dist: '0.7 mi', rating: '9.3/10', cuisine: '🌿 Organic Grocery', latOff: 0.006, lngOff: -0.004 },
        { name: 'FitMeals Kitchen', type: 'salad', dist: '1.1 mi', rating: '8.5/10', cuisine: '🍗 Meal Prep', latOff: -0.005, lngOff: -0.007 },
        { name: 'Zen Garden', type: 'vegan', dist: '1.4 mi', rating: '8.9/10', cuisine: '🥬 Asian Vegan', latOff: 0.008, lngOff: 0.002 },
        { name: 'FreshCo Supermarket', type: 'organic', dist: '1.8 mi', rating: '7.8/10', cuisine: '🌿 Health Foods', latOff: -0.007, lngOff: 0.009 }
    ];

    let loaded = false;

    function clearMarkers() {
        locationMarkers.forEach(m => map.removeLayer(m));
        locationMarkers = [];
    }

    function placeMarkers(locations) {
        clearMarkers();
        locations.forEach(loc => {
            const lat = userLat + loc.latOff;
            const lng = userLng + loc.lngOff;
            const marker = L.marker([lat, lng]).addTo(map);
            marker.bindPopup(`<strong>${loc.name}</strong><br>${loc.cuisine}<br>Health Score: ${loc.rating}`);
            locationMarkers.push(marker);
        });

        // Fit map to show all markers + user
        const allPoints = locationMarkers.map(m => m.getLatLng());
        if (userMarker) allPoints.push(userMarker.getLatLng());
        if (allPoints.length > 0) {
            map.fitBounds(L.latLngBounds(allPoints).pad(0.1));
        }
    }

    function renderResults(filter) {
        resultsDiv.innerHTML = '';
        const filtered = filter === 'all' ? MOCK_LOCATIONS : MOCK_LOCATIONS.filter(l => l.type === filter);

        if (filtered.length === 0) {
            resultsDiv.innerHTML = '<div class="brutal-card"><p style="text-align:center; font-weight:600;">No results for this filter.</p></div>';
            clearMarkers();
            return;
        }

        placeMarkers(filtered);

        filtered.forEach(loc => {
            const card = document.createElement('div');
            card.className = 'loc-card';
            card.style.cursor = 'pointer';
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
            // Click to pan map to this location
            card.addEventListener('click', () => {
                const lat = userLat + loc.latOff;
                const lng = userLng + loc.lngOff;
                map.setView([lat, lng], 16);
                // Open the popup for this marker
                const idx = (filter === 'all' ? MOCK_LOCATIONS : filtered).indexOf(loc);
                if (locationMarkers[idx]) locationMarkers[idx].openPopup();
            });
            resultsDiv.appendChild(card);
        });
    }

    // Scan button
    if (locateBtn) {
        locateBtn.addEventListener('click', () => {
            locateBtn.textContent = '📍 Scanning...';
            locateBtn.disabled = true;

            // Try to get real user location
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (pos) => {
                        userLat = pos.coords.latitude;
                        userLng = pos.coords.longitude;
                        finishScan();
                    },
                    () => {
                        // Geolocation denied, use default
                        finishScan();
                    },
                    { timeout: 5000 }
                );
            } else {
                finishScan();
            }
        });
    }

    function finishScan() {
        // Place user marker
        if (userMarker) map.removeLayer(userMarker);
        userMarker = L.marker([userLat, userLng], {
            icon: L.divIcon({
                className: '',
                html: '<div style="background:#ff4757;color:#fff;padding:4px 10px;border:3px solid #111;font-weight:bold;font-family:monospace;box-shadow:3px 3px 0 #111;font-size:0.8rem;">📍 YOU</div>',
                iconSize: [60, 30],
                iconAnchor: [30, 30]
            })
        }).addTo(map);

        map.setView([userLat, userLng], 14);

        setTimeout(() => {
            loaded = true;
            locateBtn.textContent = '📍 Rescan Area';
            locateBtn.disabled = false;
            filterSection.style.display = 'block';
            renderResults('all');
        }, 1000);
    }

    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (!loaded) return;
            document.querySelectorAll('.filter-btn').forEach(b => { b.style.background = ''; b.style.boxShadow = ''; });
            btn.style.background = '#fff';
            btn.style.boxShadow = 'inset 3px 3px 0 #111';
            renderResults(btn.dataset.filter);
        });
    });
});
