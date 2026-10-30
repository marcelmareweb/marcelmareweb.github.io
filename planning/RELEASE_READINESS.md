> Historical planning record. Superseded for implementation by [the definitive direction](../docs/design-reference/DEFINITIVE_DIRECTION.md) and the current AGENTS.md. Earlier palette, serif, positioning and approval-stage choices below are archival, not active instructions.

# Production release-readiness checklist

Planning only. This does not authorise a push, merge, deployment, Pages change or DNS change. Statuses remain unchecked until evidence is recorded.

## Ownership and release boundary

- [ ] Confirm repository and account controlling the production Quarto deployment.
- [ ] Confirm how that repository relates to `marcelmareweb/marcelmareweb.github.io` and the `spottedape.github.io` DNS destination.
- [ ] Read authenticated Pages settings, default/release branch and environment protection; do not infer them from public DNS.
- [ ] Confirm owner access and a named person authorised to approve release and rollback.
- [ ] Preserve existing uncommitted Astro changes; create the approved implementation branch without overwriting them.
- [ ] Confirm the approved production URL, site/base configuration and custom-domain handling. No speculative DNS changes.

## Migration completeness

- [ ] Reconcile planning/phase-2/route-preservation-map.csv with a file inventory of the production repository: public crawling does not find orphaned content.
- [ ] Account for all 47 sitemap pages, additional course pages, aliases, archives, fragments and referenced resources.
- [ ] Preserve six project documents, 19 essays, research references, eight presentation documents and associated media/runtime.
- [ ] Classify each old claim as sourced, interpreted, provisional or requiring evidence; preserve attribution and practitioner role.
- [ ] Confirm contact addresses, partnership wording, publication links, framework names, company details and permissions.
- [ ] Ensure new canonicals and metadata use the production domain. Preserve useful existing inbound URLs and anchors.
- [ ] Keep planning prototypes, font comparisons, screenshots and unapproved copy out of production build artefacts.

## Course preservation

- [ ] Preserve both case-sensitive `/Courses/` entry points and lowercase `/courses/` compatibility as planned.
- [ ] Preserve `/Courses/solar-investment/index.html` and its existing entry behaviour.
- [ ] Carry the entire `/Courses/solar-investment/learn/` runtime, including eight HTML pages, local CSS/JS, fonts, media and dependencies.
- [ ] Verify student/completed workbooks, case brief, spreadsheet reference, troubleshooting card and reviewer rationale.
- [ ] Confirm the relationship to `https://marcelmare.com/dla-course-2/`; retain working external links.
- [ ] Exercise course entry, chapter navigation, downloads, embedded preview and navigation back to the practice.

## Redirects and compatibility

- [ ] Approve exact old→new mappings, including directory paths, `/index.html`, `.html` and case-sensitive aliases.
- [ ] Confirm a redirect mechanism actually supported by the selected hosting arrangement. GitHub Pages static compatibility pages are not server-side 301s.
- [ ] Preserve meaningful fragment identifiers or provide explicit compatibility landings; generic homepage redirects do not preserve intent.
- [ ] Validate `/sitemap.xml`, Astro sitemap index, robots, 404 behaviour and canonical consistency.
- [ ] Check redirect chains, loops, missing assets and external course routes from an isolated preview.

## Quality and enquiries

- [ ] Run required `npx astro check` and `npm run build` after source implementation.
- [ ] Test 375, 430, 768, 1024, 1440 and 1920px, plus reflow, keyboard, touch, reduced motion and no-JS.
- [ ] Test the approved enquiry provider with an agreed recipient; verify actual receipt, activation handling, failure and retry.
- [ ] Confirm privacy information and direct email alternative. Do not publish an unconnected success message.
- [ ] Record accessibility checks, production asset sizes and measured performance; distinguish targets from achieved scores.

## Preview, rollback and release

- [ ] Create an isolated preview without replacing the production site.
- [ ] Record approved content, source commit, workflow, domain settings and dependency versions.
- [ ] Snapshot the current deployed artefact/source commit and retain its custom-domain and course files.
- [ ] Document the exact redeploy procedure for that previous artefact and who can perform it.
- [ ] Define rollback triggers: broken course/enquiry, missing critical routes, domain/routing regression or material accessibility failure.
- [ ] Obtain explicit production publication approval after preview review.
- [ ] After an authorised release, verify the live domain, key legacy routes, course and enquiry receipt.

No check is satisfied merely because the design prototype renders successfully.
