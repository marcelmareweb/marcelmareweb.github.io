# The Spotted Ape: distilled plan

**Superseded by [strategy.md](strategy.md). Do not build from this document.** Kept as a record of the rejected direction.

Status: rejected. No site code has changed. Evidence is in [assessment.md](assessment.md).

**Tags:** [V] verified. [A] assumption or judgement. **[PLACEHOLDER]** must not ship until confirmed.

## 1. Verdict on the distilled core

| Element | Verdict | Why |
|---|---|---|
| Idea | **Sharpen** | "Plan well and choose badly" is an unprovable generalisation, and "Choosing is the hard part" closely mirrors Huge's "…is the hard part" [V]. Use: *Plenty of organisations have a plan. Far fewer have made a choice.* |
| Line | **Confirm** | Already in the code, but hidden. It doesn't say what you do, so it always travels with the promise. |
| Promise | **Sharpen** | "Make sure" reads as a guarantee a practice can't give, and contradicts the site's own "does not establish a typical or guaranteed outcome" (`work.astro`). Use: *We help leaders make consequential decisions, and design the conditions that carry them through.* |
| Choose / Act / Govern | **Confirm, with one change** | Strong labels. Keep the formal names as descriptors: they carry search terms, and "Govern" alone reads as compliance. Govern has no evidence yet, so don't imply any. |
| Six questions | **Confirm** | Already built as the decision record (`index.astro:78-94`) inside a closed disclosure, so promote it. Gap: none of the six is behavioural. Keep six for rhythm; Act carries "What will get in the way?" on `/services/`. "What must be true?" echoes Roger Martin [A], so credit him on Thinking. |
| Strategy Illusion | **Confirm** | Good and distinctive. Search found no work of that exact title, the nearest being *Solving the Strategy Delusion* (2015). On the home page it gets one line and a link. |
| Proof | **Challenge** | Right to feature one case and move the cookstove pilot. But "final draft in 9 days" is an output from one analyst, and clearance is unrecorded (`DECISIONS.md` #17). Use it honestly and seek a decision-level case. It won't carry the promise alone. |
| Invitation | **Confirm** | Already the contact `h1`. Make it the only ask on the home page. |
| Cuts | **Confirm** | Formation moves to Thinking intact, with its two-choice limit and no-data promise, as `AGENTS.md` requires. |
| Name story | **Challenge** | "The one who notices" is unsupported. The documented origin is better: see section 2. |
| Founder | **Confirm** | Strongest available asset, and the honest answer to "don't fake scale". |
| Design direction | **Sharpen** | Rand: yes. Huge: the site is already too close, using Huge's measured type scale and timings. Take its patterns only. Yellow on off-white is 1.15:1, so it can't work alone there. |

## 2. Final messaging

**Positioning.** For leaders facing a choice that is costly to reverse, The Spotted Ape is an independent decision practice that designs the choice, the behaviour that carries it out and the human–AI authority around it. Where a consultancy hands over a plan, we leave you with a decision you can name, own and review.

**Hero options**

1. **Make a choice. Own its consequences.** *(Recommended: it's the line, and it's memorable.)* Sub: We help leaders make consequential decisions, and design the conditions that carry them through.
2. **You have a plan. Have you made a choice?** Sharper provocation, but it's a challenge rather than a brand line. Same sub.
3. **What needs deciding?** Most direct, but it spends the closing invitation on the opening. Same sub.

**Navigation:** Practice · Work · Learning · Thinking · About · **Let's talk**. All routes stay; `/services/` is simply labelled Practice.

**About (50 words).** The Spotted Ape is an independent decision practice in Cape Town, founded by Marcel Maré. We help leaders frame consequential choices, design the conditions for action and keep people accountable when AI enters the work. We ask six plain questions until the decision is clear and someone owns the outcome.

**Name story.** We're named after the Spotted Ape, a polka-dotted Second World War aircraft with one job: be impossible to miss, so everyone else could find their place in the formation.
- [V] the aircraft, its dots and its role.
- [A] that this is why the practice has the name; the essay implies it but doesn't say so.
- It was a bomber group's ship, so "aircraft" keeps the sentence accurate without leading on war. The essay stays linked from About.

**LinkedIn bio.** *Headline:* Founder, The Spotted Ape. I help leaders make consequential decisions. *About:* Most organisations have a plan. Far fewer have made a choice. I run The Spotted Ape, an independent decision practice in Cape Town, working on strategic decisions, behaviour and human–AI authority. DTech (Design), CPUT; published on behaviour-centred design. **[PLACEHOLDER: "over twenty years", to confirm]** What needs deciding?

**Retired lines:** More possibilities. Harder choices. / Everyone is moving. / Movement needs direction. / Decide. Make it happen. / The question comes first. / A question. A way to learn. / What needs resolving? "Find your formation." survives only as the exercise's name.

## 3. Design system

**Colour**

| Token | Value | Use | Contrast |
|---|---|---|---|
| `--ground` | `#F6F3EC` | Page | 17.7:1 with ink |
| `--ink` | `#0D0B0A` | Text; dark sections | 15.4:1 with spot |
| `--spot` | `#FFE500` | Spot on ink; one flood section with ink text | 1.15:1 on ground: **never alone there** |
| `--muted` | `#5C5852` | Secondary text on ground | 6.4:1 |
| `--line` | `#D9D5CC` | Decorative rules only | 1.3:1 |
| `--control` | `#8A857C` | Form borders | 3.3:1 |

White is replaced by the warm ground. Yellow shifts slightly from `#FFFF00`, which vibrates on screen [A], keeping the link to the current mark.

**Type.** Archivo only, already self-hosted, weights 400 and 600. Remove JetBrains Mono and the small uppercase labels. Final values get set against real line breaks at 375 and 1440.

| Role | Size | Leading |
|---|---|---|
| Display | `clamp(2.75rem, 11vw, 9rem)` | .95 |
| H2 | `clamp(2.25rem, 6vw, 5rem)` | 1 |
| H3 | `clamp(1.5rem, 3vw, 2.5rem)` | 1.1 |
| Lead | `clamp(1.25rem, 2vw, 1.75rem)` | 1.3 |
| Body | `1.125rem` | 1.55 |
| Small | `.9375rem` | 1.5 |

**Spacing.** 4, 8, 16, 24, 40, 64, 96, 160px. Gutter 20px below 768px, 40px above. Content max 1440px; reading max 62ch.

**Symbol: the spot.** Nine dots: eight rings, one solid. One choice among many, and a nod to the polka dots.

```
○ ○ ○
○ ● ○
○ ○ ○
```

- **Form carries the meaning, not colour**, so it survives one-colour print and passes contrast. On ink: white rings, yellow spot. On ground: ink rings, ink spot.
- **Wit.** The spot is also the full stop, the point where a decision ends. On dark sections, the full stop of a display heading turns yellow. Applied only there.
- **System.** Favicon (3×3 at 16px, to be tested), wordmark, OG image, slide corner, and the six-questions marker.
- **The monkey** leaves the header and stays on 404 and About as the joke it is. See open question 3.

**Motion.** Only where it carries meaning. The single signature: the centre dot fills once on first load (under 400ms, skipped for reduced motion). Hover states under 200ms. No scroll reveals, no text scramble, no animation library. Nothing may hide content without JS.

**Accessibility and weight.** WCAG AA. Keep the 3px focus ring and skip link. No new dependencies. Remove Tailwind if nothing depends on it after the rebuild.

## 4. New homepage

Ground colour unless noted. Copy is final unless marked.

**1. The line**
> **Make a choice. Own its consequences.**
> We help leaders make consequential decisions, and design the conditions that carry them through.

**2. The problem**
> Plenty of organisations have a plan. Far fewer have made a choice: what they are giving up, and who owns the result.
> *We call this [The Strategy Illusion →]. Doing the work well doesn't make the choice right.*

**3. Choose. Act. Govern.**
- **Choose.** Strategic decision design. Frame the decision, compare real alternatives, name the trade-off.
- **Act.** Behavioural design. Change the conditions that shape what people actually do.
- **Govern.** Human–AI decision design. Decide what AI may recommend, and who can stop it.

Then the signature visual on ink, large type, spot markers: *What are we deciding? What are the alternatives? What must be true? What are we giving up? Who owns it? When do we review it?*

Then one line: *Workshops, a five-day executive programme and a self-paced case: [Learning →]*

**4. One case**
> **Policy analysis.** A stalled strategic report. One question: what must this argue? Final draft in 9 days.
> "This is the first version that actually argues something."
> [The case →] · Reported outcome. **[PLACEHOLDER: clearance, question 1]**

**5. What needs deciding?** Yellow flood.
> **What needs deciding?** [Let's talk]
> Photo. **Marcel Maré, DTech (Design).** Founder. **[PLACEHOLDER: photo and credential line, question 4]**

Existing home anchors (`#evidence`, `#case`, `#engagement`, `#book`) stay on the matching blocks; `#choice` gets a small link to the exercise's new home.

## 5. Page-by-page changes

| Route | Action | Change | Files |
|---|---|---|---|
| `/` | **Rewrite** | Five blocks above | `pages/index.astro` |
| All | **Rewrite** | Tokens, header, footer. Remove the footer "Find your formation." block and 43 numbered labels | `styles/global.css`, `Header.astro`, `Footer.astro`, `data/navigation.ts`, `data/practice.ts`, `ProblemLinks`, `LearningOptions` |
| `/services/` | **Rewrite** | Choose, Act, Govern; keep anchor IDs. Remove the Human–AI link to the café map rather than fake evidence | `pages/services.astro`, `data/practice.ts` |
| `/work/` | **Keep, tighten** | Client type plus one-line result; cookstove pilot lives here | `pages/work.astro`, `ResearchEvidence.astro` |
| `/cases/…` | **Keep** | Remove numbering, fix canonical, keep print and source labels | `pages/cases/[slug].astro` |
| `/learning/`, `/workshops/`, `/courses/`, masterclass | **Keep, restyle** | Content and E–P–I–A–S stay. Fix the `/courses/` title. `/workshops/` loses repeated CTAs | Those pages, `Masterclass*`, `CourseSyllabus` |
| `/thinking/` | **Merge** | Receives the formation exercise and the Laboratory Fallacy, and links the name essay | `pages/thinking/index.astro`, new `pages/thinking/find-formation.astro`, `home/FindFormation.astro` |
| Strategy Illusion | **Keep** | Text quote only; **cut the AI Tyson portrait** | `strategy-illusion.astro`, `EditorialQuote.astro`, `assets/editorial/` |
| `/about/` | **Rewrite** | Face, credentials, name story, 50 words; retire "Everyone is moving" and the four principles | `pages/about.astro`, `FormationGraphic.astro` |
| `/contact/` | **Keep** | Three required fields stay; optional ones go in a disclosure; fix heading order | `BookingSection.astro` |
| `/privacy/`, `/terms/`, 404 | **Keep, restyle** | Add `noindex` to 404 and drop its canonical. Privacy updates if analytics are added | Those pages, `SeoHead.astro` |
| `/lab/monkey-factory/` | **Keep, exclude** | Filter from sitemap | `astro.config.mjs` |
| Unused | **Cut** | `AboutStudio`, `CaseStudySection`, `Hero`, `KharosStrategy`, `KnowledgeShift`, `MasterclassSeries`, `Outcomes`, `SubstackFeed`, `HomeHeader`, `logo3.png` (recheck each before deleting) | `src/components/`, `public/` |
| SEO | **Fix** | PNG OG plus size and alt tags; `robots.txt`; `trailingSlash: 'always'`; `site` from an env var with the github.io default; correct feed URL (`substack-loader.ts:18`); update `llms.txt` | `SeoHead.astro`, `public/`, `astro.config.mjs`, `pages/llms.txt.ts` |
| Rules | **Rewrite** | `AGENTS.md` and `DEFINITIVE_DIRECTION.md` must change or they'll contradict the build (question 7) | Those files |

**Footer:** wordmark, line, name story; Practice, Work, Learning, Thinking, About; LinkedIn, Substack, ORCID [V from marcelmare.com]; newsletter as a Substack link (no form, no new processor); email; legal. Instagram is omitted because marcelmare.com links two different URLs for it.

**Branch handling:** the repo is on `design/phase-4-warm-mineral-home`, same commit as `main`, with an uncommitted menu-icon fix in `Header.astro` and `global.css`. I'll carry that fix onto `redesign/distil` as its own first commit. The deploy workflow runs only on `main`, so pushing the branch doesn't deploy.

**Target:** Lighthouse 95+ on all four categories. Today only SEO (92) falls short, and one line fixes it, so the redesign must mostly avoid regressing.

## 6. Huge vs The Spotted Ape

| Row | Huge | The Spotted Ape today | Decision |
|---|---|---|---|
| Structure | Line, problem, work, solutions, ideas | Six numbered sections, 15 mobile screens | **Adapt:** five blocks |
| Voice | Declarative, short full stops | Same, but too many ideas | **Adopt** the voice; **adapt** by avoiding its "…is the hard part" |
| Navigation | One word: Work, Solutions, Approach, Company, Ideas | Compound labels | **Adopt** |
| Proof | Logo wall, showreel, client plus result | One case, one pilot | **Adapt** client type plus result; **skip** logos and showreel. Face and six questions instead |
| CTA | "Let's talk", plus several "See…" links | About 20 variants | **Adapt:** one question, one button |
| Footer | Newsletter, socials, full links | Sitemap with no socials or newsletter | **Adopt**, with a Substack link |
| Share preview | Not assessed | SVG, won't render | **Skip** comparison; ship PNG |

## 7. Open questions

1. **The case.** Has the client cleared the result and quotation? Do you have a decision-level case, even anonymised? Without clearance, block 4 needs another form, and I won't invent one.
2. **The name.** Is the B-24 the actual origin? Are you comfortable with a wartime aircraft as the story?
3. **The monkey.** I recommend the spot as primary mark and the monkey on 404 and About only. It's your existing identity, and `AGENTS.md` protects it, so it's your call.
4. **Founder.** Is `marcelmare.com-web/images/old/profile-photo-34A7526.jpg` the right photo, and do you hold the rights? Approve "DTech (Design)", and tell me whether "over twenty years" should appear. I've assumed the filename rather than matching it to anyone.
5. **"We" or "I"?** A solo "we" sits awkwardly next to "don't fake scale". I've kept "we" because the company is the brand and the face is on the page. Are there others in the practice?
6. **Analytics.** The goal is traction and nothing measures it. I recommend one cookieless tool, which means a new vendor, a script and a privacy update. Yes or no?
7. **Rule changes.** May I update `AGENTS.md` and the design docs? The brief conflicts on palette (no warm surfaces), measured type scale, navigation, and "no custom domain". I'm treating your brief as the newer instruction, subject to your yes.
8. **Domain and rival site.** I'll make the build domain-ready but won't touch DNS or thespottedape.com. Its "If AI does the work," message remains live and competing until you decide. Is that acceptable for now?
