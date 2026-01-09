# The Royal Hotel Gympie Static Site

## Run locally
- Open `index.html` in your browser.

## Replace these placeholders
- Booking URL: `https://www.booking.com/PLACEHOLDER`
- Address: `[INSERT STREET ADDRESS]`
- Phone and email: `(07) 0000 0000`, `hello@royalhotelgympie.com.au`
- Social links: `https://www.facebook.com/PLACEHOLDER`, `https://www.instagram.com/PLACEHOLDER`
- Images: replace files in `assets/img/` and update any captions or alt text if needed
- Map iframe: update the `src` attribute in `contact/index.html`
- Site URL in metadata and `sitemap.xml`

## Deploy to S3 + CloudFront (high level)
1. Upload the full site folder to an S3 bucket.
2. Configure the bucket for static website hosting or set it as the CloudFront origin.
3. Set `index.html` as the default root object in CloudFront.
4. After updates, invalidate the CloudFront cache to refresh content.
