# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

AGENTS.md (imported above) is the authoritative source for positioning, design system, navigation, contact and deployment rules. This file adds commands, architecture context and the chosen design direction, which refines AGENTS.md within its rules; do not contradict AGENTS.md here.

## Design direction: The Decision Record

Chosen November 2026. It applies the AGENTS.md visual system and Huge structural reference; where this section is more specific, follow it.

**Mood.** Rigorous and calm, like a working document you would trust with a real decision. The site is structured the way the practice structures a decision: question, alternatives, assumptions, trade-offs, owner, review. It demonstrates the method instead of describing it.

**Fewest steps to engaging content.**
- Every page's first viewport contains something to read or use, not an introduction to it. The homepage opens with the headline and a working decision record directly beneath it.
- Remove anything whose only job is to point at the next thing: jump-link rows, labels that restate a heading, transitional sections, duplicate calls to action. Keep breadcrumbs, the primary nav and one Let’s talk action.
- One click from any offering to an enquiry with its context (`contactHref`). Contact shows the three required fields first; optional organisation, team and programme fields stay available in a disclosure.

**Palette.** Tokens in `src/styles/global.css`; components use the semantic roles, never raw hex.

| Token | Hex | Role |
| --- | --- | --- |
| `--paper` | `#FFFFFF` | Predominant ground (about 85% of each page) |
| `--ink` | `#0D0B0A` | Text, rules, primary buttons, occasional full-bleed sections |
| `--signal` | `#FFFF00` | Commitment only: a chosen alternative, the current nav item, the primary action’s hover/focus fill. Never a section background or decoration. Never text on white. |
| `--muted` | `#626262` | Secondary text on paper (pencil) |
| `--line` | `#D9D9D9` | Row rules |
| `--surface` | `#F3F3F3` | Worksheet surface for instruments |
| `--muted-inverse` / `--line-inverse` | `#B3B3B3` / `#555555` | Text and rules on ink |

**Fonts.** All self-hosted from `public/fonts/` (OFL); never linked from Google’s servers. No serifs.
- Archivo variable: 600 for display, 400 for reading, 500 for UI.
- Archivo Narrow (400–600): record field labels, ledger column heads, tables and data. Sentence case, no tracking.
- JetBrains Mono is retired from site chrome. It remains only inside the Find Formation and masterclass formation exercises until they are restyled without changing their behaviour.

**Type scale.** Existing tokens: `--display-2xl` … `--heading-4`, `--body-large`, `--body`, then `--text-ui` 16px, `--text-small` 14px, `--text-label` 12px (the minimum). Headlines are short, end in a period and break deliberately; mobile headline sizes are set per headline.

**Spacing and grid.** `--space-xs` 44–48px, `--space-sm` 55–64px, `--space-md` 67–80px, `--space-lg` 102–128px, `--space-xl` 170–220px. Gutter 20px below 768px, 40px above; grid gap 8/16px; 4/8/12 columns; content max 1800px. Breakpoints: 375, 767/768, 1023/1024, 1199, 1800px. Sections are separated by space or a single rule, not by background bands.

**Buttons and links.**
- Primary: ink pill, 56px minimum height (44px in the header), Archivo 600 16px, yellow circle fill on hover and keyboard focus (700ms, `button-hover.ts`). One primary per view.
- On ink: the same pill in yellow with an ink label.
- Secondary: text link with a 1px underline and the SVG `Arrow` component. No Unicode arrows in links or buttons.
- Choice control (record alternatives, decision exercises): square corners, 1px ink border, `aria-pressed`; the chosen state fills yellow. This is the only square-cornered control.

**Cards.** There are no cards. Lists of offerings, cases, resources and thinking are ledger rows:
- The ledger opens with a 1px ink rule; rows are separated by 1px `--line` rules; no fills, radii or shadows.
- Columns, left to right: number (only where the list is a sequence or the AGENTS.md numbered services list), name (Archivo 600), the question it answers, what you leave with. Column heads in Archivo Narrow. Rows stack to one column below 768px.
- Hover and focus: the name underlines and the arrow nudges; the row never fills yellow.
- The decision record is the one bordered instrument: the same row structure inside a `--surface` panel or between ink rules.

**Components.** Use `src/components/Ledger.astro` for any list of offerings, cases, resources or thinking (it drops columns no row uses), `src/components/DecisionRecord.astro` or the `.record` / `.record-row` classes for field-and-value instruments, and `.choice` / `.choice-group` for single-choice controls. `PageIntro` provides every inner page's breadcrumbs, headline (`short`, `default`, `long`, `sentence`) and description.

**Motion.** One moment per page at most, answering an action or marking a commitment (a chosen alternative filling, the inspection pause in the hero band). No entrance animation on every section. Everything is readable at rest and under reduced motion.

## Commands

- `npm install` — Node >= 22.22.0 (CI uses Node 22 and `npm ci`).
- `npx astro dev --background` — dev server; manage with `npx astro dev status | logs | stop`.
- `npx astro check` — type-check `.astro`/`.ts` (strict tsconfig). Required after any `.astro`/`.ts` change.
- `npm run build` — static build to `dist/`. Required after any `.astro`/`.ts` change.
- `npm run preview` — serve the built `dist/`.

There is no test runner, linter or Playwright dependency in the repo. "Tests" means `astro check` + `build`, plus manual browser verification (desktop + mobile, keyboard, reduced motion) as described in AGENTS.md. Contact-form checks must intercept network requests, never send real enquiries.

## Architecture

- **Static Astro 7 site** with MDX and sitemap integrations; no CSS framework (the base reset adapted from Tailwind preflight is inlined at the top of `global.css`). `site` is `https://marcelmareweb.github.io` in [astro.config.mjs](astro.config.mjs). No client framework; interactivity lives in plain TS/JS modules in `src/scripts/` imported from components/layouts as scoped scripts.
- **Layouts**: `SiteLayout.astro` is the single shell (SeoHead, Header, Footer, skip link, `global.css`, global `button-hover` script). `BaseLayout` and `HomeLayout` are thin wrappers around it — put shared chrome changes in `SiteLayout`.
- **Styling**: design tokens are CSS custom properties on `:root` in `src/styles/global.css` (ink/paper/signal palette, a nine-step grey scale with semantic roles, type and spacing scales, documented breakpoints), with the scale taken from `docs/design-reference/DESIGN_TOKENS.md`. Fonts are self-hosted from `public/fonts/`. `monkey-factory.css` belongs to the isolated lab page; `home.css` is empty.
- **Content data**: most page copy and offerings are typed TS data in `src/data/` — `navigation.ts` (primary nav, active-state and breadcrumb logic), `practice.ts` (services, learning options, external public resources), `executive-masterclass.ts` (the five E–P–I–A–S masterclass days), `strategicMatrices.ts`.
- **Content collections** ([src/content.config.ts](src/content.config.ts)):
  - `cases` — Markdown in `src/content/cases/`, rendered by `src/pages/cases/[slug].astro` and listed on `/work`.
  - `insights` — custom `substackLoader` ([src/lib/substack-loader.ts](src/lib/substack-loader.ts)) that fetches the Substack RSS feed at build time and falls back to `src/data/insights-fallback.json` when unavailable. Entries carry `isFallback`. Also consumed by `src/pages/llms.txt.ts`.
- **Contact/enquiry flow**: links into `/contact/` are built with `contactHref()` in `src/lib/contact.ts` (query params limited to interest/day/module/audience/source). `src/scripts/enquiry-form.ts` prefills context from those params and submits via fetch with provider order: Web3Forms (if `PUBLIC_WEB3FORMS_KEY`) → `PUBLIC_INQUIRY_ENDPOINT` → FormSubmit default for hello@thespottedape.com, with a mailto fallback link. Env vars are documented in `.env.example` and injected in CI from repo secrets/vars.
- **Masterclass**: `/workshops/strategic-design-leadership/` composes `src/components/masterclass/*` with `src/scripts/masterclass-formation.ts`; sessions are addressed with `#session-<day-id>` fragments. The homepage Find Formation exercise (`components/home/FindFormation.astro`, `scripts/formation-interactions.ts`) shares interaction code with it.
- **Deployment**: `.github/workflows/deploy.yml` builds and deploys to GitHub Pages on push to `main` only. Do not push without explicit instruction.

## Docs in the repo

- `docs/design-reference/` — authoritative design specs (read README + DEFINITIVE_DIRECTION first).
- `docs/navigation-strategy/` — navigation audit, strategy and `implementation/IMPLEMENTATION.md`.
- `docs/usability-review/`, `audit/`, `planning/` — review and historical material; observations about the old site are not the target direction.
