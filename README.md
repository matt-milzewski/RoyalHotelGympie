# The Royal Hotel Gympie Static Site

## Run locally
- Run `python3 -m http.server 4173` from the repo root and open `http://127.0.0.1:4173/`.

## Current public details
- Booking URL: `https://www.booking.com/searchresults.html?ss=The%20Royal%20Hotel%20Gympie%2C%20Gympie%2C%20Queensland%2C%20Australia`
- Address: `190 Mary Street, Gympie QLD 4570`
- Phone and email: `07 5483 7857`, `admin@royalgympie.com.au`
- Social links: not configured

## Replace these placeholders
- Images: replace files in `assets/img/` and update any captions or alt text if needed
- Map iframe: update the `src` attribute in `contact/index.html`
- Site URL in metadata and `sitemap.xml`

## Deploy to S3 + CloudFront

The GitHub Actions workflow now provisions and updates the production infrastructure for you:

1. Creates or updates a private S3 origin bucket.
2. Creates or updates a CloudFront distribution in front of that bucket.
3. Uses a CloudFront Function to rewrite clean URLs like `/about/` to `/about/index.html`.
4. Uploads HTML with no-cache headers and static assets with long-lived cache headers.
5. Invalidates the CloudFront cache after every deploy.

## GitHub Actions deployment
This repo includes a workflow at `.github/workflows/deploy.yml` that deploys on pushes to `main`.

Required GitHub Secrets:
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION` (example: `ap-southeast-2`)

Optional GitHub Variables:
- `AWS_CLOUDFRONT_STACK_NAME`
- `AWS_PROJECT_NAME`
- `AWS_CLOUDFRONT_PRICE_CLASS`
- `AWS_ORIGIN_BUCKET_NAME`
- `AWS_PRIMARY_DOMAIN_NAME`
- `AWS_ROUTE53_HOSTED_ZONE_ID`
- `AWS_ACM_CERTIFICATE_ARN_US_EAST_1`

Notes:
- If `AWS_PRIMARY_DOMAIN_NAME` and `AWS_ROUTE53_HOSTED_ZONE_ID` are set, the workflow can automatically request a DNS-validated ACM certificate in `us-east-1`, validate it through Route 53, and create the alias records to CloudFront.
- If you do not want certificate automation, you can still provide `AWS_ACM_CERTIFICATE_ARN_US_EAST_1` manually.
- The ACM certificate used by CloudFront must exist in `us-east-1`.
- If no custom domain is configured, the workflow still deploys and outputs the default `*.cloudfront.net` domain.
