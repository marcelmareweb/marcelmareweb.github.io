# thespottedape.com inventory and migration map (Stage A)

**Status:** Stage A draft · **Date:** 7 November 2026 · **Implements:** [IMPLEMENTATION.md](IMPLEMENTATION.md) W9, [BRAND_STRATEGY.md](BRAND_STRATEGY.md) 9.3

Stage A only: an inventory and a proposed map. Nothing here changes hosting, DNS, either repository's deployment or the old site. Stage B needs an explicit instruction and an AGENTS.md update.

## 1. What is there

- **Host:** GitHub Pages with a custom domain. The source is a Quarto site in repository `spottedape/spottedape.github.io`, local copy `~/Documents/thespottedape.com-web-3` (latest commit 507d331, 15 October 2026; `-web` and `-web-2` are older copies of the same repository).
- **Crawl (7 November 2026):** 159 URLs reached from the home page and `sitemap.xml`. Of these, 61 are HTML pages, 7 are downloads or feeds and 91 are assets. All returned 200.
- **Links from the new site** (marcelmareweb.github.io) to the old domain, which must keep working: `/Courses/solar-investment/learn/`, `/research/index.html` and `/posts/substack/2026-02-14-the-laboratory-fallacy.html` (`src/data/practice.ts`, `publicResources`).

## 2. Map

**Actions:**
- **Preserve:** keep at the exact same URL, including case.
- **Migrate:** the new site has an equivalent page; the old URL should lead there.
- **Retire:** remove the page.
- **Review:** the owner decides.

| Path | Pages and files | What it is | Proposed action |
| --- | --- | --- | --- |
| `/`, `/index.html` | 2 | Home | Migrate to `/` |
| `/about/` | 1 | About | Migrate to `/about/` |
| `/contact/` | 2 | Contact | Migrate to `/contact/` |
| `/appointment/` | 1 | Booking page (title “index”) | Migrate to `/contact/` |
| `/challenges/` | 1 | Organisational challenges | Migrate to `/services/` |
| `/methodology/` | 2 | Methodology | Migrate to `/services/` |
| `/workshops/` | 2 | Workshops & Labs | Migrate to `/workshops/` |
| `/thinking/` | 1 | Thinking & Field Notes | Migrate to `/thinking/` |
| `/research/index.html` | 1 | Research | **Preserve.** Linked from the new site |
| `/Courses/…` | 12 pages, 3 PDFs, 2 workbooks, plus assets | Solar course: six module pages, spreadsheet essentials, reviewer rationale, downloads, and a “Course moved” page | **Preserve, uppercase, every file.** AGENTS.md: do not delete, case-fold or silently redirect |
| `/posts/substack/…` | 20 essays and an RSS feed | Mirror of the Substack essays | **Preserve.** The Laboratory Fallacy is linked from the new site. The Flying Spotted Ass Ape copy needs the serial correction (strategy 6.1) |
| `/portfolio/…` | 7 pages and an RSS feed | Creative x AI, CSIR remote video, CSIR Veza Tourism, Momentum Recharge, Sibabalwe Bakery, Vantage HIV | **Review.** Personal portfolio: preserve, or move to marcelmare.com with a link. The Creative x AI page still says “multi-session” |
| `/khairos/` | 1 | “The !Khairos Capability Progression” | **Retire.** Retired positioning (AGENTS.md); it is still live and in the sitemap |
| `/pitchdeck/…` | 8 pages and 1 video | Pitch decks and drafts: BMC grant, Gees.Studio, Parmalat predatory-pricing analysis, “Deaf Leading the Blind” column drafts | **Review now.** Linked from nowhere, but listed in `sitemap.xml`, so search engines can index them |
| `/images/`, `/site_libs/`, `/site-components/` | 70 or so | Images, Quarto CSS and JS | Keep whatever the preserved pages need |

## 3. Findings that need action before Stage B

1. **Pitch decks in the sitemap** (high, owner). Internal-looking decks and drafts are publicly listed. If they aren't meant to be public, remove them from the old site's sitemap and output, or add `noindex`. This can be done now, on the old site, independently of migration.
2. **!Khairos still live** (high). It contradicts the current positioning on the main domain. Retiring it on the old site now is consistent with AGENTS.md.
3. **Case collision on macOS** (blocker for Stage B design). The new site already has a lowercase `/courses` page, and the preserved archive needs uppercase `/Courses/`. GitHub Pages treats the two as different paths, but macOS's case-insensitive file system would merge `dist/courses/` and `dist/Courses/` in local builds. Options:
   - keep the archive on its own host (for example `archive.thespottedape.com`) and accept new URLs, which AGENTS.md currently forbids;
   - copy it into the new site under `public/Courses/` and build only on Linux (CI), verifying locally on a case-sensitive volume;
   - leave thespottedape.com as it is and move only the practice pages.
4. **No server redirects on GitHub Pages.** A “migrate” entry would become a small HTML page at the old path with a `meta refresh`, a canonical link and a visible link. That is acceptable for practice pages, but not for `/Courses/`, which must stay in place.
5. **Portfolio as evidence** (opportunity). Sibabalwe Bakery, Momentum Recharge, Vantage HIV and the CSIR projects may be real engagements that could fill the strategy's evidence gaps (strategy 12.2.8), if their facts and permissions allow.

## 4. Stage B checklist (not started)

- [ ] Owner decisions on findings 1–3 and on `/portfolio/`
- [ ] A URL-by-URL file of old path, new path and method, generated from this inventory
- [ ] The preserved content copied or hosted, with checksums for the downloads
- [ ] Analytics and Search Console set up for both hosts
- [ ] Canonical URLs updated on the new site (`astro.config.mjs` `site`), the sitemap and `llms.txt`
- [ ] A rollback plan: the old repository stays deployable until the new domain is verified
- [ ] An explicit instruction from the owner, and an AGENTS.md update (the “no custom domain” rule)

The raw crawl (every URL, status, type, title and number of inbound links) and the script that made it are in `../the-spotted-ape-sources/domain/`. Re-run it at Stage B.
