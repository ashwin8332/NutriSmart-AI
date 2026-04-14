# 📖 USER_STORIES.md — NutriSmart Epics & User Stories
> **Format**: As a [user], I want to [action], so that [benefit]  
> **Priority**: P0=Must Have | P1=Should Have | P2=Nice to Have  
> **Estimation**: S=Small(1-2h) | M=Medium(4-8h) | L=Large(1-2d)

---

## 🎯 Primary Persona

**"Alex, the Curious Learner"**
- 24 years old, software student / junior developer
- Wants to eat healthier but finds nutrition overwhelming
- Loves technology and voice interfaces
- Has a busy schedule, makes quick food decisions
- Wants to improve both coding skills AND eating habits simultaneously
- Pain points: Too many nutrition apps feel clinical and boring

---

## 📚 EPIC 1: Authentication & Onboarding

**Epic Goal**: Users can securely access the platform with minimal friction.

### US-01: Demo Login
**As a** new visitor,  
**I want to** log in with pre-filled demo credentials,  
**So that** I can explore the app without creating an account.

**Acceptance Criteria**:
- [ ] Login page shows demo credentials visibly
- [ ] Clicking "Use Demo Credentials" auto-fills form
- [ ] Successful login redirects to dashboard
- [ ] Invalid credentials show error message (non-blocking)

**Priority**: P0 | **Size**: S

---

### US-02: User Signup
**As a** new user,  
**I want to** create an account with my email,  
**So that** I can have a personalized experience.

**Acceptance Criteria**:
- [ ] Form validates email format in real-time
- [ ] Password strength indicator shown
- [ ] Error messages are specific (not generic "failed")
- [ ] Success redirects to dashboard with welcome message
- [ ] Duplicate email shows "already registered" error

**Priority**: P0 | **Size**: M

---

### US-03: Persistent Session
**As a** returning user,  
**I want to** stay logged in between browser sessions,  
**So that** I don't have to log in every time.

**Acceptance Criteria**:
- [ ] Session stored in localStorage
- [ ] Unauthenticated routes redirect to login
- [ ] Logout clears all session data
- [ ] Session expires after 7 days

**Priority**: P0 | **Size**: S

---

## 📚 EPIC 2: Core Pages & Navigation

**Epic Goal**: Marketing pages that communicate value and build trust.

### US-04: Discover Platform on Home Page
**As a** first-time visitor,  
**I want to** understand what NutriSmart does in 10 seconds,  
**So that** I can decide if it's worth exploring.

**Acceptance Criteria**:
- [ ] Hero section with bold headline and CTA
- [ ] 3-4 key features explained with icons
- [ ] "How it works" section (3 steps)
- [ ] CTA leads to signup or demo login
- [ ] Page loads in < 2 seconds

**Priority**: P0 | **Size**: M

---

### US-05: Learn About the Mission
**As a** curious user,  
**I want to** read about NutriSmart's mission and values,  
**So that** I can trust the platform with my health data.

**Acceptance Criteria**:
- [ ] Mission statement prominently displayed
- [ ] Problem statement clearly articulated
- [ ] Technology approach explained accessibly
- [ ] No fake team photos or bios

**Priority**: P0 | **Size**: S

---

### US-06: Contact for Feedback
**As a** user with a question,  
**I want to** send a message through a contact form,  
**So that** I can get help or provide feedback.

**Acceptance Criteria**:
- [ ] Form has: Name, Email, Subject, Message fields
- [ ] Client-side validation with helpful errors
- [ ] Success message after submission (simulated)
- [ ] No backend required in Phase 1

**Priority**: P0 | **Size**: S

---

### US-07: Explore Technology Stack
**As a** developer or tech-curious user,  
**I want to** see what technologies power NutriSmart,  
**So that** I can learn from and trust the implementation.

**Acceptance Criteria**:
- [ ] All APIs and libraries listed with logos
- [ ] Brief explanation of WHY each was chosen
- [ ] Interactive hover effects on tech cards
- [ ] Link to relevant documentation for each tech

**Priority**: P0 | **Size**: S

---

## 📚 EPIC 3: AI Food Intelligence

**Epic Goal**: AI-powered food analysis that actually helps users make better choices.

### US-08: Analyze My Meal
**As a** user,  
**I want to** describe a meal and get nutritional analysis,  
**So that** I understand what I'm eating without counting calories manually.

**Acceptance Criteria**:
- [ ] Text input for meal description
- [ ] Gemini returns: calories, protein, carbs, fats, key vitamins
- [ ] Response in < 3 seconds
- [ ] Shows healthiness score (1-10)
- [ ] Suggests one improvement per meal

**Priority**: P0 | **Size**: M

---

### US-09: Get Meal Recommendations
**As a** user with health goals,  
**I want to** get meal recommendations based on my goals,  
**So that** I don't have to research healthy meals myself.

**Acceptance Criteria**:
- [ ] User can set goal: Weight Loss / Muscle Gain / Energy / Balance
- [ ] Recommendations are specific (actual meal names)
- [ ] Each recommendation shows macros
- [ ] Recipes use commonly available ingredients
- [ ] Search grounding used for real-time nutritional accuracy

**Priority**: P0 | **Size**: L

---

### US-10: Real-Time Nutrition Data via Search
**As a** user asking about a specific food,  
**I want to** get up-to-date nutritional information,  
**So that** I'm not relying on potentially outdated data.

**Acceptance Criteria**:
- [ ] Gemini uses Search Grounding tool
- [ ] Response cites sources
- [ ] Data freshness indicated
- [ ] Handles ambiguous food names gracefully

**Priority**: P0 | **Size**: M

---

## 📚 EPIC 4: Voice Interaction

**Epic Goal**: Voice-first food guidance for hands-free moments (cooking, shopping).

### US-11: Voice Food Analysis
**As a** user cooking in my kitchen,  
**I want to** ask about nutrition by speaking,  
**So that** I don't have to stop and type on my phone.

**Acceptance Criteria**:
- [ ] Microphone button activates Gemini Live API
- [ ] Real-time transcription shown as user speaks
- [ ] AI responds in voice AND text
- [ ] Response delay < 1 second
- [ ] Visual waveform animation during listening

**Priority**: P0 | **Size**: L

---

### US-12: Voice Meal Logging
**As a** user after eating,  
**I want to** say "I just ate a bowl of pasta with chicken",  
**So that** it gets logged without manual entry.

**Acceptance Criteria**:
- [ ] Voice recognized and parsed to structured meal entry
- [ ] Confirmation shown before saving
- [ ] User can correct via voice or text
- [ ] Logged meals persist in session

**Priority**: P1 | **Size**: L

---

## 📚 EPIC 5: Location & Discovery

**Epic Goal**: Help users find healthy food options wherever they are.

### US-13: Find Healthy Restaurants Nearby
**As a** user deciding where to eat out,  
**I want to** see healthy restaurant options near me,  
**So that** I can make a good choice without researching myself.

**Acceptance Criteria**:
- [ ] Browser location permission requested
- [ ] Maps grounding returns nearby restaurants
- [ ] Filtered by health-friendly options
- [ ] Each result shows: name, distance, cuisine type
- [ ] Tap to get AI nutrition guidance on their menu

**Priority**: P0 | **Size**: L

---

## 📚 EPIC 6: Habit Building & Learning

**Epic Goal**: Build sustainable habits and coding knowledge simultaneously.

### US-14: Daily Nutrition Tip
**As a** user opening the app,  
**I want to** see a fresh nutrition tip each day,  
**So that** I learn something new without effort.

**Acceptance Criteria**:
- [ ] Tip generated by Gemini on page load
- [ ] Search grounding ensures tip is evidence-based
- [ ] Tip is actionable (not generic advice)
- [ ] Different tip each day (date-seeded prompt)

**Priority**: P0 | **Size**: S

---

### US-15: Learn How the App Works (Meta-Learning)
**As a** developer-user,  
**I want to** see how NutriSmart calls the Gemini API,  
**So that** I can learn AI integration patterns while using the app.

**Acceptance Criteria**:
- [ ] "Developer Mode" toggle shows API calls being made
- [ ] Prompt templates visible and editable
- [ ] Response raw JSON viewable
- [ ] Links to relevant Google AI docs

**Priority**: P2 | **Size**: M

---

## 🧪 Definition of Done (for all stories)

- [ ] Code passes ESLint
- [ ] No hardcoded API keys
- [ ] Responsive on mobile (375px+) and desktop (1440px)
- [ ] Passes basic accessibility check
- [ ] Error states handled (not just happy path)
- [ ] Logged in PLAN.md as complete
- [ ] Tested in Chrome via DevTools / Playwright

---

## 📊 Story Mapping Summary

| Epic | P0 Stories | P1 Stories | P2 Stories | Total |
|------|-----------|-----------|-----------|-------|
| Auth | 3 | 0 | 0 | 3 |
| Pages | 4 | 0 | 0 | 4 |
| Food AI | 3 | 0 | 0 | 3 |
| Voice | 1 | 1 | 0 | 2 |
| Maps | 1 | 0 | 0 | 1 |
| Habits | 1 | 0 | 1 | 2 |
| **Total** | **13** | **1** | **1** | **15** |