# Royal Hotel Gympie Site Analysis

## Snapshot

- Project type: static multi-page marketing website
- Delivery model: plain HTML, one shared CSS file, one shared JS file
- Build step: none
- Primary business intent: convert visitors into accommodation bookings and general venue enquiries
- Secondary intent: present the venue as a local hospitality destination for dining, drinks, and accommodation

## What This Website Currently Is

This repository is a brochure-style website for The Royal Hotel Gympie. It is not a web app and it does not have a CMS, database, server-rendered templates, or online form processing.

The current implementation behaves like a starter site or launch template:

- the structure is complete
- the visual system is in place
- the page set is defined
- most content is still placeholder or semi-placeholder
- key venue details are repeated manually across pages

## Current Goal of the Site

The site is trying to do three things:

1. Establish the venue's positioning as a welcoming local hotel in Gympie.
2. Drive accommodation bookings through an external Booking.com link.
3. Capture interest for dining and accommodation by pushing visitors toward Booking.com or direct contact.

## Stack And Runtime Model

### Frontend stack

- `index.html` plus directory-based HTML pages for each section
- shared stylesheet: `assets/css/styles.css`
- shared JavaScript: `assets/js/main.js`
- SVG placeholder imagery in `assets/img/`

### Runtime behavior

- no package manager
- no bundler
- no framework
- no API calls
- no backend logic
- no templating layer

### Deployment model

- deployment is handled by GitHub Actions
- infrastructure is defined in `infra/cloudfront-site.yml`
- `.github/workflows/deploy.yml` now provisions or updates a private S3 origin bucket and a CloudFront distribution
- the workflow stages the static site into a temporary `dist/` directory, uploads HTML and assets with different cache policies, and invalidates CloudFront after deploy

## Information Architecture

There are 8 public HTML pages:

| Page | Path | Purpose |
| --- | --- | --- |
| Home | `index.html` | Primary landing page and main conversion hub |
| About | `about/index.html` | Brand and venue positioning |
| Eat & Drink | `eat-drink/index.html` | Bistro, bar, groups, sample menu |
| Accommodation | `accommodation/index.html` | Booking-focused stay page |
| Gallery | `gallery/index.html` | Image gallery with lightbox |
| Contact | `contact/index.html` | Address, hours, map, call/email prompt |
| Privacy Policy | `privacy.html` | Legal placeholder |
| Terms | `terms.html` | Legal placeholder |

## Primary User Journeys

### Accommodation booking

- strongest CTA across the site
- repeated in header, hero, content sections, and footer
- always sends users off-site to Booking.com

### Venue discovery

- users land on home
- branch to About, Eat & Drink, Accommodation, Gallery, and Contact

### General contact

- contact page provides phone, email, address, opening hours, and a Google Maps embed
- there is no contact form

## Shared Design System

The visual language is centralized in `assets/css/styles.css`.

### Design characteristics

- warm hospitality palette with cream, tan, brown, and amber tones
- serif-heavy heading treatment
- rounded cards and pill-shaped buttons
- large image-led hero sections
- soft gradients and light shadows

### Shared UI patterns

- sticky header
- responsive navigation
- card grids
- hero sections using a CSS custom property for background imagery
- gallery grid
- CTA bands
- footer with repeated venue/contact details

## Interactive Behavior

All interactivity lives in `assets/js/main.js`.

### Mobile navigation

- hamburger menu below `768px`
- toggles `body.nav-open`
- manages `aria-expanded` and `aria-hidden`
- closes on outside click
- closes on `Escape`
- traps keyboard tab focus while open

### Header scroll state

- `.site-header.is-scrolled` is applied when the page scrolls past 10px

### Gallery lightbox

- only active on `gallery/index.html`
- opens modal viewer from `data-lightbox-trigger` buttons
- supports Previous / Next / Close controls
- supports `Escape`, left arrow, right arrow, and tab trapping

### Native browser interactions

- FAQ on the accommodation page uses `<details>`
- contact page uses a Google Maps iframe
- smooth scrolling is enabled globally unless reduced-motion is requested

## Content Model

All site content is hard-coded directly into HTML. There is no single source of truth.

### Repeated global content

The following information is duplicated across most or all pages and must be updated manually everywhere:

- venue name
- street address
- phone number
- email address
- Booking.com URL
- Facebook URL
- Instagram URL
- footer opening hours
- header navigation

### Section-specific content

- Home: high-level venue positioning, teaser cards, highlight sections
- About: brand story and expectations
- Eat & Drink: bistro/bar/groups and a sample menu
- Accommodation: booking pitch, FAQs, reasons to stay
- Gallery: six gallery items and captions
- Contact: hours table and map embed

## SEO And Metadata

The site already includes a basic SEO layer:

- per-page `<title>` and meta description
- Open Graph tags per page
- `robots.txt`
- `sitemap.xml`
- repeated JSON-LD using `Hotel` schema

### SEO limitations in the current state

- Open Graph image is still a placeholder SVG
- venue contact details are placeholders
- social links are placeholders
- Booking.com URL is a placeholder
- no favicon is present
- no canonical tags are defined
- schema is repeated manually page by page, which increases maintenance risk

## Accessibility Notes

The baseline is better than average for a static starter site:

- skip link is present
- nav toggle exposes `aria-expanded`
- current page links use `aria-current="page"`
- lightbox and mobile nav attempt focus management
- reduced-motion support is included

### Accessibility caveats

- gallery/lightbox behavior should always be rechecked after image/path changes
- repeated placeholder alt text should be replaced with real descriptive copy when production images are added

## Operational And Content Risks

### 1. Shared content is duplicated manually

There is no partial system. A global contact update requires editing many files by hand.

### 2. The site is still placeholder-heavy

The repo contains placeholder:

- booking links
- address
- phone
- social URLs
- image assets
- map embed
- legal copy
- menu content
- event content

### 3. Repeated static content can drift over time

- repeated venue details, metadata, and navigation links still require manual updates across multiple HTML files

### 4. Production now depends on infrastructure variables being correct

The deployment path is more robust than the previous S3-only sync, but it now depends on GitHub secrets and optional variables being set consistently for stack name, custom domain, and certificate wiring.

## Verified Runtime Findings

The live browser pass surfaced these current issues:

### Broken hero background image paths

Hero backgrounds use inline CSS custom properties like:

- `--hero-image: url('assets/img/hero-placeholder.svg')`
- `--hero-image: url('../assets/img/about-placeholder.svg')`

Because the custom property is consumed inside the shared stylesheet, the browser resolves those relative URLs against `assets/css/styles.css` instead of the page URL. That causes 404s such as:

- `/assets/css/assets/img/hero-placeholder.svg`
- `/assets/assets/img/gallery-1.svg`

Effect: hero background imagery is currently unreliable or broken at runtime.

### Missing favicon

The browser reports a 404 for `/favicon.ico`.

## Where The Site Is Strong

- clear page structure
- cohesive hospitality visual direction
- lightweight and easy to host
- fast to understand
- no framework complexity
- accessible baseline patterns are already present

## Where The Site Needs Maturity

- real content population
- real media assets
- centralized repeated data
- reliable asset path handling
- either real form handling or clearer non-form presentation
- production-ready legal/privacy review
- deployment workflow alignment with documentation

## Practical Next Improvements

### High-impact content work

- replace all global placeholders with real venue details
- replace all placeholder images and gallery assets
- replace sample menu and event text with real business content

### Structural improvements

- introduce reusable includes or a lightweight templating step for header/footer/shared metadata
- centralize venue data so contact details are not duplicated across files

### Technical cleanup

- fix hero background URL strategy
- add favicon assets
- decide when to attach the production custom domain and ACM certificate
- remove or replace non-functional UI affordances

## Bottom Line

This website is currently a clean static marketing shell for a hotel/pub venue. Its job is to present the venue credibly and push visitors toward Booking.com or direct contact. The main architectural constraint is that everything is hand-maintained across duplicated HTML files, so small global changes are cheap at first but become error-prone quickly without a shared data or templating approach.
