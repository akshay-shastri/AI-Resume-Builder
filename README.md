# AI Resume Builder - KodNest Premium Build System

Project 3 - Build Track

## Routes

- `/rb/01-problem` - Problem Definition
- `/rb/02-market` - Market Research
- `/rb/03-architecture` - System Architecture
- `/rb/04-hld` - High-Level Design
- `/rb/05-lld` - Low-Level Design
- `/rb/06-build` - Build Implementation
- `/rb/07-test` - Testing
- `/rb/08-ship` - Ship to Production
- `/rb/proof` - Proof Page

## Features

- Premium Layout with Top Bar, Context Header, Workspace, Build Panel, and Proof Footer
- Step-by-step gating system (no skipping)
- Artifact upload requirement to proceed
- LocalStorage-based artifact tracking
- 8-step progress visualization
- Final submission page with links

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Gating System

- Each step requires artifact upload before proceeding
- Artifacts stored as `rb_step_X_artifact` in localStorage
- Next button disabled until artifact uploaded
- Proof page requires all 8 steps complete

## Build Panel Actions

- Copy This Into Lovable - Copy build prompt
- Build in Lovable - Open Lovable.dev
- It Worked - Mark step complete
- Error - Report error
- Add Screenshot - Upload screenshot

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Lucide Icons
