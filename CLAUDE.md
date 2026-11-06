# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

AGENTS.md (imported above) is the authoritative source for positioning, design system, navigation, contact and deployment rules. This file adds commands, architecture context and the chosen design direction, which refines AGENTS.md within its rules; do not contradict AGENTS.md here.

## Design direction: The Decision Record

Chosen November 2026. It applies the AGENTS.md visual system and Huge structural reference; where this section is more specific, follow it.

**Reference.** hugeinc.com for structure, typography and motion only; never its colours, text, images or code.

**Mood.** Rigorous and calm, like a working document you would trust with a real decision. The site is structured the way the practice structures a decision: question, alternatives, assumptions, trade-offs, owner, review. It demonstrates the method instead of describing it.

**Brand.** The decision record is the site's structural method, not the brand idea. The brand idea, *helping teams find formation*, its voice and evidence rules live in [docs/brand-strategy/BRAND_STRATEGY.md](docs/brand-strategy/BRAND_STRATEGY.md).

**Logo.** The yellow Spotted Ape logo (`public/logo.png`) is the key brand asset and the only ape in the brand's imagery. Use the artwork as supplied: never redraw, recolour, outline, rotate or crop it. Icons and the social card are made from it (`public/favicon.ico`, `public/favicon.svg`, `public/brand/`, `public/og-card.png`); the old ring-and-spot mark is retired. Generated images are captioned as illustrations, never presented as photographs.

**Fewest steps to engaging content.**
- Every page's first viewport contains something to read or use, not an introduction to it. The homepage opens with the headline and one supporting statement, then four moments only: provocation, practice, evidence, invitation. Detail lives on the six core pages, never on the homepage.
- Exception, approved November 2026: the homepage's hold-to-enter intro (`public/beacon-gate.js`) covers the first viewport once per browser session, with Skip intro and Escape. Under reduced motion its animation is slowed, but the hold remains. No other page has an intro.
- Remove anything whose only job is to point at the next thing: jump-link rows, labels that restate a heading, transitional sections, duplicate calls to action. Keep breadcrumbs, the primary nav and one Let’s talk action.
- One click from any offering to an enquiry with its context (`contactHref`). Contact shows the three required fields first; optional organisation, team and programme fields stay available in a disclosure.

**Palette.** Tokens in `src/styles/tokens.css`; components use the semantic roles, never raw hex.

| Token | Hex | Role |
| --- | --- | --- |
| `--paper` | `#FFFFFF` | Predominant ground (about 85% of each page) |
| `--ink` | `#0D0B0A` | Text, rules, primary buttons, occasional full-bleed sections |
| `--signal` | `#FFFF00` | Accent only: a chosen alternative, the current-page bar, focus states, the primary action’s hover/focus fill, a card’s hover/focus bar and the cursor pill. Never a section or card background, never text on white. |
| `--muted` | `#626262` | Secondary text on paper (pencil) |
| `--line` | `#D9D9D9` | Row rules |
| `--surface` | `#F3F3F3` | Worksheet surface for instruments; grey card tone |
| `--muted-inverse` / `--line-inverse` | `#B3B3B3` / `#555555` | Text and rules on ink |

**Fonts.** All self-hosted from `public/fonts/` (OFL); never linked from Google’s servers. No serifs.
- Inter variable (`inter-latin.woff2`, weight and optical size): 600 (SemiBold) for display and every heading element, including small label-style headings, 400 for reading, 500 for UI. Chosen as the closest open-licence match to Huge's Matter. `font-optical-sizing: auto` gives headlines the Display cut and small text the text cut from one file; a metric-matched Arial fallback limits reflow while it loads.
- Tracking follows Inter's size-dependent spacing: `--tracking-display` −0.035em, `--tracking-heading` −0.03em, `--tracking-copy-large` −0.019em, `--tracking-copy` −0.014em, `--tracking-ui` −0.011em, labels untracked. Do not reuse the tighter Archivo-era values.
- Wordmark (`.brand`): “THE SPOTTED APE” as written, Inter 600 at 15px with +0.06em tracking (trailing tracking trimmed), 10px from the 30px ape mark.
- Character set: `ss03` (round quotes and commas) and `cv05` (tailed l) site-wide, set once in the base layer; numbers that align or change use `tabular-nums`.
- One family. No narrow or condensed faces: record field labels, ledger column heads, captions, tables and data use Inter 500 at `--text-small` through the `--font-label` token, in sentence case.
- No monospace face. The Find Formation, masterclass and About formation exercises use `--font-label`, and `--font-label-small` (Inter 500, 12px) for labels inside their diagrams, in sentence case with no tracking.

**Type scale.** Existing tokens: `--display-2xl` … `--heading-4`, `--body-large`, `--body`, then `--text-ui` 16px, `--text-small` 14px, `--text-label` 12px (the minimum). Headlines are short, end in a period and break deliberately; mobile headline sizes are set per headline.

**Corners.** `--radius-card: 16px` for card colour blocks and image frames; `--radius-tile: 8px` for small tiles. Pills keep their current radius (`--radius-pill`). Choice buttons stay square so the commitment control stays distinct. Text under media cards stays unboxed: no frame, fill or radius around it.

**Spacing and grid.** `--space-xs` 44–48px, `--space-sm` 55–64px, `--space-md` 67–80px, `--space-lg` 102–128px, `--space-xl` 170–220px. Gutter 20px below 768px, 40px above; grid gap 8/16px; 4/8/12 columns; content max 1800px. Breakpoints: 375, 767/768, 1023/1024, 1199, 1800px. Sections are separated by space or a single rule, not by background bands.

**Buttons and links.**
- Primary: ink pill, 56px minimum height (44px in the header), Inter 600 16px, yellow circle fill on hover and keyboard focus (700ms, `button-hover.ts`). One primary per view.
- On ink: the same pill in yellow with an ink label.
- Secondary: text link with a 1px underline and the SVG `Arrow` component; its arrow nudges on hover and focus. No Unicode arrows in links or buttons.
- Character roll (`text-roll.ts`) on text links, desktop nav links and footer nav links (`data-roll`): each letter slides up one line (600ms, 10ms per-letter stagger) and an identical copy rises from below. The label stays in a visually hidden span; the split letters are `aria-hidden`. Links are not split under reduced motion.
- Choice control (record alternatives, decision exercises): square corners, 1px ink border, `aria-pressed`; the chosen state fills yellow. Its square corners keep the commitment control distinct from rounded cards and pill buttons.

**Cards.** Items that people choose between or browse (offerings, cases, research, thinking) are cards in the Huge style, built with `src/components/Card.astro`:
- Two layouts. `block`: the card is a colour block (`ink`, `surface` or `paper` tone) holding its number, title and fields. `media`: a rounded image or type frame (slot `media`) above unboxed text. The title and its line read as one two-tone block (title in full colour, line in grey at the same size), and the kind of work is a pill tag over the frame’s top-left corner. A media block is built from the item’s own content (a quote, a research question, a map, a title), never a decorative illustration.
- Titles are short, oversized and end in a period. Numbered labels (01, 02…) only where the cards form a list or sequence; numbering continues across groups of the same list.
- Colour blocks and image frames use `--radius-card`; no shadows, no gradients. Optional field labels (“The question”, “What you leave with”) use `--font-label`.
- One link per card: the title link is stretched over the whole card, so the card is a single tap target and its accessible name is the title alone. Set `headingLevel` to fit the page outline.
- Rows: `.card-grid` is three columns on desktop; add `.card-grid--swipe` for a swipeable, snapping row below 1024px. Many items, or a strip of work, scroll horizontally at every width with step buttons (`work-strip.ts`); with a mouse the strip can also be dragged, snapping to the nearest card on release, and a drag never opens a card.
- Hover (fine pointers) and keyboard focus: the title underline draws in, a yellow bar draws along the foot of the card (or top of its media), the arrow nudges, and media zooms (scale 1.05, 500ms). Focus also shows a 3px ink outline and scrolls the whole card into view. Cards never fill yellow.
- Cursor pill (`card-cue.ts`, the `cue` prop): styled like the header Let’s talk pill, an ink pill with a white label at 44px, Inter 600 14px. Over a card it scales in at the pointer (300ms), fills yellow from the centre with the label turning ink (600ms), trails the pointer (400ms) and stays inside the card’s edges. Keyboard focus shows it filled in the card’s top-right corner. Labels are short and period-ended: “Read.” for cases, research and essays, “Explore.” for maps and offerings. It is `aria-hidden`; the title stays the link’s name. No pill on touch or under reduced motion.
- Stacking sheets (`.card-stack`, `card-stack.ts`): on screens at least 1024px wide and 760px tall without reduced motion, a short list of block cards becomes full-width sheets (number and title left, fields right) that stick below the header 20px apart; the next sheet slides over, and the covered sheet scales to 0.95 with its content dimmed, in step with scroll. Ink sheets carry a 1px `--line-inverse` edge. Keyboard focus on a covered sheet scrolls it clear. Otherwise the cards stay a grid or swipe row. Not currently used on a page; reserve it for a short list of block cards.
- Ledger rows (`src/components/Ledger.astro`) remain for dense reference lists on inner pages, such as schedules, resources and comparisons: a 1px ink opening rule, `--line` row rules, column heads in `--font-label`, rows stacking below 768px.
- Floating preview (a ledger item's `preview`, `ledger-preview.ts`): a rounded 4:5 ink frame (240px, `--radius-card`) showing the row's own content, such as a case quote or research question. It scales in beside the pointer (300ms) and trails it (400ms) within the ledger; keyboard focus shows it beside the row's end. It is `aria-hidden`. Use it only where a row has real content to preview (Workshops evidence).
- The decision record is the one instrument: a single ink opening rule, then field-and-value rows separated by space alone. No panel fill, no row rules, no closing rule (no chart junk). Choice controls inside it keep their 1px ink border because it marks them as controls.

**Components.** `src/components/Card.astro` for offerings, cases, research and thinking that people browse; `src/components/Ledger.astro` for dense reference lists (it drops columns no row uses, and `start` keeps a split numbered list in one sequence); `src/components/DecisionRecord.astro` or the `.record` / `.record-row` classes for field-and-value instruments; `.choice` / `.choice-group` for single-choice controls. `PageIntro` provides every inner page's breadcrumbs, headline (`short`, `default`, `long`, `sentence`) and description.

**Motion.**
- Duration: every new animation stays within 600ms. A per-letter stagger may extend the total time, but each letter’s own motion is 600ms. Entrances are our own 600ms, not Huge’s 800ms.
- The existing 700ms primary-button fill (`button-hover.ts`) is kept as the one exception.
- Easing: `cubic-bezier(0, 0, .2, 1)` is the standard ease for hover and entrance motion.
- Cards below the fold fade and rise into view (an 80ms stagger capped at three cards; `card-reveal.ts`). Cards already on screen at load are never hidden, and focus reveals a waiting card at once.
- Moments that answer an action or mark a commitment: a chosen alternative filling, the Find Formation exercise.
- Section headlines below the fold rise line by line from behind a mask (600ms per line, 60ms apart; `reveal.ts`). Only plain-text headlines are split, and each is restored to its original markup once its lines land. Other `[data-reveal]` elements fade and rise (600ms, 24px). The hero and page-intro headlines never animate: the first viewport is readable at once.
- Colour sweep (`data-sweep`, `sweep.ts`): one statement paragraph per page at most; its words move from `--text-muted` to `--text-primary` in step with scroll, from when its top reaches 80% of the viewport until its bottom reaches 60%. Used for the About statement.
- Mobile menu: the panel fades in (400ms), link lines rise in turn (500ms, 60ms apart), and closing fades out (300ms).
- Without JavaScript, everything is shown. Print shows every card and headline.

**Interaction rules.**
- Pointer-only effects (cursor pill, image zoom, floating previews, drag) apply only under `(hover: hover) and (pointer: fine)`.
- Every effect has a keyboard-focus equivalent.
- Everything is off under `prefers-reduced-motion`.
- Duplicate or decorative text (rolled letters, marquee copies, media type that repeats a title) is `aria-hidden`, so accessible names stay clean.

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
- **Styling**: design tokens are CSS custom properties on `:root` in `src/styles/tokens.css`, imported first by `src/styles/global.css`: the ink/paper/signal palette, a nine-step grey scale with semantic roles, type and spacing scales and documented breakpoints. The scale is taken from `docs/design-reference/DESIGN_TOKENS.md`. Fonts are self-hosted from `public/fonts/`. `monkey-factory.css` belongs to the isolated lab page; `home.css` is empty.
- **Content data**: most page copy and offerings are typed TS data in `src/data/` — `navigation.ts` (primary nav, active-state and breadcrumb logic), `practice.ts` (services, learning options, external public resources), `executive-masterclass.ts` (the five E–P–I–A–S masterclass days), `strategicMatrices.ts`.
- **Content collections** ([src/content.config.ts](src/content.config.ts)):
  - `cases` — Markdown in `src/content/cases/`, rendered by `src/pages/cases/[slug].astro` and listed on `/work`.
  - `insights` — custom `substackLoader` ([src/lib/substack-loader.ts](src/lib/substack-loader.ts)) that fetches the Substack RSS feed at build time and falls back to `src/data/insights-fallback.json` when unavailable. Entries carry `isFallback`. Also consumed by `src/pages/llms.txt.ts`.
- **Contact/enquiry flow**: links into `/contact/` are built with `contactHref()` in `src/lib/contact.ts` (query params limited to interest/day/module/audience/source). `src/scripts/enquiry-form.ts` prefills context from those params and submits via fetch with provider order: Web3Forms (if `PUBLIC_WEB3FORMS_KEY`) → `PUBLIC_INQUIRY_ENDPOINT` → FormSubmit default for hello@thespottedape.com, with a mailto fallback link. Env vars are documented in `.env.example` and injected in CI from repo secrets/vars.
- **Masterclass**: `/workshops/strategic-design-leadership/` composes `src/components/masterclass/*` with `src/scripts/masterclass-formation.ts`; sessions are addressed with `#session-<day-id>` fragments. The Find Formation exercise on `/thinking/` (`components/home/FindFormation.astro`, `scripts/formation-interactions.ts`) shares interaction code with it.
- **Deployment**: `.github/workflows/deploy.yml` builds and deploys to GitHub Pages on push to `main` only. Do not push without explicit instruction.

## Docs in the repo

- `docs/design-reference/` — authoritative design specs (read README + DEFINITIVE_DIRECTION first).
- `docs/brand-strategy/` — brand strategy (brand idea, voice, evidence rules, logo) and its implementation plan.
- `docs/navigation-strategy/` — navigation audit, strategy and `implementation/IMPLEMENTATION.md`.
- `docs/usability-review/`, `audit/`, `planning/` — review and historical material; observations about the old site are not the target direction.
