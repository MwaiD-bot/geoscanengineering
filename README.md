# GeoScan Engineering

A premium static website for a geotechnical and engineering consultancy, designed for Cloudflare Pages and Cloudflare Workers.

## Local preview

```bash
cd public
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Cloudflare Pages + Worker deployment

1. Push this repository to GitHub.
2. In the Cloudflare dashboard, go to Pages > Create project > Connect to Git.
3. Select the repository.
4. Use these settings:
   - Framework preset: None
   - Build command: leave empty
   - Output directory: `public`
5. Save and deploy.
6. In the same Cloudflare account, create a Worker or use the Pages project settings to add a Worker route.
7. Add the following environment variables to the Worker / Pages project:
   - `CONTACT_EMAIL` = `hello@geoscanengineering.co.ke`
   - `MAIL_FROM` = `noreply@yourdomain.com`
   - `MAILCHANNELS_API_KEY` = your MailChannels API key (optional if your domain is configured for MailChannels)

## Cloudflare mail setup

This contact form is set to send email through MailChannels, which works well with Cloudflare-hosted projects.

You will need:
- a verified domain for sending email,
- a MailChannels API key,
- or a verified Cloudflare Email Routing setup if you want to connect it to the Cloudflare mail system.

For production, configure the domain to allow sending from the chosen from-address.

## Project structure

- `public/index.html` — homepage
- `public/about.html` — company profile
- `public/services.html` — service overview
- `public/approach.html` — methodology
- `public/gallery.html` — project imagery
- `public/contact.html` — contact form
- `public/success.html` — confirmation page
- `public/style.css` — styling
- `public/script.js` — contact form submission logic
- `functions/api/contact.js` — Cloudflare Pages function that sends email
- `worker/contact-email.js` — standalone Worker version of the same email logic

## Branding

The website is branded as GeoScan Engineering.
