# The Spotted Ape: assessment

Audited 1 November 2026. Source: `~/Documents/astro-projects/the-spotted-ape`, HEAD `0b1d240`, the commit live on `main`. Nothing in the site was changed.

**Tags:** [V] verified in this audit. [A] assumption or judgement. Scores are judgement; their evidence is verified.

**Corrections (see [strategy.md](strategy.md)):** Technical measurements stand. The brand judgements don't. Proof scored only what's on this site and ignored the real portfolio and thesis. Findings 1, 3 and 9 misread formation, the cookstove evidence and the monkey as weaknesses.

## Gist

An independent Cape Town practice that helps leaders make consequential decisions and carry them through, and the reason to choose it is that it works on the decision itself (alternatives, trade-offs, owner, review) rather than on another plan.

## Scorecard

| Area | Score | Evidence |
|---|---:|---|
| Clarity | 6 | The fold explains the offer ("We help leaders make consequential choices…"), but the line and "Find your formation." compete beside it. |
| Positioning | 5 | Distinct idea, but thespottedape.com leads with "If AI does the work," and marcelmare.com with "I Help People Think Clearly". |
| Proof | 3 | One case and one research pilot. The case is a finished draft, not a decision outcome. |
| Offer | 5 | Three capabilities are clear; three learning formats and 43 numbered labels blur them. |
| Identity | 4 | Cartoon monkey plus a type scale measured from Huge (`global.css:21`). Polished, but not ownable. |
| UX/Conversion | 5 | Good keyboard and no-JS behaviour; the home page runs 15 mobile screens and buries the one question at the end. |
| SEO | 4 | One invalid robots line costs Lighthouse 8 points. Searches for the brand returned nothing from the site. |
| Content | 6 | Careful and honest, with qualified findings. Too many headline-sized ideas. |
| Social | 1 | SVG share image on every page; no LinkedIn, Substack or newsletter link anywhere on the site. |
| Technical | 8 | Astro check clean, 0 broken internal links, 97–100 Performance. Minor debris only. |

## Top 10 findings

1. **The line is hidden and "formation" outranks it.**
   - Evidence: "Make a choice. Own its consequences." appears only as small print (`index.astro:34`) and in the mobile menu (`Header.astro`). "Find your formation." is larger beside it and is an `h2` in the footer of every page except the lab prototype (`Footer.astro:31`).
   - Recommendation: one governing line; retire the rest (list in the plan).

2. **The name already has a real story, and it isn't "the one who notices".**
   - Evidence: Marcel's essay (`thespottedape.com-web-3/posts/substack/2025-11-12-the-flying-spotted-ass-ape…qmd`) traces it to a polka-dotted B-24 assembly ship that gathered bombers into formation. Independent sources confirm the aircraft and its red and blue dots (Vintage Wings, American Air Museum).
   - Correction: the essay's caption gives serial 42-50346; the museum lists 41-28697.
   - Recommendation: use the true story. Polka dots also justify the spot symbol.

3. **The proof case doesn't yet prove the promise.**
   - Evidence: `strategic-review.md` says "Final draft in 9 days." That is an individual analyst's report: an output with no baseline, and no decision or consequence. `planning/DECISIONS.md` #17 lists the result, quotation and permission as "pending evidence approval", and I found no later clearance, though the case is live.
   - Recommendation: clear it, describe it as exactly what it is, and find one decision-level case.

4. **Two live sites make rival claims, and the domain move has a trap.**
   - Evidence: thespottedape.com (separate Quarto repo, `spottedape/spottedape.github.io`) is live with "If AI does the work,". This site links to it for the course, research and essay (`data/practice.ts:110-113`). Those paths don't exist on github.io (`/Courses/solar-investment/learn/` returns 404). Pointing the domain here today would break those links.
   - Recommendation: don't switch DNS until that content is migrated. Treat the switch as a separate project.

5. **Every share preview is broken.**
   - Evidence: `SeoHead.astro:14` defaults to `/og-card.svg`, served as `image/svg+xml`. As your brief notes, LinkedIn and WhatsApp won't render it. No width, height or alt tags.
   - Recommendation: 1200×630 PNG plus those tags.

6. **The external footprint is close to nil and unmeasured.**
   - Evidence: two searches returned nothing from the site for "The Spotted Ape". The site has no social links and no analytics (`privacy.astro:57`). The feed URL is wrong: `substack-loader.ts:18` uses `thespottedape.substack.com/feed`, which returns HTML, while `spottedape.substack.com/feed` returns XML, so every build falls back to local entries.
   - Limit: the search tool is US-only and thin on small sites, so treat this as indicative.
   - Recommendation: fix the feed, add LinkedIn and Substack links, and decide on analytics.

7. **The home page asks for too much.**
   - Evidence: 15 screens at 375px, 13 at 1440px; 738 words, 27 links, 69 tab stops; six numbered sections.
   - Recommendation: five blocks. Targets [A]: 200 words or fewer, 6 mobile screens or fewer.

8. **The founder is invisible, despite strong verified credentials.**
   - Evidence: no photo or credential on the home page; the name first appears deep in `/about`. Verified: DTech (Design), Cape Peninsula University of Technology, 2022; Maré, M'Rithaa and Chisin, *Sustainability*, 2023. "Over twenty years" is self-stated on marcelmare.com.
   - Recommendation: face and one credential beside the final question.

9. **The identity borrows rather than owns.**
   - Evidence: `global.css:21` reads "Measured reference scale", and `DEFINITIVE_DIRECTION.md` copies Huge's type scale, grid and timings. The smiling monkey (`public/logo.png`) undercuts "consequential". The 895×809 PNG is shown at 30px and wastes 67 KB, the page's largest saving.
   - Recommendation: take Huge's patterns, not its measurements, and build a system around the spot.

10. **Small credibility and SEO debris.**
    - `robots.txt:5` has an unknown `LLMs-Txt` directive: the only reason SEO scores 92.
    - The case canonical omits the trailing slash the sitemap uses. `/404.html` has a canonical to a URL that returns 404.
    - The noindex `/lab/monkey-factory/` is in the sitemap. 145 internal links lack a trailing slash, and the three such paths I tested (`/about`, `/services`, `/work`) answer with a 301.
    - The Human–AI "evidence" links to a café strategy map (`practice.ts:61`).
    - The Mike Tyson portrait is AI-generated (`mike-tyson.prompt.md`), which is a likeness risk [A].
    - Nine components have no imports, including `KharosStrategy`.
    - Contact uses the FormSubmit fallback unless a production key is set. Delivery isn't verified: I sent no test message, per `AGENTS.md`.

## Technical results

| Mobile Lighthouse | Perf | A11y | Best practices | SEO | LCP |
|---|---:|---:|---:|---:|---:|
| Live: home | 97 | 100 | 100 | 92 | 1.6 s |
| Live: services | 98 | 100 | 100 | 92 | 1.4 s |
| Live: case | 99 | 100 | 100 | 92 | 1.7 s |
| Local preview: home | 99 | 100 | 100 | 92 | 1.7 s |
| Local preview: services | 100 | 100 | 100 | 92 | 1.6 s |
| Local preview: case | 100 | 100 | 100 | 92 | 1.4 s |

- **Build and types:** `npm run build` built 16 pages; `astro check` found 0 errors, 0 warnings, 0 hints in 71 files.
- **Links:** 0 broken internal links or anchors. All external links return 200 except the DOI (403 to my script; Crossref confirms the DOI) and the `/404/` canonical above.
- **Accessibility:**
  - Keyboard: 69 tab stops, all with a visible 3px outline.
  - No JS: content renders.
  - Heading skips: h1 to h3 on `/contact/` and `/learning/`.
  - Name mismatches: 7 `label-content-name-mismatch` warnings on home, from `PracticeSection` and `FindFormation`.
  - Contrast: current yellow on white is 1.07:1, used only as an accent.
- **JS weight:** at most 9.4 KB per script, no framework. Home loads about 98 KB of CSS before compression.
- **Other:** sitemap present. `site` is correct and `base` is correctly unset, because this is a root user site.

## Inventory

**Routes (16 pages, plus `/llms.txt`):** `/`, `/services/`, `/learning/`, `/workshops/`, `/workshops/strategic-design-leadership/`, `/courses/`, `/work/`, `/cases/policy-analyst-strategic-review/`, `/thinking/`, `/thinking/strategic-decision-maps/strategy-illusion/`, `/about/`, `/contact/`, `/privacy/`, `/terms/`, `/lab/monkey-factory/`, `/404.html`.

**Competing headlines:** More possibilities. Harder choices. / Make a choice. Own its consequences. / Find your formation. / Everyone is moving. Are we moving together? / Movement needs direction. / Start with the decision. / The question comes first. / Decide. Make it happen. / Observe before prescribing. (twice) / Begin with what people actually do. / A question. A way to learn. / Learn by deciding. / The work. The evidence. / What needs deciding? (three times) / What needs resolving? / Five days. One coherent direction.

**CTAs:** Let's talk / Explore how we can help / Discuss a strategic decision / Discuss a behavioural question / Discuss decision authority / Discuss a workshop / Discuss team learning / Discuss your question / Discuss a similar decision / Discuss the masterclass / Discuss the programme / Discuss day 01–05 / Discuss module 01 for your team / Open the learning case / Inspect the case / Explore the five-day masterclass / Back to the homepage.

**Evidence:**
- Policy-analyst case: reported outcome.
- Dunoon cookstove pilot: qualified finding, peer reviewed.
- Solar case: fictional and labelled so.
- Strategy Illusion: fictional café and labelled so.
- No named clients or testimonials. None should be invented.

## Benchmark

| Firm | Leads with | Proof | Source |
|---|---|---|---|
| Huge | "Make things that matter." / "Anyone can make. Creating experiences… is the hard part." | Logo wall; client plus one line | Home, work, solutions, contact read |
| Strategic Decisions Group | "Find Opportunity in Uncertainty." | "50 Years of Decision Science"; anonymised cases, e.g. "Saves Life Sciences Company $36 Million" | Home read |
| The Decision Lab | "applied behavioral science firm" | Case-study link; library of reference content | Home read |
| Affective Advisory | "Applied Behavioural Science Consulting." | Three named testimonials | Home read |
| The Behavioural Architects | Understanding and influencing decisions | Not assessed | Search only; site refused connection |
| Gravity Ideas (Cape Town) | Behavioural design consultancy | Published case studies (Capitec, Meatless May) | Search only; site refused connection |

Reading [A]: comparable firms name a category and prove it with scale or names. None of those read leads with a single line about choosing. That's the opening, and a solo practice can't win on scale. SDG's anonymised outcome headline is the proof format to copy.

## Sources

[Huge](https://www.hugeinc.com) · [SDG](https://www.sdg.com) · [The Decision Lab](https://thedecisionlab.com) · [Affective Advisory](https://www.affective-advisory.com) · [Behavioural science firms overview](https://thedecisionlab.com/guides/9-behavioral-science-consulting-firms-in-2026) · [Gravity on Capitec](https://medium.com/gravityblog/gravity-ideas-improving-client-debt-management-at-capitec-bank-5477d4cebfc4) · [CPUT thesis](https://etd.cput.ac.za/handle/20.500.11838/3829) · [DOI](https://doi.org/10.3390/su15065328) · [marcelmare.com](https://marcelmare.com) · [Vintage Wings](https://vintagewings.ca/stories/polkadotwarriors) · [American Air Museum](https://americanairmuseum.com/aircraft/20148?page=2) · [Assembly ship](https://en.wikipedia.org/wiki/Assembly_ship)
