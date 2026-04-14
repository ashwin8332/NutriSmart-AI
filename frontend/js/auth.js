// === AUTH.JS — Demo Authentication Controller ===
document.addEventListener('DOMContentLoaded', () => {
    const DEMO_CREDS = { email: 'demo@nutrismart.ai', pass: 'Demo@1234' };
    const AUTH_KEY = 'nutrismart_auth';
    const path = window.location.pathname;

    // Route protection: dashboard pages require auth
    const protectedPages = ['dashboard.html', 'chat.html', 'maps.html'];
    const isProtected = protectedPages.some(p => path.includes(p));
    if (isProtected && !localStorage.getItem(AUTH_KEY)) {
        window.location.href = 'login.html';
        return;
    }

    // Redirect logged-in users away from auth pages
    const authPages = ['login.html', 'signup.html'];
    const isAuthPage = authPages.some(p => path.includes(p));
    if (isAuthPage && localStorage.getItem(AUTH_KEY)) {
        window.location.href = 'dashboard.html';
        return;
    }

    // Login form handler
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value.trim();
            const pass = document.getElementById('login-password').value;
            const error = document.getElementById('login-error');

            if (email === DEMO_CREDS.email && pass === DEMO_CREDS.pass) {
                localStorage.setItem(AUTH_KEY, JSON.stringify({ email, ts: Date.now() }));
                window.location.href = 'dashboard.html';
            } else {
                error.style.display = 'block';
            }
        });
    }

    // Signup form handler
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        const passInput = document.getElementById('signup-password');
        const strengthBar = document.getElementById('strength-bar');

        // Password strength indicator
        if (passInput && strengthBar) {
            passInput.addEventListener('input', () => {
                const val = passInput.value;
                let score = 0;
                if (val.length >= 8) score++;
                if (/[A-Z]/.test(val)) score++;
                if (/\d/.test(val)) score++;
                if (/[^A-Za-z0-9]/.test(val)) score++;

                const colors = ['#ff4757', '#ffa502', '#ffeb3b', '#2ed573'];
                const widths = ['25%', '50%', '75%', '100%'];
                strengthBar.style.width = widths[score - 1] || '0%';
                strengthBar.style.background = colors[score - 1] || '#eee';
            });
        }

        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const pass = document.getElementById('signup-password').value;
            const error = document.getElementById('signup-error');
            const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

            if (!regex.test(pass)) {
                error.innerText = 'Password needs: 8+ chars, 1 uppercase, 1 number.';
                error.style.display = 'block';
                return;
            }
            // Mock signup success
            alert('Account created! Please log in with demo credentials.');
            window.location.href = 'login.html';
        });
    }

    // Logout handler
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem(AUTH_KEY);
            window.location.href = 'login.html';
        });
    }
});
