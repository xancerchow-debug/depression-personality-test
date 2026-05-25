# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start dev server
- `npm run build` — production build (run this to verify changes compile)
- `npm run lint` — Next.js lint

## Architecture

A Chinese-language personality test web app ("测测你的抑郁型人格") built with Next.js 15 App Router, TypeScript, TailwindCSS, and Framer Motion. Deployed to Vercel with auto-deploy on push.

### Page flow

`/` (homepage) → `/test` (36 questions) → `/loading` (animation + API POST) → `/result` (personality result)

Test answers are computed into scores on the test page, stored in `sessionStorage` as `testResult`, and read by the loading and result pages.

### Core scoring engine (`src/lib/utils.ts`)

- 8 dimensions: `sensitivity`, `withdrawal`, `overthinking`, `numbness`, `performance`, `dependency`, `dissociation`, `collapse`
- Each question has 4 options scoring 1-4 across relevant dimensions
- Raw score per dimension max = 144 (36 questions × 4 points)
- Display metrics = `raw_score / 144 × 100` (simple percentage, no complex formulas)
- 6 of 8 dimensions are displayed; `dependency` and `collapse` feed into personality matching only

### Personality matching (`src/lib/utils.ts`)

- 16 personality types defined in `src/data/personalities.ts`
- Each has an `IDEAL_PROFILES` entry — an 8-dimensional vector (0-100 scale)
- Matching uses Euclidean distance in 8D space between normalized user scores and each ideal profile
- Returns best match (primary) + second best match with match percentages
- Match percent = `(1 - distance / maxDistance) × 100`, clamped to [5, 98]

### Data files

- `src/data/questions.ts` — 36 questions, each with `dimension` and 4 `options` containing `scores` per dimension
- `src/data/personalities.ts` — 16 personality types with descriptions, behaviors, share text, color, icon
- `src/types/index.ts` — TypeScript interfaces for `Question`, `Option`, `Dimension`, `PersonalityType`, `TestResult`

### Supabase (optional)

Supabase is optional. Without it, the app still works — results are just not persisted server-side. The API routes (`/api/result`, `/api/stats`) gracefully degrade when Supabase is not configured. Schema is in `supabase/schema.sql`.

### Visual design

- Dark theme: `--bg-primary: #0a0a0b`, custom `dark-*` and `cold-*` color scales in tailwind config
- Film grain overlay (`.grain-overlay` in globals.css) on all pages
- City skyline component (`src/components/CitySkyline.tsx`) rendered in layout — SVG with flickering window lights
- Frosted glass cards (`.glass` / `.glass-strong` classes)
- Text gradients: `.text-gradient`, `.text-gradient-blue`
- Framer Motion for all page transitions and micro-interactions

### Deployment

GitHub repo: `xancerchow-debug/depression-personality-test`. Push to `main` triggers Vercel auto-deploy.

Pushing from this Windows machine requires:
```bash
"/c/Program Files/GitHub CLI/gh.exe" auth setup-git
export https_proxy=http://127.0.0.1:7897
git push
```

## String escaping note

The codebase contains Chinese text with curly quotes (「」""''). When editing strings that contain double quotes inside double-quoted strings, switch to backtick template literals to avoid parse errors. This has been a recurring issue in `questions.ts` and `personalities.ts`.
