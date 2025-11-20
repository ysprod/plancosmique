# Copilot Instructions for Mon Etoile

These notes make AI agents productive immediately in this repo. Keep guidance specific to this codebase and follow the conventions below.

## Project Overview
- Framework: Next.js 14 (App Router) with TypeScript.
- UI: Tailwind CSS utilities, custom CSS in `app/globals.css`, icons via `lucide-react`, animations via `framer-motion`.
- Structure: App directory routes like `app/page.tsx` (home) and `app/voyance/page.tsx`.
- Language: French copy and metadata. Default `<html lang="fr">` in `app/layout.tsx`.

## Run, Build, Lint
- Dev server: `npm run dev` → open `http://localhost:3000`.
- Production build: `npm run build`; start: `npm run start`.
- Lint: `npm run lint` (Next ESLint config).
- Requirements: Node 18+. On Windows PowerShell, run commands exactly as above.

## Key Conventions
- Client components: Pages using `framer-motion` are client-only (`'use client'`) e.g. `app/page.tsx`, `app/voyance/page.tsx`.
- Styling:
  - Prefer Tailwind utility classes for layout and effects.
  - Shared palette in `tailwind.config.ts` under `theme.extend.colors.cosmic` and CSS variables in `app/globals.css` (`--cosmic-*`).
  - Animations use Tailwind where possible (e.g., `animate-pulse`) and custom keyframes in `globals.css` (`float`, `glow`).
- Routing: To add a section (e.g., tarot), create `app/tarot/page.tsx`. No `pages/` directory is used for routes.
- Assets: Public assets go in `public/`. Remote images use Next Image with allowlist (see below).

## Configuration Gotchas
- Next config duplication: Both `next.config.js` and `next.config.ts` exist.
  - Active: `next.config.js` (Next 14 prioritizes JS). It defines `images.remotePatterns` for `https://www.genspark.ai/api/files/**` (used by the logo in `app/page.tsx`).
  - `reactCompiler` is not supported on Next 14; do not add it to the config. If upgrading to Next 15+, re-evaluate before enabling.
  - Keep configs in sync or consolidate; ensure the images allowlist remains present.
- PostCSS duplication: `postcss.config.js` (tailwindcss + autoprefixer) and `postcss.config.mjs` (`@tailwindcss/postcss`). Use one; keep them consistent.
- TypeScript: Strict mode enabled; path alias `@/*` → repo root (`tsconfig.json`).

## Pages and Patterns
- Home (`app/page.tsx`):
  - Uses `framer-motion` variants (`containerVariants`, `itemVariants`) for staggered reveals.
  - Service cards array (`services`) drives grid; add new entries to surface new routes.
  - `<Image src="https://www.genspark.ai/api/files/..." />` requires the images remote pattern in Next config.
- Voyance (`app/voyance/page.tsx`):
  - Local data model: `predictions: Record<string, string[]>` keyed by category.
  - UI state via `useState`; simulate async with `setTimeout` for a “reveal”.
  - Reusable category definition array drives UI and colors.
- Layout (`app/layout.tsx`):
  - Global font via `next/font/google` (`Inter`), metadata (title/description/keywords), and French locale root.

## Adding New Features (follow current patterns)
- New route: create `app/<route>/page.tsx` as a client component if it uses interactive libs.
- New card on home: add to `services` in `app/page.tsx` with `href`, `title`, `icon` from `lucide-react`, and gradient colors.
- New remote images: update Next images allowlist with the host in the active Next config.
- Theming: use `cosmic` colors from Tailwind theme or CSS vars; keep gradients consistent with existing `from-*/to-*` patterns.

## External Dependencies
- `framer-motion`: animation primitives and variants; keep components client-side where used.
- `lucide-react`: import icons individually; maintain consistent sizing (`w-6 h-6` etc.). Avoid non-existent icons (e.g., `Crystal`); prefer `Gem`, `Star`, etc.
- Next Image: relies on `images.remotePatterns` for external hosts.

## Deployment
- Build locally with `npm run build`. Vercel is suggested in `README.md`; configure env and Next config consolidation before first deploy.

## Examples
- Add a Tarot page quickly:
  - File: `app/tarot/page.tsx` (client component). A basic page already exists.
  - Link: update or add a card in `services` in `app/page.tsx` with `href: "/tarot"`.
  - If using external images, add the host to the images allowlist.

Keep edits small and aligned with these patterns. If you modify configs, verify dev server still loads images and animations correctly.