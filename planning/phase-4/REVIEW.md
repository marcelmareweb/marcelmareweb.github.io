> Historical planning record. Superseded for implementation by [the definitive direction](../../docs/design-reference/DEFINITIVE_DIRECTION.md) and the current AGENTS.md. Earlier palette, serif, positioning and approval-stage choices below are archival, not active instructions.

# Phase 4 — Astro homepage prototype

Status: implemented locally; ready for homepage review. Phase 5 and publication are not authorised by this document.

## Preview

The Astro background server was started using `npx astro dev --background` and reported **http://localhost:4323/**. Use `localhost`, not `127.0.0.1`: this preview binds to the IPv6 loopback address. Manage it with `npx astro dev status`, `npx astro dev logs` and `npx astro dev stop` from the project directory. In this environment, managing an already running external process may require the same execution permissions used to start it.

Working branch: `design/phase-4-warm-mineral-home`. No push, release, GitHub Pages or DNS change was made.

## Implemented

- The exact approved provocation, explanation and CTA labels.
- Warm mineral B: stone `#F6F4F0`, sand `#ECE8E1`, obsidian `#121211`, yellow `#FFFF00`, secondary text `#5C5C58`.
- Six editorial movements: Provocation, Choice, Practice, Evidence, Engagement, Invitation.
- A static Astro Find Formation component with native selection controls and a small enhancement module. Commitments, dependencies, exclusions and unresolved demands remain explicit; there is no automatic convergence or score.
- A source-led research account with situation, question, contribution and editorial learning. It is not described as a commercial client engagement.
- Projects / Methods / Instruments treatments, with an inspectable illustrative Decision Record and selective Thinking/practitioner links.
- An isolated homepage layout and stylesheet; local licensed Archivo and JetBrains Mono fonts. Other routes retain their existing layout and typography pending Phase 5.
- Native mobile navigation, keyboard enhancement, reduced motion and a complete no-JavaScript worked example.
- Existing homepage anchors `#idea`, `#work`, `#case` and `#book` remain useful to links from legacy pages.

## Deliberate Phase 4 boundary

What We Do and Work currently navigate to homepage sections. Thinking, research, the essay and the final enquiry link use existing production destinations. About, Workshops, Courses and legal links use their existing local routes. No proposed destination has been added as an empty placeholder.

The enquiry CTA reaches the existing production contact page. A new locally hosted enquiry form and its end-to-end delivery test belong to the later authorised page work. The Solar course and production archives are not migrated or altered here.

The eight files that already contained user edits were compared against byte hashes captured before this phase and remain unchanged. The old homepage source is retained in `previous-homepage.txt`; the original components are also still present. The new homepage is the sole existing application file changed by Phase 4.

## Verification

- `npx astro check`: **0 errors, 0 warnings, 0 hints** after the final source changes.
- `npm run build`: **successful**, eight pages plus sitemap. The Substack loader used its existing local fallback because the network fetch failed in the restricted environment; no feed availability claim is made.
- Real rendered Astro homepage tested at **375, 430, 768, 1024, 1440 and 1920px**, plus a **320px reflow** check. No horizontal overflow or missing images.
- Ten interaction checks passed: keyboard selection, shared demand/deferrals, capacity rejection, revision, keyboard reset, native mobile menu, reduced motion, no-JavaScript fallback, Escape/focus restoration and emulated touch.
- All six pairs expose two backed and two deferred alternatives; the two authored shared-resource pairs expose unresolved demand.
- No uncaught runtime exceptions or failed browser resource requests in the final run.
- The selected palette and the dark foreground used for project-text selection were verified from computed browser styles.
- Built homepage local files and fragment targets were checked. External destinations are preserved source links, not an assertion of end-to-end availability for all external services.

Browser: headless Chrome via CDP with device-metric/touch emulation. This does not establish physical-device testing, assistive-technology conformance, Lighthouse scores or production field performance.

## Payload observations

Archivo and JetBrains specimen WOFF2 files total **66,280 bytes**. No Newsreader/Jakarta comparison fonts are loaded by the homepage. The built homepage's two small scripts are emitted inline as approximately **3,729 bytes of module code / 1,639 bytes gzip**. A frontend framework or animation dependency was not added. The homepage's stylesheet is separate from the legacy stylesheet. These are local artefact measurements, not network performance scores.

## Review artefacts

- `screenshots/home-desktop.png` and `screenshots/home-mobile.png`: final hero rendering.
- `screenshots/b-choice-desktop.png` and `screenshots/b-choice-mobile.png`: two commitments and visible trade-offs.
- `screenshots/b-project-desktop.png` and `screenshots/b-project-mobile.png`: evidence and instrument treatment.
- `screenshots/b-full-desktop.png` and `screenshots/b-full-mobile.png`: full-page review.
- `screenshots/b-no-js-mobile.png`: non-interactive worked example.
- `browser-results.json`: viewport, state, palette and error evidence.
- `browser-check.mjs`: reproducible local browser harness; expects the preview and an isolated Chrome debugging endpoint on port 9333.

## Approval before Phase 5

Review the homepage rhythm, mobile reading order, choice composition, evidence account and navigation/CTA treatment. After approval, Phase 5 can build the remaining destinations and reconcile approved content using the preserved migration inventories. Factual questions from the decision record remain explicit; the homepage prototype does not resolve them silently.
