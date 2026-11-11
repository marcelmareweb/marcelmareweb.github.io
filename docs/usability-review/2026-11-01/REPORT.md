**The Spotted Ape — usability and click-depth review**

Reviewed 1 November 2026. Current repository revision: a4dd6f1.

The site is straightforward to navigate to a known destination. Its main pages take **one desktop click or two mobile taps through the menu**. Workshop, masterclass and solar-course pages take **two desktop clicks or three mobile taps** through the learning hub. The clearest opportunity is to reduce the effort of scanning long pages and finding the right action.

The current architecture supports the practice well: support, learning, evidence, thinking and contact have distinct destinations. The homepage also offers useful shortcuts by visitor situation. I would retain this architecture and improve the presentation of choices within it.

This is a fresh expert review of the current implementation, using rendered pages and representative interactions. Desktop measurements use 1440 × 900; mobile uses 390 × 844. Additional checks covered 1366 × 768, 320 × 720 and an 844 × 390 landscape menu. On the [public website](https://marcelmareweb.github.io/), the homepage, learning hub, contact page and masterclass matched the local headings, main links and primary navigation. These spot checks establish consistency for those elements, rather than complete deployment parity.

**Click counts start on the homepage and end at the named destination.** The main table follows the header/menu route so its counts are consistent. On mobile, opening Menu counts as one tap. Scrolling and typing are excluded; optional section-jump links add one activation. Counts to an enquiry stop at the form; sending it adds one activation after filling it in. These are inspected route counts, with representative journeys also click-tested; they are not measurements of customer behaviour.

| Visitor goal | Desktop clicks | Mobile taps via menu | Route |
| --- | ---: | ---: | --- |
| Understand how you can help | 1 | 2 | How we help |
| Compare learning formats | 1 | 2 | Workshops & learning |
| See work and research | 1 | 2 | Work & research |
| Browse thinking | 1 | 2 | Thinking |
| Read about the practice | 1 | 2 | About |
| Reach the general contact form | 1 | 2 | Let’s talk |
| Read about custom workshops | 2 | 3 | Learning → Custom workshops |
| Read about the executive masterclass | 2 | 3 | Learning → Executive masterclass |
| Read about the solar learning case | 2 | 3 | Learning → Solar learning case |
| Read the policy-analysis case | 2 | 3 | Work & research → case title/link |
| Open The Strategy Illusion map | 2 | 3 | Thinking → Explore the map |
| Reach a workshop, programme or course enquiry | 3 | 4 | Learning → offering → Discuss |
| Read a specific executive day | 3 | 4 | Learning → masterclass → day card |
| Enquire about that specific day | 4 | 5 | Learning → masterclass → day card → Discuss day |
| Open the actual self-paced course, through its overview | 3 | 4 | Learning → solar overview → Open the learning case |
| Download the student workbook, using the resource jump | 4 | 5 | Learning → solar overview → Workbook & resources → workbook |

The workbook route takes one fewer activation if the visitor scrolls directly to the download. Opening the masterclass’s optional “Explore the five days” jump before selecting a card adds one activation. Reading a page section by scrolling adds no clicks, even if it requires substantial reading.

**Homepage shortcuts reduce several of these counts.** Their visibility and position matter as much as their depth.

| Shortcut from Home | Desktop clicks | Mobile taps | Qualification |
| --- | ---: | ---: | --- |
| Explore how we can help → services | 1 | 1 | Main hero action |
| Workshops & learning → learning hub | 1 | 1 | Hero link; bypasses mobile Menu |
| A situation → the relevant service section | 1 | 1 | Problem links immediately after the hero |
| A situation → relevant enquiry | 2 | 2 | Tested with behavioural design; subject retained |
| Selected policy case → case page | 1 | 1 | In the homepage evidence section |
| An individual learning offer → its page | 1 | 1 | Requires finding its later homepage listing |
| Homepage masterclass listing → day → day enquiry | 3 | 3 | Saves the hub step; listing is much farther down |
| Homepage solar listing → actual learning case | 2 | 2 | Listing is much farther down |

A visitor using the mobile hero’s learning link can reach the masterclass page in two taps and a day-specific enquiry in four. The equivalent menu journey takes three and five. The learning hub itself also has a direct external “Open the learning case” action: two desktop clicks or three menu-based mobile taps from Home, with a long scroll within the hub.

A lower click count can therefore conceal more searching. The one-click masterclass link in the homepage body sits much farther down than the two-click route through the desktop header and learning hub.

**The following changes would make the greatest practical difference.** Priorities describe the next improvement cycle; none is a claim that visitors are currently unable to complete the task.

| Priority | Finding and evidence | Likely usability effect | Recommended adjustment |
| --- | --- | --- | --- |
| 1 — Page scanning | Home is approximately 13,282px tall on desktop and 10,898px on mobile. Its learning heading starts at y≈7,174 / 4,242 respectively. The desktop practice section includes a long sticky card sequence. | Visitors browsing the body must pass through considerable material before discovering individual learning offers. The header and hero shortcuts already provide faster routes. | Offer a visible “Continue to workshops & learning” jump before the practice sequence, and test a shorter homepage summary. Preserve the existing hero shortcuts, distinctive cards and optional exercise. |
| 1 — Laptop opening | At 1366 × 768, the main hero action begins at y≈832, entirely below the initial viewport. At 1440 × 900 it begins at y≈846, near the bottom edge. | A laptop visitor sees the proposition before its main body action. Header navigation remains available. | Adjust the opening’s vertical spacing or heading scale specifically for shorter desktop viewports so the main action fits. Retain Archivo, expressive scale and the current visual identity. |
| 2 — Course scanning | The solar overview is approximately 11,317px tall on desktop and 14,952px on mobile. The mobile student-workbook link starts at y≈10,346. | Someone inspecting the course can encounter a lengthy sales/learning explanation before reaching resources. Existing jump links and the early live-course action mitigate this. | Keep the early learning action; provide a concise “Start / Curriculum / Workbook / Team session” overview and consider a shorter initial curriculum summary with optional detail. |
| 2 — Comparing formats | The learning hub gives all three destinations near its opening, but audience, format and output comparisons are distributed across large stacked entries. | Visitors who do not already know which format fits must read down the page to compare them. | Add a compact comparison near the opening: custom team workshop, standalone executive days, and self-paced solar case. Keep the fuller descriptions below and use only established delivery information. |
| 2 — Mobile form effort | General Contact has three required and three optional fields. At 390px, Name begins around y=621 and Send enquiry around y=1,387. Programme context adds further controls. | The form is simple in required information, but visually longer than “three fields” suggests. This is an optimisation opportunity, not an observed completion failure. | Consider placing optional organisation/team details behind a native disclosure. Keep the selected offering/day/module visible and editable. Test the change with visitors before treating it as necessary. |
| 3 — Repeated formation wording | The hero’s “Find your formation” link goes to the exercise. The footer repeats “Find your formation” beside an arrow leading to Contact. The arrow’s accessible name already clarifies contact. | The repeated visual phrase can suggest the same destination while producing different actions. | Give the footer contact action a visible, explicit label such as “Discuss your decision”. Retain “Find formation” for the exercise. |

Document height includes the shared header/footer and, on desktop Home, the sticky sequence’s scroll space. The home totals are roughly 14.8 desktop viewport heights and 12.9 mobile viewport heights; the course totals are roughly 12.6 and 17.7. These describe geometry, not the number of swipes, time spent or frustration.

Measurements and link positions: [desktop inventory](evidence/desktop-inventory.json), [mobile inventory](evidence/mobile-inventory.json), [laptop opening](screenshots/desktop-1366-home-entry.png), [desktop opening](screenshots/desktop-home-entry.png), [mobile opening](screenshots/mobile-home-entry.png), [learning opening](screenshots/mobile-learning-entry.png), [contact opening](screenshots/mobile-contact-entry.png).

**The functional foundations held up in the checks.**

- All 14 locally linked pages returned HTTP 200. The crawl inspected 649 local anchor-link occurrences and 105 fragment references, with no missing fragment targets. This includes rendered fallback markup; it is not a count of unique visitor choices.
- The four checked external research, essay and course entry URLs returned HTTP 200. Their content remains on its existing host; no migration is implied.
- No horizontal document overflow appeared in the 10 desktop and seven mobile page inventories, or the three additional 320px samples.
- Mobile Menu kept focus inside the dialog through 12 Tab presses. Escape closed it, restored the trigger’s focus and restored body scrolling. Contact remained reachable in the landscape menu.
- Selecting masterclass Day 03 opened its question and produced its session fragment. Enquiry carried Day 03 into Contact. Returning and reloading reopened that day; Escape restored focus to its card.
- Course keyboard navigation moved from Decide to Reflect; its enquiry retained Module 06.
- Find Formation retained exactly two choices when a third was attempted, explained the limit, and reset to zero. It remains an optional fictional exercise with its existing no-information-saved-or-sent promise.
- Reduced motion presented the practice cards without the pinned translation. With JavaScript disabled, the mobile menu, five native programme sessions, six course disclosures, direct learning link and three-required-field native contact form remained available.
- Intercepted enquiry requests showed success confirmation and, under a synthetic failure, preserved the written question and exposed email recovery. No real enquiry was sent.

Evidence: [local links](evidence/local-links.json), [journey traces](evidence/journeys.json), [interaction checks](evidence/interaction-checks.json), [additional checks](evidence/additional-checks.json), [public/resource and no-JavaScript checks](evidence/verification-summary.json). Additional captures show the [mobile menu](screenshots/mobile-menu.png), [masterclass opening](screenshots/mobile-masterclass-entry.png) and [desktop contact layout](screenshots/desktop-contact-entry.png).

**Several major issues from the earlier audit are already resolved.** The [original audit](../../navigation-strategy/AUDIT.md) described the pre-implementation site. The current review confirms dedicated service, learning, evidence and contact destinations; consistent desktop/mobile labels; relevant service invitations; programme session URLs; editable enquiry context; three required contact fields; and an early direct learning action on the solar page. Recommendations from that older audit should not be treated as outstanding defects without checking the current implementation.

My assessment is **easy for a visitor with a known destination, moderately demanding for someone comparing unfamiliar options**. The extra steps in a day-specific enquiry serve a useful purpose: choose a format, choose a day, then make a contextual enquiry. There is no basis here for flattening every journey to an arbitrary click limit or adding search to this small content inventory.

The next useful validation is a short task test with prospective visitors: find help for agreement failing to become action; choose an appropriate learning format; open a particular executive day and prepare an enquiry; and locate the student workbook. Record first choice, wrong turns, completion, time and confidence. This would show whether the observed scanning demands cause real difficulty.

This review does not establish conversion rates, customer preference, live email receipt, production performance, full accessibility conformance or behaviour across every browser and physical device. No source, configuration, dependency or deployment changes were made. Only this report and its evidence were added.

