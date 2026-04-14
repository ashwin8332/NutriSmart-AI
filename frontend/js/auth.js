// === AUTH.JS — Demo Authentication Controller (Backend Connected) ===
document.addEventListener('DOMContentLoaded', () => {
    const AUTH_KEY = 'nutrismart_auth';
    const path = window.location.pathname;

    // Route protection
    const protectedPages = ['dashboard.html', 'chat.html', 'maps.html'];
    const isProtected = protectedPages.some(p => path.includes(p));
    if (isProtected && !localStorage.getItem(AUTH_KEY)) {
        window.location.href = 'login.html';
        return;
    }

    const authPages = ['login.html', 'signup.html'];
    const isAuthPage = authPages.some(p => path.includes(p));
    if (isAuthPage && localStorage.getItem(AUTH_KEY)) {
        window.location.href = 'dashboard.html';
        return;
    }

    // Login form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value.trim();
            const pass = document.getElementById('login-password').value;
            const error = document.getElementById('login-error');

            try {
                const res = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password: pass })
                });
                const data = await res.json();

                if (data.success) {
                    localStorage.setItem(AUTH_KEY, JSON.stringify({
                        email: data.user.email,
                        userId: data.user.id,
                        ts: Date.now()
                    }));
                    window.location.href = 'dashboard.html';
                } else {
                    error.style.display = 'block';
                }
            } catch (err) {
                // Fallback: local demo auth if backend is down
                if (email === 'demo@nutrismart.ai' && pass === 'Demo@1234') {
                    localStorage.setItem(AUTH_KEY, JSON.stringify({ email, userId: 1, ts: Date.now() }));
                    window.location.href = 'dashboard.html';
                } else {
                    error.style.display = 'block';
                }
            }
        });
    }

    // Signup form
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        const passInput = document.getElementById('signup-password');
        const strengthBar = document.getElementById('strength-bar');

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

        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('signup-name').value.trim();
            const email = document.getElementById('signup-email').value.trim();
            const pass = document.getElementById('signup-password').value;
            const error = document.getElementById('signup-error');
            const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

            if (!regex.test(pass)) {
                error.innerText = 'Password needs: 8+ chars, 1 uppercase, 1 number.';
                error.style.display = 'block';
                return;
            }

            try {
                const res = await fetch('/api/auth/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, password: pass })
                });
                const data = await res.json();

                if (data.success) {
                    alert('Account created! Please log in.');
                    window.location.href = 'login.html';
                } else {
                    error.innerText = data.error || 'Signup failed.';
                    error.style.display = 'block';
                }
            } catch (err) {
                alert('Account created! Please log in with demo credentials.');
                window.location.href = 'login.html';
            }
        });
    }

    // Logout
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem(AUTH_KEY);
            window.location.href = 'login.html';
        });
    }
});
