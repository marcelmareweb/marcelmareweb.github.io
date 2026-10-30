# Navigation strategy — local implementation

Implemented on 30 October 2026 following the user’s instruction to “implement strategy”.

The original [strategy](../STRATEGY.md) and [audit](../AUDIT.md) remain the rationale and pre-implementation baseline. Their earlier strategy-only scope is historical. This record describes the authorised application changes and current verification.

## 1. Delivered destinations

| Route | Customer purpose | Source |
| --- | --- | --- |
| /services/ | Recognise a strategic, behavioural or Human–AI question; see the relevant work, output, evidence and enquiry | [services.astro](../../../src/pages/services.astro) |
| /learning/ | Compare custom workshops, the executive programme and the self-paced solar case | [learning.astro](../../../src/pages/learning.astro) |
| /work/ | Examine the actual policy-analysis case account and qualified cookstove research | [work.astro](../../../src/pages/work.astro) |
| /contact/ | Ask a question with the relevant service, programme/day or course/module visible and editable | [contact.astro](../../../src/pages/contact.astro) |

The shared header and mobile menu now read:

**How we help · Workshops & learning · Work & research · Thinking · About · Let’s talk**

Existing workshop, masterclass, course, case, thinking, about, legal and lab routes remain. The footer provides direct links to the actual offerings, evidence and practitioner information.

[Navigation data](../../../src/data/navigation.ts) supplies consistent primary labels and category membership. Exact destinations use current-page semantics; descendant pages have a separate current-section cue and linked breadcrumbs. The mobile menu keeps its native dialog, adds explicit keyboard boundary handling, and restores focus and scrolling on close.

## 2. Homepage and offering journeys

The homepage now proceeds through:

1. The original oversized proposition, with direct support and learning routes.
2. Three problem-led entry links.
3. Selected case/research evidence.
4. The original practice cards, each with its own relevant support link.
5. The three actual workshop/learning formats.
6. The optional Find Formation exercise.
7. Thinking and instruments.
8. The contact invitation and grouped footer.

The original wordmark, Archivo typography, measured scale, black/white/yellow system, illustrations, card disclosures and circle-fill contact-button animation are retained. The contact pill remains centred, arrow-free and borderless, with no hover shadow or dark fringe.

The complete research spread now sits at /work/#research. Its question, approach, finding, implication and citation are retained. The pilot’s lack of a significant reduction in paraffin stove ownership remains explicit. Case outcomes remain labelled as reported accounts.

Existing homepage fragment IDs remain available, including the practice, evidence, exercise, instrument and closing-invitation anchors. The earlier research aliases lead to the selected evidence, with an onward link to the full research.

The solar case now has a direct learning action near its opening, alongside a separate team-session enquiry. The actual audience and observable outputs appear earlier. All six modules, live-module links, downloads and the existing in-page cohort form remain available.

Workshops retains its custom-facilitation purpose, existing process and enquiry anchor. The executive programme retains its five standalone strategic questions and outputs. Its opening now exposes programme enquiry and day exploration before the longer narrative; practical questions and practitioner/evidence links provide context.

The policy case and decision map now connect to relevant support rather than relying only on a generic email action.

## 3. Enquiries

[contactHref](../../../src/lib/contact.ts) creates consistent on-site enquiry links. They contain only offering identifiers and the originating route: interest, day, module, audience and source. Personal details and the visitor’s written question are not placed in these URLs.

[BookingSection](../../../src/components/BookingSection.astro) and its [browser script](../../../src/scripts/enquiry-form.ts) provide:

- Three required fields: name, email and the question.
- Optional area of interest, organisation and team size.
- Optional working day, module and attendance context when relevant.
- Visible selected context at the beginning of the form, with a way to change it and return to the offering.
- Day- and module-specific return links.
- Clearing of stale day/module context when the visitor changes the subject.
- Validation, a pending state, confirmation, retained input on failure and email recovery.
- A recovery email regenerated from the latest edits when activated.
- The existing Web3Forms → configured endpoint → FormSubmit delivery precedence.
- A native FormSubmit fallback without JavaScript.

Query values are matched against known interests, days, modules and origins. Invalid values do not insert arbitrary text or redirect a visitor elsewhere.

Without JavaScript, automatic query-based prefilling is unavailable; the optional native selectors remain usable. The keyboard submission test selected module 05 manually and captured that value before aborting the POST. Essential contact access is not dependent on script execution.

No enquiry or email was sent during verification. Enhanced POST requests received synthetic responses; the native POST was intercepted and aborted. Mocked success is not a claim of live receipt by the practice.

## 4. Programme state and original exercise

Selected executive days use their existing session IDs:

- #session-explorer
- #session-practitioner
- #session-integrator
- #session-architect
- #session-steward

Direct loading and reload open the intended day. Back and Forward restore the day and its question focus after native fragment restoration. Return/Escape restore the formation and selected-card focus. Back to top retains its native destination.

Day enquiries retain the selected day on Contact, and the return link reopens it. Course enquiries similarly retain the module and return to the selected inspector.

The original Find Formation component, formation.js and formation-interactions.ts are byte-for-byte unchanged from the starting baseline. The two-choice limit, preview/selected distinction, consequences, reset and no-information-saved-or-sent promise remain. No tracking or lead scoring was added.

The practice-card sequence still uses native document scroll on suitable desktops, native mobile scrolling and a reduced-motion stack. Its new support links fit within the existing cards and participate in the existing focus-to-card navigation.

## 5. Verification

| Check | Result |
| --- | --- |
| Astro diagnostics | 71 files; zero errors, warnings or hints |
| Production build | 16 HTML pages; successful |
| Public page metadata | One h1 per HTML page; one canonical on each of 15 public pages |
| Existing isolated lab | Unchanged noindex,nofollow prototype; intentionally outside the public-page canonical requirement |
| Local production links | 690 link occurrences and 111 fragment references checked; no missing local destinations or targets |
| IDs and ARIA targets | No duplicate IDs or missing aria-controls targets in built HTML |
| Public linked resources | 12 GET checks returned 200, including the existing research/article/course entries and six toolkit resources |
| Responsive geometry | 48 page/viewport cases across 320, 390, 768, 1024, 1440 and 1920px; no document overflow, outside controls or desktop-header overlap |
| Mobile customer journeys | Behavioural support → contextual contact; programme day → contact → day; module → contact; formation limit/reset; landscape menu |
| Keyboard | Course selection retained; programme question/card focus restored; 12 forward and 3 reverse menu Tab presses remained inside the dialog; Escape returned focus |
| Reduced motion | Practice becomes a static stack; button response is effectively instant |
| Without JavaScript | New pages and menu usable; five native programme sessions; six native course modules and enquiry links; valid three-required-field native form submission captured before network delivery |
| Enquiry state | Pending, synthetic success/failure, editable context, stale-context clearing and latest-value email recovery verified |
| Case printing | Print control retained; header, footer and new invitation hidden in print media |
| Scope | Deployment workflow, dependencies/configuration and public assets unchanged; no push or deployment |

Evidence and capture lists are in [EVIDENCE.md](EVIDENCE.md). The implementation includes browser refinement rather than only source inspection. Initial integration samples were updated with the verified final focus, context and menu results.

Normal-motion entry and interaction views were checked. The six-width geometry sweep used reduced motion to make measurements stable. Chromium emulation does not certify physical devices, every browser engine or screen readers.

No customer participants or analytics were supplied. This implementation does not establish an improvement in conversion, customer preference or learning outcomes. The original strategy’s participant-based validation remains a useful follow-up.

## 6. Resource and commercial boundaries

The existing public research, article and uppercase /Courses/ archive paths remain explicit links, distinct from the local lowercase /courses page. The primary branded course entry and its alternative host are retained. They were reachable during this verification.

This task does not bundle or migrate those external/public archive trees into the Astro build. Any future publication must retain them or make an explicit content-migration plan. No blanket redirects, case-folding, workflow changes or deployment were performed.

Public cohort dates, prices, remaining-seat counts, guarantees, payment and checkout were not established by the supplied evidence. The implemented site offers actual resource access and relevant enquiries. “Ask about attendance options” is an enquiry, not a reservation or a promise of a public cohort.

The practice remains an independent strategic decision and behavioural design practice. AI remains a relevant context; the E–P–I–A–S programme remains scoped to executive strategic decisions.

## 7. Source structure

| Responsibility | Current source |
| --- | --- |
| Shared navigation and breadcrumbs | [navigation.ts](../../../src/data/navigation.ts), [Breadcrumbs](../../../src/components/Breadcrumbs.astro), [Header](../../../src/components/Header.astro), [Footer](../../../src/components/Footer.astro) |
| Shared capability/learning content and public entry URLs | [practice.ts](../../../src/data/practice.ts) |
| Problem and learning entry patterns | [ProblemLinks](../../../src/components/ProblemLinks.astro), [LearningOptions](../../../src/components/LearningOptions.astro) |
| Evidence overview and full research | [SelectedEvidence](../../../src/components/SelectedEvidence.astro), [ResearchEvidence](../../../src/components/ResearchEvidence.astro) |
| Enquiry context and recovery | [contact.ts](../../../src/lib/contact.ts), [BookingSection](../../../src/components/BookingSection.astro), [enquiry-form.ts](../../../src/scripts/enquiry-form.ts) |
| Programme URL/history and focus | [masterclass-formation.ts](../../../src/scripts/masterclass-formation.ts) |
| Long-title openings and orientation | [PageIntro](../../../src/components/PageIntro.astro) and existing global design tokens |

No new dependency, client framework, animation library, commerce system or analytics integration was added.
