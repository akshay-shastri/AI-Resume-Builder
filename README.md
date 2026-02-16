# AI Resume Builder — Build Track  
Project 3 inside KodNest Premium Build System

Live Deployment:  
(Insert your deployed URL here)

GitHub Repository:  
https://github.com/akshay-shastri/AI-Resume-Builder

---

## Overview

AI Resume Builder is a structured, deterministic resume construction platform built as part of the KodNest Premium Build System.

This is not a template generator.
This is not a drag-and-drop toy.

It is a disciplined, logic-driven resume engine with:

- Deterministic ATS scoring
- Structured data persistence
- Template switching without logic mutation
- Print-optimized PDF export
- Strict validation rules
- Build-track gating and proof system

Everything is designed under a premium SaaS design philosophy.

---

## Design Philosophy

Built using the KodNest Premium Build System.

Design principles:

- Calm
- Intentional
- Coherent
- Confident

No gradients.  
No glassmorphism.  
No neon colors.  
No animation noise.  

Typography:
- Serif headings
- Clean sans-serif body (16–18px)
- Strict spacing scale (8 / 16 / 24 / 40 / 64)

Layout Structure:
Top Bar → Context Header → Primary Workspace → Secondary Build Panel → Proof Footer

---

## Architecture Overview

Framework:
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- localStorage persistence
- Deterministic scoring logic

Routing Structure:

/rb/01-problem  
/rb/02-market  
/rb/03-architecture  
/rb/04-hld  
/rb/05-lld  
/rb/06-build  
/rb/07-test  
/rb/08-ship  
/rb/proof  

Core Application Routes:

/  
/builder  
/preview  
/proof  

---

## Core Capabilities

### 1. Structured Resume Builder

Sections:

- Personal Information
- Summary
- Education (multiple entries)
- Experience (multiple entries)
- Projects (accordion-based)
- Skills (categorized tags)
- Links (GitHub, LinkedIn)

Live preview updates in real-time.
Empty sections do not render.

---

### 2. Deterministic ATS Scoring System (v2)

Score range: 0–100

Rules include:

+10 name  
+10 email  
+10 summary length  
+15 experience with bullets  
+10 education  
+10 skills threshold  
+10 project presence  
+5 phone  
+5 LinkedIn  
+5 GitHub  
+10 action verbs in summary  

No randomness.  
No external AI.  
Fully rule-based scoring.

Visual states:

0–40 → Red (Needs Work)  
41–70 → Amber (Getting There)  
71–100 → Green (Strong Resume)

---

### 3. Autosave + Persistence

All data stored under:

resumeBuilderData

On refresh:
- Form data restored
- Template restored
- Color theme restored
- Score restored

No backend required.
Works fully offline.

---

### 4. Template System

Three layout templates:

- Classic
- Modern
- Minimal

Switching templates:
- Changes styling only
- Does NOT change content
- Does NOT change score logic

Template selection persisted in localStorage.

---

### 5. Color Theme System

Five accent themes:

- Teal
- Navy
- Burgundy
- Forest
- Charcoal

Theme updates:
- Preview
- Template
- PDF output styling

Persisted across refresh.

---

### 6. Bullet Discipline Engine

Experience & Project bullet validation:

If bullet:
- Does not start with strong action verb → suggestion shown
- Has no measurable numbers → suggestion shown

Non-blocking guidance.
Improvement panel displays top 3 improvements.

---

### 7. Export System

On /preview:

- Print / Save as PDF (browser print optimized)
- Copy Resume as Text (clean structured plain text)

Print Rules:

- White background
- Clean A4 layout
- No UI elements in print
- No split bullet issues
- No colored accents

Validation warning if:
- Name missing
- No project or experience

Export never blocked.

---

### 8. Skills + Projects Management

Skills grouped into:

- Technical Skills
- Soft Skills
- Tools & Technologies

Tag input system.
Removable chips.
Count per category.

Projects:
- Accordion entries
- Title
- Description (200 char limit)
- Tech stack tags
- Optional links
- Delete support

All persisted.

---

### 9. Build Track Gating System

Cannot skip steps.

Each step:
- Requires artifact
- Stores under rb_step_X_artifact
- Next button disabled until proof uploaded

Final Proof Page (/rb/proof):

Requires:
- Lovable link
- GitHub link
- Deploy link

Stored under:
rb_final_submission

Shipped status triggered ONLY if:

- All 8 steps completed
- All 10 test checklist items passed
- All 3 proof links provided

Otherwise:
"In Progress"

Completion message:
"Project 3 Shipped Successfully."

No confetti.
No animation noise.
Premium calm finish.

---

## Test Checklist

10 Deterministic Tests:

□ localStorage saves  
□ preview updates live  
□ template switching preserves data  
□ color persists  
□ ATS scoring correct  
□ score updates live  
□ export works  
□ empty states handled  
□ mobile responsive  
□ no console errors  

Shipping locked until complete.

---

## Deployment

Local Development:

```
npm install
npm run dev
```

Production Deployment:
(Insert deployment instructions or live URL here)

---

## What Makes This Different

- Fully deterministic ATS scoring
- Strict schema enforcement
- Build-track gating system
- Proof-based shipping logic
- Template + logic separation
- Print-optimized export formatting
- No external APIs
- Offline persistence

This is not a tutorial clone.

It is a structured, engineered resume product built with intentional architecture and shipping discipline.

---

## Status

Project 3 — In Progress / Shipped (update accordingly)

