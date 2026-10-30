# Phase 3 verification report

Date: 24 October 2026. Scope: isolated review specimens only; no production accessibility or performance certification is implied.

## Rendered specimens

Chrome 155 through the DevTools Protocol rendered A, B, C and the typography comparison at 375, 430, 768, 1024, 1440 and 1920 CSS pixels. No horizontal page overflow was found in those 24 combinations. B also passed a 320px reflow check. Browser device-metric emulation was used; these are not photographs of physical devices.

Screenshots include each direction's desktop/mobile hero, B's choice and evidence treatments, B's complete page, the typography specimen and the no-JavaScript example. Visual inspection found and corrected a clipped mobile project illustration. No broken images, failed resource requests or uncaught runtime exceptions were reported in the browser pass.

## Behaviour

Verified in-browser: keyboard Space selects a choice; two choices expose dependencies, shared demand and exclusions; a third choice preserves existing commitments; deselection allows revision; keyboard Enter resets; native mobile disclosure opens with Enter; emulated touch selects through the full label; reduced motion removes transitions; disabled JavaScript retains the worked example, navigation and CTA. All six pairs produce two backed/two deferred alternatives, with shared demand exposed for the two authored shared-resource pairs.

Escape closes the mobile disclosure and restores focus to its summary. All ten recorded interaction checks passed in the final browser run; all six choice-pair checks and the 320px reflow check also passed. Refer to `browser-results.json` for the individual results.

The checks exercise genuine DOM events, keyboard dispatch and emulated touch. They do not replace assistive-technology review, a human reading study or physical-device testing. No real enquiry was submitted, and no existing course was rewritten.

## Typography evaluation

| System | Hierarchy and wrapping | Reading and identity | Delivery implications |
|---|---|---|---|
| Archivo-led | Strong, compact display hierarchy; no page overflow at tested widths. Mobile uses a three-line natural wrap of the headline. | Direct commercial voice; does not compete with the monkey artwork. Reading remains consistent with the interface. | Archivo 34,940 bytes plus JetBrains 31,340 bytes = 66,280 font bytes in the directional specimens. |
| Archivo + Newsreader reading | Same display/interface content and dimensions as Archivo-led. | A visible register change for reading; worthwhile candidate, subject to reader preference. | Current Newsreader specimen adds 131,848 bytes. Not approved as-is for production; use a smaller static/subset instance and route-specific loading. |
| Existing font-role control | Newsreader headings, Jakarta body/interface and JetBrains labels. Common specimen sizes keep content comparable. | Familiar editorial voice; retains existing type roles. More tonal separation between headings and interface. | Newsreader + Jakarta + JetBrains = 190,460 specimen font bytes. These are local downloaded comparison files, not measurements of the current live site's transfers. |

The full typography comparison deliberately uses all four families: 225,400 decoded font bytes. The prototype has `font-display:swap`, local WOFF2 files and no Google Fonts runtime request. Cache, compression and network conditions affect transfer and rendering times; file sizes are not Core Web Vitals scores.

Preferred next step: Archivo for commercial headings/interface. Keep the serif decision open for long-form content. The browser specimens support review; they do not establish universal reading superiority.

## Contrast

WCAG relative-luminance calculations for the proposed colour pairs:

| Pair | Ratio |
|---|---:|
| Ink / paper | 17.06:1 |
| Ink / signal | 17.11:1 |
| Muted ink / paper | 6.02:1 |
| Muted light / ink | 10.47:1 |
| Interactive rule / ink | 4.13:1 |
| Dark secondary text / signal | 8.39:1 |

Decorative light hairlines are not control boundaries or text. Buttons use focus colours chosen for their surrounding surface, not merely their text colour. Selection is indicated by state words and dash/fill treatments as well as colour. The diagram is redundant to readable controls/consequences.

## Performance and scope

The interaction script is 4,983 bytes raw / 1,930 bytes gzip; the shared comparison stylesheet is 24,979 bytes raw / 5,808 bytes gzip. Local file references and same-page anchors resolve; both logo copies and both preserved Phase 2 inventories are byte-identical to their sources. JavaScript syntax checks pass. No frontend framework, animation library or package dependency was added. No storage or network request occurs when choices change.

The same six movements appear in each specimen. The secondary architecture is documented rather than implemented in production. Screenshots, review fonts and prototypes stay outside Astro's page/public directories. The application's source files were not edited, so the source-change rule requiring Astro diagnostics/build is not triggered by Phase 3. JavaScript syntax, actual browser behaviour and local artefact integrity are the relevant checks here.

No Lighthouse score, WCAG conformance statement, field performance result or end-to-end enquiry-delivery claim is made.

## Reproduction

1. Start the static planning server described in `planning/README.md`.
2. Launch a separate headless Chrome profile with remote debugging on localhost port 9333.
3. From the repository root, run `node planning/phase-3/qa/browser-check.mjs`.
4. Inspect `browser-results.json` and `screenshots/`, including actual image rendering.
5. Stop the owned browser and server after review.

The harness uses Node's built-in WebSocket and fetch APIs; no browser testing package is installed. Local browser execution and localhost access may require environment approval.
