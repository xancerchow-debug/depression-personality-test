# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start dev server
- `npm run build` — production build (run this to verify changes compile)
- `npm run lint` — Next.js lint

## Architecture

A Chinese-language internet personality test ("测测你的互联网精神状态") built with Next.js 15 App Router, TypeScript, TailwindCSS, and Framer Motion. Deployed to Vercel with auto-deploy on push.

### Page flow

`/` (homepage) → `/test` (24 questions) → `/loading` (animation + API POST) → `/result` (personality result)

Test answers are computed into scores on the test page, stored in `sessionStorage` as `testResult`, and read by the loading and result pages.

### Core scoring engine (`src/lib/utils.ts`)

- 8 dimensions: `sensitivity`, `withdrawal`, `overthinking`, `numbness`, `performance`, `dependency`, `dissociation`, `collapse`
- Each question has 4 options scoring 1-4 across relevant dimensions
- Display metrics use primary-only normalization: `raw_primary_score / (primary_question_count * 4) * 100`
- 6 of 8 dimensions are displayed; `dependency` and `collapse` feed into personality matching only

### Personality matching (`src/lib/utils.ts`)

- 10 personality types defined in `src/data/personalities.ts`
- Each personality has a signature: primary dimension (75% weight) + secondary dimension (25% weight) with ideal values
- Match = `primaryMatch * 0.75 + secondaryMatch * 0.25` where match = `clamp(100 - |userNorm - ideal| * multiplier, 0, 100)`
- Primary multiplier 3.0, secondary multiplier 1.5
- Penalty if core dimension < ideal * 0.45 → score cut by 60%
- Same-primary-dimension penalty for second match (0.4x)
- Third match penalty if >= 75% of second (0.5x)
- Match percent clamped to [5, 97]

### Data files

- `src/data/questions.ts` — 24 questions, each with `dimension` and 4 `options` containing `scores` per dimension
- `src/data/personalities.ts` — 10 personality types with descriptions, behaviors, share text, color, icon, rarity, dangerMatch, collapseTime, attackIndex, chatDisappear, viralHeadline, hiddenPersonality
- `src/types/index.ts` — TypeScript interfaces for `Question`, `Option`, `Dimension`, `PersonalityType`, `TestResult`

### Supabase (optional)

Supabase is optional. Without it, the app still works — results are just not persisted server-side. The API routes (`/api/result`, `/api/stats`) gracefully degrade when Supabase is not configured. Schema is in `supabase/schema.sql`.

### Visual design

- Dark theme: `--bg-primary: #0a0a0b`, custom `dark-*` and `cold-*` color scales in tailwind config
- Film grain overlay (`.grain-overlay` in globals.css) on all pages
- City skyline component (`src/components/CitySkyline.tsx`) rendered in layout — SVG with flickering window lights
- Frosted glass cards (`.glass` / `.glass-strong` classes)
- Text gradients: `.text-gradient`, `.text-gradient-blue`
- Vignette + scanline effects on result page
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

The codebase contains Chinese text with curly quotes (「」""''). When editing strings that contain double quotes inside double-quoted strings, switch to backtick template literals to avoid parse errors.
