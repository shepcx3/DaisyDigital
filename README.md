# Daisy Digital ✿

*Creative by nature.* The website for Daisy Digital: social media, content, strategy and consulting.

A static site (HTML, CSS and JS, no build step) with:

- **About**: the landing hero with the Daisy Digital sign-off
- **Our Work**: brand grid plus a scrolling marquee
- **The Girls**: MySpace-style profile windows with animated cartoon versions of Erica & Bri
- **Contact**: "Give us a buzz", where a bee buzzes in and lands on a daisy
- **We're Growing**: a watering can waters flowers that bloom, with a resume upload form
- A glitter trail cursor (desktop only; turned off for people who set reduced motion)

## Run locally

```bash
python3 -m http.server 5173
```

Then open http://localhost:5173.

## Before launch

1. **Email:** set `CONTACT_EMAIL` in `script.js` to the real inbox.
2. **Forms:** create a free form at [formspree.io](https://formspree.io) and paste its URL into `FORM_ENDPOINT` in `script.js`.
   Resume file uploads need a Formspree plan that supports files. Until the endpoint is set, the contact form opens
   the visitor's email app, and the join form asks people to email their resume.
3. **Hosting:** in GitHub go to Settings → Pages → Deploy from branch → `main` / root, and the site goes live.
