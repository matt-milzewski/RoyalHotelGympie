# Agent Navigation Guide

## Purpose

This file is for fast orientation before editing the Royal Hotel Gympie site. The repo is simple, but it has an important constraint: most shared content is duplicated manually across many HTML files.

## Working Model

- site type: static HTML site
- framework: none
- build step: none
- shared CSS: `assets/css/styles.css`
- shared JS: `assets/js/main.js`
- deploy target: GitHub Actions -> CloudFormation -> private S3 origin -> CloudFront

## Fast Repo Map

| Area | Path | Why it matters |
| --- | --- | --- |
| Home page | `index.html` | Main landing page and highest-traffic template |
| Content pages | `about/`, `eat-drink/`, `accommodation/`, `gallery/`, `contact/` | Section-specific content |
| Shared styles | `assets/css/styles.css` | Global layout, color, typography, hero, grid, nav, footer, lightbox |
| Shared behavior | `assets/js/main.js` | Mobile nav, header scroll state, gallery lightbox |
| Images | `assets/img/` | Placeholder SVG assets to be replaced |
| SEO files | `robots.txt`, `sitemap.xml` | Crawl and indexing metadata |
| Legal pages | `privacy.html`, `terms.html` | Static legal content |
| Deployment | `.github/workflows/deploy.yml` | Provisions infra and publishes the static bundle |
| Infrastructure | `infra/cloudfront-site.yml` | CloudFront distribution, OAC, S3 origin bucket, response headers, clean URL function |
| Internal docs | `docs/` | Repo-only documentation, excluded from deploy |

## First Files To Read Before Most Changes

1. `index.html`
2. `assets/css/styles.css`
3. `assets/js/main.js`
4. the matching section page you plan to edit

That order is usually enough to understand whether the change is:

- local to one page
- shared across the site
- visual only
- behavioral

## Global Change Hotspots

If a request touches any of the items below, assume multiple files need edits:

- navigation labels or links
- footer content
- address
- phone
- email
- booking URL
- social links
- opening hours
- metadata and structured data

Reason: there is no shared layout partial. These values are repeated directly in each HTML file.

## Page Responsibilities

### `index.html`

- overall positioning
- key CTAs
- home hero
- venue highlights
- intro to dining, drinks, gallery, and accommodation

### `about/index.html`

- brand story and venue overview

### `eat-drink/index.html`

- bistro and bar
- group dining
- sample menu content

### `accommodation/index.html`

- stay proposition
- Booking.com CTA
- FAQ

### `gallery/index.html`

- image grid
- lightbox trigger data
- captions and alt text

### `contact/index.html`

- address, phone, email
- opening hours table
- map embed

## Shared JS Behavior

All custom behavior is inside `assets/js/main.js`.

### Navigation

- controlled by `[data-nav-toggle]` and `[data-nav-menu]`
- mobile only below `768px`
- has focus-trap logic and `Escape` handling

### Header

- scroll adds `.is-scrolled` to `.site-header`

### Gallery

- depends on `#lightbox`
- depends on `[data-lightbox-trigger]`
- reads `data-full`, `data-alt`, and `data-caption`

If a gallery/lightbox change breaks, inspect the data attributes first.

## Shared CSS Behavior

`assets/css/styles.css` defines:

- color variables
- typography
- grid utilities
- buttons
- hero layout
- card system
- footer layout
- form styling
- lightbox visuals
- breakpoints at `480px`, `768px`, and `1024px`

## Important Runtime Caveat

Hero background images are currently wired through CSS custom properties and the relative URLs are resolving against the stylesheet path. That is producing live 404s for hero background assets.

Do not assume a hero background path is correct just because the HTML looks correct. Verify in a browser after changing it.

## Practical Edit Strategy

### For content edits

Start with the target page, then search for repeated venue details with:

```bash
rg -n "PLACEHOLDER|INSERT STREET ADDRESS|0000 0000|hello@royalhotelgympie.com.au" .
```

### For style edits

Change `assets/css/styles.css` first, then check:

- desktop header/nav
- mobile nav
- home hero
- gallery page
- footer

### For behavior edits

Change `assets/js/main.js`, then verify:

- mobile nav open/close
- Escape handling
- focus behavior
- gallery lightbox open/close/next/prev

## Recommended Local Preview

From repo root:

```bash
python3 -m http.server 4173
```

Then open:

```text
http://127.0.0.1:4173/
```

## Suggested QA Pass After Changes

1. Home page loads without broken layout.
2. Desktop nav works.
3. Mobile nav opens and closes.
4. Footer links still resolve correctly from both root and nested pages.
5. Gallery lightbox still opens and cycles.
6. Contact page map still renders.
7. No new broken asset paths appear in browser console.

## Search Shortcuts

Useful repo commands:

```bash
rg --files
rg -n "<title>|application/ld\\+json|og:" .
rg -n "Book Accommodation|Facebook|Instagram|Opening hours" .
rg -n "data-nav-toggle|data-nav-menu|data-lightbox-trigger|#lightbox" .
```

## Deployment Note

The deploy workflow stages only the site files into `dist/`, uploads them to the CloudFormation-managed S3 origin bucket, and invalidates CloudFront. Internal documentation remains outside the deployed bundle.

## Best Mental Model

Treat the project as a static site template with one shared style layer, one shared behavior layer, and many manually duplicated content surfaces. The fastest safe approach is:

1. identify whether the change is local or global
2. update shared assets if the behavior or styling is global
3. update every duplicated HTML surface if the content is global
4. verify in a browser, not just by reading files
