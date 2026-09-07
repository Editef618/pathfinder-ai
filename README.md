# Byeol — student pathway prototype

Byeol connects what students learn with where they want to go.

This repository is an **interactive prototype**. All students, universities, employers,
metrics and opportunities shown are illustrative demo data. Byeol has no confirmed
university or employer partnerships and no validated outcome statistics.

## What it demonstrates

Four views are switchable at the top of the page:

- **Mobile** — the student app inside a phone frame
- **Web** — the same student experience in a desktop layout
- **University admin** — aggregated, de-identified program/department insights
- **Employer preview** — a future-ecosystem concept, opt-in only

Student screens: Home, My Path, Explore, Byeol AI, Profile, Calendar, Privacy & Data,
Career Graph and Onboarding.

### Core ideas

- **Evidence-based skill statuses** — Demonstrated / Developing / Introduced / Priority gap,
  each backed by listed evidence. Taking a course does not automatically mean mastery.
- **Adaptive pathway** — marking learning as completed changes the skill status, adds
  evidence, updates the roadmap and surfaces the next priority.
- **Explainability** — every recommendation has a "Why this?" and a "Based on" trail.
- **Privacy first** — universities see aggregates only; employer matching is off by default
  and identifiable introductions require explicit student consent.
- **Multilingual** — English, Korean, Japanese, Spanish, French and Chinese for core UI
  strings (deeper content falls back to English in this prototype).

## Running locally

```bash
bun install
bun run dev
```

The app runs at http://localhost:8080.

## Tech

TanStack Start (React 19 + Vite), TypeScript, and the original prototype stylesheet in
`src/byeol.css` so the Byeol visual identity is preserved.

```
src/
  data/demo.ts        illustrative demo data
  lib/i18n.tsx        language provider + translations
  lib/store.tsx       student state, adaptive pathway logic
  components/ui.tsx   shared UI pieces
  screens/            student screens
  views/              mobile / web / admin shells
```

## Environment

No backend or API keys are required. See `.env.example`.
