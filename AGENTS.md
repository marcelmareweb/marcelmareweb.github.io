## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

# AGENTS.md — THE SPOTTED APE (thespottedape.com)

## Project Directory & Environment
- **Project Root:** All Astro application files live inside `the-spotted-ape/` (if the current working directory is already `the-spotted-ape`, operate in `.`; if in the parent workspace, run all file operations and terminal commands inside `./the-spotted-ape`).
- **Framework:** Existing minimal Astro project (`astro`, TypeScript strict mode).
- **Commands (run inside `the-spotted-ape`):**
  - Install dependencies: `npm install`
  - Start dev server: `npm run dev`
  - Type & Astro diagnostics: `npx astro check`
  - Production build test: `npm run build`
- **Verification Rule:** After completing any prompt that creates or modifies `.astro` or `.ts` files, run `npx astro check` and `npm run build` to verify there are zero build or TypeScript errors before finishing your turn.

## Brand Identity & Core Positioning
- **Brand Name:** THE SPOTTED APE — The Visible Agent
- **Company:** The Spotted Ape (Pty) Ltd — Cape Town, South Africa
- **Domain & Contact:** `https://thespottedape.com` | `contact@spottedape.com`
- **Core Thesis ("The Knowledge Work Shift"):** "If AI does the work, what are you doing? Work used to be simple. Learn, make, improve, repeat. Now AI does the making. So our roles change from producing work to deciding what matters." The constraint is no longer effort; it is judgment.
- **Methodology ("The !Kharos Strategy"):** Derived from the *Welwitschia mirabilis* in the Namib Desert (where Atlantic fog meets scorching dunes), demonstrating "Rhizomatic Resilience." Built on three pillars:
  1. **Deep resilience:** Rooted in behavioural science and systems thinking. Holding clarity when tools produce infinite variation.
  2. **Editorial judgment:** Knowing what to keep, what to cut, and what actually matters. Not more thinking, but better selection.
  3. **Agentic orchestration:** Designing workflows where AI produces, but humans remain accountable for outcomes.
- **The 5-Stage Masterclass Progression (Agentic Mastery):**
  1. **Explorer (Assisted):** Confronting the gap between intent and AI output. Learning where judgment begins.
  2. **Practitioner (Partial Automation):** From prompts to workflows. Building repeatable systems instead of isolated outputs.
  3. **Integrator (Conditional Automation):** Human-in-the-loop design. Defining where human oversight is required to maintain strategic rigor and ethical compliance.
  4. **Architect (High Automation):** From using systems to designing them. Creating agentic infrastructures that operate with defined boundaries.
  5. **Steward (Full Automation):** The final shift: taste. Learning to govern outcomes, not interfaces.
- **Studio Offerings:** AI Agent Design, Creative Direction, Strategic Oversight, System Training.

## Visual & Technical Standards
- **Palette:** Warm Namib Stone (`#F6F4F0`), Elevated Sand (`#ECE8E1`), Deep Obsidian (`#121211`), Terracotta Signal (`#B85032`), Welwitschia Ochre (`#A68456`), Structural Hairline (`#DCD7CD`).
- **Typography:** Editorial serif for headings (`Newsreader` or `Instrument Serif`), crisp grotesque sans for body (`Plus Jakarta Sans` or `Inter`), monospace for system labels (`JetBrains Mono`).
- **Architecture:** Zero unnecessary client-side JS by default. Use static Astro components and scoped `<script>` tags for lightweight interactivity.
