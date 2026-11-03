# The Spotted Ape

Website of The Spotted Ape (Pty) Ltd, an independent strategic decision and behavioural design practice in Cape Town. Published at https://marcelmareweb.github.io.

## Commands

| Command | Action |
| :-- | :-- |
| `npm install` | Install dependencies (Node 22.22 or later) |
| `npx astro dev --background` | Start the dev server; manage it with `npx astro dev status`, `logs` or `stop` |
| `npx astro check` | Type-check `.astro` and `.ts` files |
| `npm run build` | Build the static site to `dist/` |
| `npm run preview` | Serve the built site |

Run `npx astro check` and `npm run build` after any `.astro` or `.ts` change.

## Where things are

- `src/pages/` — routes. `src/layouts/SiteLayout.astro` is the shared shell.
- `src/components/` — shared components, including `PageIntro`, `Ledger` and `DecisionRecord`.
- `src/data/` — offerings, navigation and masterclass content as typed data.
- `src/styles/global.css` — design tokens and shared styles.
- `docs/design-reference/` — the design research and specifications.

## Rules

[AGENTS.md](AGENTS.md) holds the positioning, design, navigation, contact and deployment rules. [CLAUDE.md](CLAUDE.md) adds the chosen design direction and architecture notes. Pushing to `main` deploys the site, so push only when a release is intended.
