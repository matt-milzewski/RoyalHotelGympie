# Google Search Console Indexing Runbook

## Canonical Domain

Use `https://www.royalgympie.com.au/` as the canonical public URL.

Do not submit `royalhotelgympie.com.au` in Search Console unless that domain is registered and intentionally pointed at this site. As of 2026-06-20, public DNS/WHOIS checks showed `royalhotelgympie.com.au` was not registered/delegated, while `royalgympie.com.au` and `www.royalgympie.com.au` were live.

## URLs Expected In The Sitemap

Submit `https://www.royalgympie.com.au/sitemap.xml`.

The sitemap should list exactly:

- `https://www.royalgympie.com.au/`
- `https://www.royalgympie.com.au/about/`
- `https://www.royalgympie.com.au/eat-drink/`
- `https://www.royalgympie.com.au/accommodation/`
- `https://www.royalgympie.com.au/gallery/`
- `https://www.royalgympie.com.au/contact/`
- `https://www.royalgympie.com.au/privacy.html`
- `https://www.royalgympie.com.au/terms.html`

## Pre-Submission Checks

After deploy, run:

```sh
curl -I https://www.royalgympie.com.au/
curl -I https://royalgympie.com.au/
curl -I https://www.royalgympie.com.au/about/index.html
curl -I https://www.royalgympie.com.au/robots.txt
curl -I https://www.royalgympie.com.au/sitemap.xml
curl -s https://www.royalgympie.com.au/sitemap.xml
```

Expected:

- Home page returns `200`.
- `https://royalgympie.com.au/` redirects to `https://www.royalgympie.com.au/`.
- `/index.html` variants redirect to clean URLs, for example `/about/index.html` redirects to `/about/`.
- `robots.txt` returns `200` and references `https://www.royalgympie.com.au/sitemap.xml`.
- `sitemap.xml` returns `200` and only contains `www.royalgympie.com.au` URLs.
- Every page has a matching `<link rel="canonical">` value.

## Search Console Steps

1. Add or open the `royalgympie.com.au` Domain property in Google Search Console. A Domain property is preferred because it covers `www`, non-`www`, HTTP, and HTTPS variants.
2. Verify ownership with the DNS TXT record Google provides.
3. Open **Sitemaps** and submit `https://www.royalgympie.com.au/sitemap.xml`.
4. Open **URL Inspection** for `https://www.royalgympie.com.au/`, run **Test live URL**, then request indexing.
5. Repeat URL Inspection for the main commercial pages:
   - `https://www.royalgympie.com.au/accommodation/`
   - `https://www.royalgympie.com.au/contact/`
   - `https://www.royalgympie.com.au/about/`
6. In **Page indexing**, filter by the submitted sitemap and confirm Google has discovered the 8 sitemap URLs.

## Interpreting Common Results

- `Submitted URL not found (404)`: the sitemap is still pointing to the wrong domain or a page is missing after deploy.
- `URL not allowed`: the sitemap was submitted from one host but contains URLs from another host. For this site, `https://www.royalgympie.com.au/sitemap.xml` must only contain `https://www.royalgympie.com.au/...` URLs. If Search Console shows `https://www.royalhotelgympie.com.au/...`, the old sitemap is still deployed or cached.
- `Duplicate, Google chose different canonical`: inspect whether Google is seeing both `royalgympie.com.au` and `www.royalgympie.com.au`. Canonical tags should point to `www`.
- `Alternate page with proper canonical tag`: acceptable for duplicate variants like `/index.html` if the canonical URL is the clean `www` URL.
- `Crawled - currently not indexed` or `Discovered - currently not indexed`: usually means Google has seen the URL but has not indexed it yet. Check that the page is internally linked, in the sitemap, returns `200`, and has no `noindex`.

Relevant Google references:

- https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- https://support.google.com/webmasters/answer/9012289
- https://support.google.com/webmasters/answer/7440203
