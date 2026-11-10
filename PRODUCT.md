# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: brands looking for help with social media, content, strategy or consulting, arriving to decide whether Daisy Digital is right for them and to get in touch ("give us a buzz"). **Open:** the exact client profile (category, size, founder-led or not) has not been stated; the named past clients lean lifestyle, beauty and wellness.

Secondary: people who want to join the team, through the careers page ("we're growing") and its resume upload.

## Product Purpose

The marketing site for Daisy Digital, a creative agency. It introduces who they are, shows the brands they've worked with, introduces the girls, and turns interest into a contact enquiry or a job application. Success is a visitor sending an enquiry or applying.

## Positioning

From the CEO's brief: Daisy Digital is "chronically online, creatively curious and always a few scrolls ahead." They make brands "look good, sound cool", and they're probably already working on your next idea. The team lives online and knows what's cool before everyone else does. Erica is the trend stalker; Bri turns a random thought into a campaign and knows how to make a viral video.

## Operating Context

- The team: Erica ("the girl with 400 tabs open"), Bri ("the everything girl"), Philie (photography princess) and Jany (model of the year). Their profile lines come from the owner's handwritten notes. The client wants to add members themselves as they grow.
- Visitors reach the agency by the contact form, the careers application with resume upload, or the footer newsletter signup.
- Visitors come from social feeds and phones as much as desktops.

## Capabilities and Constraints

- Services (CEO brief): **social media, content, strategy, consulting.**
- Sections required by the CEO brief:
  - **About us (landing page):** the intro copy, motto and sign-off.
  - **Our work:** brands they've worked with.
  - **The girls:** animated characters of each person with a short bio.
  - **Contact us:** "give us a buzz", with a bumble bee swirling and buzzing onto a daisy.
  - **We're growing:** a watering can, then flowers blooming, opening a place to upload a resume and apply.
- Current build also has: work case-study pages, thanks, password, 404, and an internal `/styleguide`.
- Stack: Next.js 16 App Router, TypeScript, Tailwind v4, React Three Fiber, Motion. Static export (`output: "export"`) hosted on GitHub Pages under the `/DaisyDigital` base path. No server: forms post to a third-party endpoint (`brand.formEndpoint`, e.g. Formspree) or fall back to the visitor's email app. **Resume upload needs a form service that accepts files**; until one is set, the careers form can't take the file the brief asks for.
- The team corner (`/login`) is a real sign-in on Firebase's free plan (Auth + Firestore, client-side). The page itself is public HTML; the data is protected by `firestore.rules`.
- All copy lives in `content/site.ts` so the client can edit words without touching components. `[placeholder]` marks content still owed by the client.
- Calm mode: follows reduced-motion and has a persisted nav toggle; it removes glitter, custom cursors, bee flight, the 3D daisy and the marquee.

## Brand Commitments

Set by the CEO and binding:

- Name **Daisy Digital** (shown lowercase on the site). Tagline: **"creative by nature."** Motto: "stay cute. stay current. stay on everyone's feed." Sign-off: "love, daisy digital xo".
- **Purple. Girly.**
- **Glitter-trail cursor.**
- Team characters are **animated cuties**, in the spirit of 404 DOLLS / MySpace-era vibes.
- The **bee onto a daisy** (contact) and the **watering can and blooming flowers** (careers) are the CEO's ideas and should stay.
- Bios for Erica and Bri use the CEO's wording.

Voice: lowercase, playful, internet-native. Form labels and legal text stay clear and conventional. The existing easter eggs (sparkle mode, hidden daisies, micro-label secrets, the "+" tab) were added in the build, not asked for by the CEO; keep them, but they're not commitments.

## Evidence on Hand

- Brands the CEO says they've worked with: **bloom, glossier, lay low, strong, holistically hip, dreamers club**, "and more". The names come from the CEO; what was done for each, and any results, have not been supplied. Show the names, but do not write services, results, metrics, logos or testimonials for any brand until the client provides them. More client names are still to come.
- Team bios for Erica and Bri: CEO-supplied. Moods, now-listening lines and trend lists in `content/site.ts` are build placeholders.
- Character art (Y2K cartoon, `components/characters/Cutie.tsx`) and polaroid photos are placeholders awaiting real assets.
- Statuses (status light, status, mood, listening, fav trend) are live once Firebase is connected: the girls change them in the team corner. Names, bios, badges and characters still live in `content/site.ts`; adding new members themselves is not built yet.
- Domain: daisydigital.ca (GoDaddy); Instagram handle is the same.
- Contact inbox: `hello@daisydigital.ca` (confirmed by Erica).

## Product Principles

1. Personality is the proof: the site should feel like the girls run it, because the voice is what is being sold.
2. The CEO's ideas are the spine: each section carries the moment she described (glitter cursor, bee, watering can, cuties).
3. Never fabricate proof: show the brands, but invent no results, quotes or details about them.
4. Every playful flourish leaves a clear path to getting in touch or applying.
5. Delight has an off switch: everything decorative respects calm mode.

## Accessibility & Inclusion

Reduced motion is honoured automatically and through the persisted calm-mode toggle; motion-heavy features (3D, glitter cursor, bee flight, marquee) must degrade to calm equivalents. Skip link and focus rings are in place. No formal WCAG level has been set.
