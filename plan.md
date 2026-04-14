# 📋 PLAN.md — NutriSmart Development Plan
> **Reverse Prompt Architecture**: Decisions documented BEFORE code is written.  
> **Status Tracking**: [ ] Todo | [x] Done | [~] In Progress | [!] Blocked

---

## 🔄 Reverse Prompt: My Architectural Decisions

> *This section captures WHY each decision was made — preventing AI deviation.*

### Decision 1: Why Vanilla JS over React/Next.js?
**Decision**: Use plain HTML/CSS/JS for frontend  
**Reason**: Deploys as static files on Cloud Run with zero build pipeline complexity. Any developer can open `index.html` and understand it immediately. No hydration bugs, no framework lock-in.  
**Override condition**: If component complexity exceeds 500 lines, consider Alpine.js.

### Decision 2: Why Gemini 2.0 Flash?
**Decision**: Use `gemini-2.0-flash` for all AI calls  
**Reason**: 1M token context window, native audio support for Live API, real-time grounding. Faster and cheaper than Pro for our use case.  
**Override condition**: Complex nutritional analysis may use Pro as fallback.

### Decision 3: Why Neo Brutalism?
**Decision**: Neo brutalism as design system  
**Reason**: Food apps are saturated with "clean green" aesthetics. Neo brutalism is memorable, bold, and communicates confidence — exactly what users need when making health decisions.  
**Override condition**: None. This is a brand decision, not a technical one.

### Decision 4: Why SQLite over PostgreSQL?
**Decision**: SQLite for Phase 2 backend  
**Reason**: Single-file database, zero infrastructure to manage, Cloud Run containers can mount persistent volumes. Sufficient for MVP scale (<10k users).  
**Override condition**: If concurrent writes exceed 100/sec, migrate to PostgreSQL.

### Decision 5: Why Google Cloud Run?
**Decision**: Docker + Cloud Run for deployment  
**Reason**: Serverless, scales to zero (cost-effective), integrates with Google APIs natively, supports custom domains, and handles HTTPS automatically.  
**Override condition**: None for MVP.

---

## 🗺️ Project Structure (Actual)

```
nutrismart/
├── plan.md                     ← This file
├── requirements                ← Full requirements
├── architecture.md             ← User stories & system design
├── skill.md                    ← Skill definitions
├── my prompt                   ← Original prompt notes
├── .env.example                ← Environment template (Phase 2)
├── Dockerfile                  ← Production container (Phase 2)
├── frontend/
│   ├── index.html              ← Home page (hero + features)
│   ├── about.html              ← Mission & approach
│   ├── contact.html            ← Contact form (frontend validation)
│   ├── tech-stack.html         ← 8 technology cards
│   ├── login.html              ← Demo auth login
│   ├── signup.html             ← Signup with password strength
│   ├── dashboard.html          ← Analytics dashboard (stats, charts, macros)
│   ├── chat.html               ← AI Nutritionist chat interface
│   ├── maps.html               ← Local healthy food finder
│   ├── css/
│   │   ├── variables.css       ← Design tokens
│   │   └── neo-brutalism.css   ← Complete theme system
│   └── js/
│       ├── auth.js             ← Route protection + demo auth
│       ├── dashboard.js        ← Charts, progress, macro animations
│       ├── chat.js             ← AI mock responses + quick prompts
│       └── maps.js             ← Location scan + filtering
└── backend/ (Phase 2)
    ├── server.js               ← Express + Gemini API proxy
    ├── db/
    │   └── schema.sql          ← SQLite schema
    └── routes/
        ├── auth.js             ← JWT auth routes
        ├── chat.js             ← Gemini proxy endpoint
        └── meals.js            ← Meal CRUD
```

---

## 🏃 Sprint Plan

### Sprint 0 — Planning & Design System ✅
- [x] Plan.md
- [x] Requirements
- [x] Architecture / User Stories

### Sprint 1 — UI Shell & Auth ✅
- [x] Design system tokens (variables.css)
- [x] Neo brutalism components (neo-brutalism.css)
- [x] Login page with demo credentials (demo@nutrismart.ai / Demo@1234)
- [x] Signup page with password strength indicator
- [x] Session management (localStorage)
- [x] Route protection (dashboard/chat/maps require auth)
- [x] Logout functionality

### Sprint 2 — Public Pages ✅
- [x] Home page with hero section + 6 feature cards
- [x] About page with mission, stats, approach
- [x] Contact form with validation + success state
- [x] Tech stack page with 8 interactive technology cards
- [x] Footer on all pages

### Sprint 3 — Dashboard & Analytics ✅
- [x] Stats grid (streak, logs, health score, interactions)
- [x] Animated calorie progress bar
- [x] Weekly calorie intake bar chart (7 days)
- [x] Animated macro breakdown (protein, carbs, fats, fiber)
- [x] Recent meal log with health scores
- [x] Daily nutrition tip (date-seeded)
- [x] Quick action buttons

### Sprint 4 — AI Chat & Maps ✅
- [x] AI nutritionist chat with contextual mock responses
- [x] Quick prompt buttons
- [x] "Thinking" animation while AI processes
- [x] Local food finder with mock location scan
- [x] Filter by type (vegan, salad, organic)
- [x] Location result cards with health scores

### Sprint 5 — Backend & Deploy [ ]
**Requirements for backend**:
1. Node.js Express server that proxies Gemini API (keeps API key safe)
2. SQLite for persistent meal logs and user sessions
3. Docker container serving both static frontend and backend API
4. Google Cloud Run deployment configuration

- [ ] Express server with `/api/chat`, `/api/meals`, `/api/auth` routes
- [ ] Gemini API integration via backend (API key in .env only)
- [ ] SQLite schema for users, meals, chat_history
- [ ] Dockerfile (Node.js + static file serving on port 8080)
- [ ] .env.example with `GEMINI_API_KEY` placeholder
- [ ] Cloud Run deployment guide

---

## 🐛 Bug Tracking Log

| ID | File | Bug | Status | Fixed By |
|----|------|-----|--------|----------|
| — | — | No bugs logged yet | — | — |

---

## 📝 Change Log

| Date | Change | Agent |
|------|--------|-------|
| 2026-04-14 | Initial PLAN.md created | Root Agent |
| 2026-04-14 | Sprint 1-4 completed: Full frontend with analytics dashboard | Root Agent |