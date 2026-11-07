# Brand implementation strategy — The Spotted Ape

**Status:** Draft for owner review · **Date:** 6 November 2026 · **Implements:** [BRAND_STRATEGY.md](BRAND_STRATEGY.md) version 2.2

This plan turns the brand strategy into changes to the site, its sources and the practice's other channels. It works within [AGENTS.md](../../AGENTS.md) and the Decision Record direction in [CLAUDE.md](../../CLAUDE.md):

- No new visual system.
- Existing components only.
- Every claim traceable to `../the-spotted-ape-sources/`.
- No push, deploy or DNS change without an explicit instruction.

**What changes.** The brand idea, *helping teams find formation*, and its key asset, the yellow Spotted Ape logo, become visible and consistent. The name gets its story, the evidence base broadens, and the copy follows the voice rules. The look of the site does not change.

---

## 1. Current state

Checked in the repository on 6 November 2026.

| Item | Where | State |
| --- | --- | --- |
| Logo in header and footer | `Header.astro:10,34`, `Footer.astro:38` | The yellow Spotted Ape logo (`public/logo.png`, an 895 × 809 PNG) beside the wordmark. Correct. |
| Declared site icon | `SiteLayout.astro:21` | `<link rel="icon" href="/logo.png">`, already the logo. No `apple-touch-icon`. |
| Fallback icons | `public/favicon.svg`, `public/favicon.ico` | `favicon.svg` is the ring-and-spot mark, unlinked; check `favicon.ico`. Browsers and crawlers that request `/favicon.ico` directly may show the old mark. |
| Social card | `SeoHead.astro:16` → `public/og-card.svg` | Shows a yellow dot, not the logo. LinkedIn, Facebook and X do not render SVG social images, so shared links may show no image. |
| Name story | — | Not on the site. |
| Services throughline | `services.astro:27` | “A real decision rarely fits one capability…” sits last on the page. |
| Human–AI copy | `src/data/practice.ts:49–50` | Uncommitted owner edit: problem “If AI does the work, what are you doing?”; the question has no closing question mark. Owner to confirm. |
| Work strip | `src/components/home/WorkStrip.astro` | Map card cue “Design Strategy.” (card rules: “Explore.”); the solar card's media text repeats its title. Uncommitted edits present. |
| Cases collection | `src/content.config.ts`, `src/content/cases/` | One entry. Its fields are `clientContext`, `pattern`, `intervention`, `shift`, `result`, `quote`, `timeframe`, `featured`; no fields for the five-part case format. |
| Sources | `../the-spotted-ape-sources/` | The essay and the Creative x AI account were added on 6 November 2026. Neither is cleared for publication. |

This corrects the brand strategy's finding 9.4.3: the declared site icon is already the logo. Only the fallback icons and the social card still use the old mark.

---

## 2. Workstreams

Each workstream lists its prerequisites, the work, the files involved and how to tell it is done.

### W1. The logo as key asset

**Prerequisites:** none, other than a vector master if available (owner).

**Work:**

1. **Masters.** Add `public/brand/spotted-ape-logo.svg` if a vector source exists. Otherwise keep the PNG master and export 512, 192 and 180px PNGs from it without redrawing.
2. **Icons.**
   - Replace `public/favicon.ico` and `public/favicon.svg` with versions made from the logo, so the old ring-and-spot mark is retired everywhere.
   - Add `<link rel="apple-touch-icon" href="/brand/apple-touch-icon.png">` (180px) in `SiteLayout.astro`, next to the existing icon link.
   - Check legibility at 16px. If the eyes and smile merge, accept it as an icon simplification, but do not redraw the artwork.
3. **Social card.**
   - Replace `og-card.svg` with a 1200 × 630 `og-card.png`: paper ground, logo and wordmark at top left, “More possibilities. Harder choices.” in Inter 600, and the descriptor.
   - Update the default in `SeoHead.astro:16`. Generate the PNG from an HTML template rendered by Playwright, so the type uses the self-hosted Inter rather than Arial.
4. **Logo rules.** Leave the header and footer lock-up as they are: 30px logo, 10px gap, wordmark rules unchanged.

**Done when:**
- No page, icon or card shows the ring-and-spot mark.
- A pasted link previews with the logo card (check with LinkedIn Post Inspector and a local Open Graph debugger).
- `astro check` and `build` pass.

### W2. Helping teams find formation, in copy

**Prerequisites:** none. This is copy only, and the homepage headline and promise stay unchanged.

**Work:**

1. **Metadata.** Bring the brand idea into the page descriptions without changing the titles.
   - About (`about.astro:8`): *“The independent practice of Marcel Maré. Helping teams find formation: strategic decisions, behavioural design and human judgement.”*
   - Homepage meta description: keep the first sentence; add *“Helping teams find formation.”* only if it fits within about 160 characters.
2. **`src/pages/llms.txt.ts`.** Add the positioning sentence (strategy 4.3) and the principle *Useful, never indispensable.*
3. **Services (`services.astro`).**
   - Move the closing section's line (line 27) up, directly under `PageIntro`.
   - Rewrite it as the throughline: *“One decision, three questions: where to go, what enables people to act, and where human judgement stays accountable.”*
   - Remove the now-duplicated closing section, or keep only its Workshops & learning link.
4. **Voice sweep.**
   - Search `src/` for banned words (strategy 7.1): unlock, empower, leverage, transform, cutting-edge, innovative, world-class, AI-powered, synergy, guaranteed, best, only. Fix any found in visible copy.
   - Do not touch retired-programme text, which AGENTS.md already excludes.

**Done when:**
- The sweep's results show no banned words in visible copy.
- The services page opens with the throughline.
- Titles, URLs and anchors are unchanged.

### W3. The name story

**Prerequisites (gated):**
- Independent confirmation of the aircraft facts (strategy 12.2.2).
- An image decision: a cleared archival photograph, or `spotted-ape-2.jpg` (bombers above cloud) labelled as an illustration, after checking the generator's terms.
- A `CLEARANCES.md` entry for whichever image is used.

**Work:**

1. **About.**
   - Add a section titled *“Why The Spotted Ape?”* with `id="name"`, after the biography and before Let's talk.
   - Use the strategy's 6.2 copy, set as a standard `section-y` with a split layout. The headline (“Why The<br />Spotted Ape?”) uses the existing `reveal.ts`.
   - If an image is used, set it in a `--radius-card` frame, with a caption naming it as a photograph (with its source) or an illustration.
   - Link to the essay with a text link and `Arrow`.
2. **Homepage.**
   - Add one text link, *Why the name?*, to `/about/#name`, in the practice moment beside the existing links. Not in the first viewport.
   - CLAUDE.md's rule against pointer-only elements applies, so keep it to a single link.
3. **Optional.** In the About section, reuse `FormationGraphic` rather than adding a new animation.

**Done when:**
- Every fact matches the essay and the independent source.
- The image caption is truthful.
- `/about/#name` loads directly and scrolls below the sticky header.
- The page works without JavaScript and with reduced motion.

### W4. Evidence and case accounts

**Prerequisites (gated):** Creative x AI client, participant and image permissions, plus the missing facts (client, dates, participant numbers); policy-analyst publication permission.

**Work:**

1. **Schema.** Extend the `cases` schema with optional five-part fields: `challenge`, `investigation`, `designedExperience`, `observed`, `uncertain` and `evidenceType`. Keep the existing fields, so `strategic-review.md` and `/cases/[slug]` keep working. Render the five-part fields with `DecisionRecord` / `.record-row` when present.
2. **Creative x AI.** Add `src/content/cases/creative-x-ai.md`.
   - Evidence type: *Workshop series / Reported and observed outcomes*.
   - Keep reported outcomes (confidence, creative identity) separate from observed ones (hesitation, peer feedback).
   - Leave out the “scalable model” and “transferable to” claims.
   - State its limit: AI-supported creative learning, not executive AI governance.
3. **Linking.**
   - Link the case from Human–AI Decision Design (`practice.ts` `evidence`) and Behavioural Design as secondary evidence.
   - Add a card to `/work/`, and to the work strip only if it replaces an item (the strip stays short).
4. **Solar.** Label it *Educational simulation* wherever it appears as evidence (work strip `kind`, `/work/`, `/learning/`).
5. **Work strip fixes.**
   - Change the map card cue to “Explore.”
   - Replace the solar media text with the course's own question, or remove it so the photo stands alone.

**Done when:**
- Every case carries an evidence-type label and a limits statement.
- Nothing is published without its `CLEARANCES.md` entry.
- Existing case URLs still resolve.

### W5. Services copy

**Prerequisites:** owner decisions on the Human–AI problem and question (confirm the uncommitted edit, and add the question mark).

**Work:**
- Align `practice.ts` with the three parts of the positioning (where to go / what enables action / where judgement stays accountable).
- Keep `id`, `interest` and `number` unchanged, because `contactHref` and the contact form depend on them.
- Update the matching labels in the contact form's interest options; keep their values.

**Done when:** the copy is consistent between `/services/`, the homepage practice moment, contact options and `llms.txt`.

### W6. Beyond the website

Owner-led, with templates supplied from the repository's tokens.

| Item | Spec |
| --- | --- |
| Avatars (LinkedIn, Substack, email) | The logo alone, from the 512px export |
| Email signature | *Marcel Maré · The Spotted Ape · Strategic decision and behavioural design · Useful, never indispensable. · hello@thespottedape.com* |
| LinkedIn headline | *Strategic decision and behavioural design · Helping teams find formation · Cape Town* |
| Slide master | Paper ground, Inter 600 period-ended headline, logo top left, yellow only for a chosen option |
| Proposal template | Logo and wordmark cover; opens with a decision record (question, alternatives, assumptions, trade-offs, owner, review); closes with “What you will be able to do without us” |
| Case-account template | The five-part format (W4) |
| Substack essay | Figure 1: name the archive and say the photograph is colourised. Figure 2: say it is an AI-generated illustration (strategy 8.4) |

### W7. Documentation and governance

- **AGENTS.md:** add `docs/brand-strategy/` to the design-reference reading list, as the source for brand idea, voice and evidence rules. Only with owner approval, since AGENTS.md is authoritative.
- **CLAUDE.md:** in the Decision Record section, note that the decision record is the site's *structural* method, while the brand idea lives in the brand strategy. Add the logo rules (strategy 8.1) under a short Logo heading.
- **Sources:** add an entry to `../the-spotted-ape-sources/CLEARANCES.md` for each image and case the moment it is cleared.
- **Memory:** record the brand idea and the logo-as-key-asset decision so future sessions keep them.

### W8. Research

These run in parallel and feed the copy (strategy Section 11).

1. **Buyer interviews:** eight interviews in weeks 1–3. Synthesise them in `docs/brand-strategy/research/` with no personal data and no verbatim quotes without consent.
2. **Five-second tests:** variants A and B of the homepage supporting sentence, after the interviews. The design stays constant. Only a copy change follows; the headline stays.
3. **Recognition:** review at six months.

### W9. Domain, Stage A only

1. Inventory every thespottedape.com URL: `/Courses/` (uppercase), `/research/`, `/posts/`, downloads and inbound links. Record them in `docs/brand-strategy/domain-inventory.md`.
2. Draft the redirect or preservation map.
3. Stop there. Stage B needs an explicit instruction and an AGENTS.md update.

---

## 3. Sequence

| Release | Contents | Gate |
| --- | --- | --- |
| **R1: no blockers** | W1 logo assets and social card; W2 copy, metadata, throughline and voice sweep; W4.4–5 Solar label and work-strip fixes; W7 docs (after approval) | Owner approves this plan |
| **R2: owner decisions** | W5 services copy | Human–AI wording confirmed |
| **R3: verification-gated** | W3 name story; W4.1–3 schema and Creative x AI case | Historical check, image clearance, case permissions |
| **Parallel** | W6 off-site; W8 research; W9 Stage A | Owner time |
| **Later** | W8 copy changes from tests; Raykis mentions; domain Stage B | Research results; Raykis agreement; explicit instruction |

Each release is one branch (for example `brand/r1-logo-and-copy`), reviewed locally and merged to `main` only on instruction. Merging to `main` deploys, so it is never done automatically.

---

## 4. Verification

Required for every release that touches `.astro` or `.ts` (AGENTS.md):

- `npx astro check` and `npm run build`, with no errors.
- **Playwright at 375, 768, 1024 and 1440px:** headline breaks, the new About section, the services throughline, the work strip and the logo at every size.
- **Keyboard:** all new links are reachable with focus visible; `/about/#name` and `/services/` anchors work on direct load, reload, Back and Forward.
- **Reduced motion and no JavaScript:** all new content is visible, and reveals are off.
- **Print:** the About story and case accounts print in full.
- **Social preview:** the PNG card renders in a debugger.
- **Contact:** prefill from services still works. Intercept requests; never send real enquiries.
- **Evidence audit:** every new factual sentence maps to a source file, and every image to a `CLEARANCES.md` row.

---

## 5. Guardrails

- Do not change routes, anchors, `contactHref` identifiers, the external `/Courses/` resources or Find Formation's two-choice limit and no-data-sent promise.
- No AI-agency framing, outcome guarantees, prices or cohort dates.
- No generated image presented as a photograph; the logo is the only ape in the imagery.
- No Raykis co-branding before an agreement.
- No push, deploy or DNS change without explicit instruction.

---

## 6. Decisions needed before R1

1. Approve this plan and the R1 scope.
2. Is there a vector source for the logo? If not, approve PNG-derived icons.
3. Approve the AGENTS.md and CLAUDE.md pointers (W7).
