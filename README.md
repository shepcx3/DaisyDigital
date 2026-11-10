# daisy digital ✿

*creative by nature.* The marketing site for Daisy Digital (social media, content, strategy and consulting).

Built with Next.js 16 (App Router), TypeScript, Tailwind v4, React Three Fiber, exported as a static site and hosted on GitHub Pages.

## One visual system

Three motifs, used everywhere: **the daisy** (logo, cursor, loader, dividers, easter eggs), **the browser window** (nav tabs, case studies, team cards, forms) and **the sparkle** (cursor trail, click bursts, hover feedback, badges). Everything else is a sticker, and stickers are seasoning (2–3 per screen, max).

See it all on **`/styleguide`**: every colour, type style, icon, component and motion preset.

## Where things live

| Path | What |
|---|---|
| `content/site.ts` | **all the words.** Edit copy, case studies and team bios here. `[placeholder]` marks things still needed from the client |
| `app/tokens.css` | design tokens: colours, radii, borders, shadows, motion timings |
| `app/globals.css` | grain, cursors, type utilities, focus rings, calm mode, page transitions |
| `lib/motion.ts` | the one motion config (durations, easings, springs) |
| `components/system/` | BrowserWindow, TabNav, Sticker, Badge, Button, Polaroid, StickyNote, TornPaper, Divider, Marquee, MicroLabel, Annotation, Loader |
| `components/characters/` | `<Cutie who pose />` Y2K cartoon characters (placeholder art drawn in `Cutie.tsx`), team ProfileCard and the messenger-style StatusList |
| `components/features/` | bee button, watering can and blooming flowers (Garden), 3D chrome daisy, forms, DMs footer, easter eggs |
| `app/*` | pages: home, work (+ case studies), team, careers, contact, thanks, password, 404 |

## Run it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Deploying (GitHub Pages)

Every push to `main` builds and publishes the site via `.github/workflows/deploy.yml`.

**One-time setup:** on GitHub open the repo → **Settings → Pages → Source: GitHub Actions**.

The site will be at `https://shepcx3.github.io/DaisyDigital/`. If you add a custom domain later, change `PAGES_BASE_PATH` in the workflow to an empty string so links point at the domain root.

## Before launch

1. **Email + forms:** set `brand.email` and `brand.formEndpoint` (e.g. a [Formspree](https://formspree.io) URL) in `content/site.ts`. Without an endpoint, forms open the visitor's email app. Resume uploads need a form service that accepts files.
2. **Placeholders:** case study details, team moods/trends, and character art (`components/characters/Cutie.tsx`).
3. **Photos:** pass `src` to `<Polaroid>` and the flash-photo treatment applies automatically.
4. **Live status:** the status list reads each person's `presence` from `content/site.ts`, so it is set by hand and not live yet. Truly live statuses need a small outside service.
5. **Team notes:** profile lines come from the owner's notes; the bits still marked `[placeholder]` in `content/site.ts` are not final.
6. **Team corner** (`/login`): the girls sign in (Google or an emailed link) and change their status. It runs on Firebase's free plan; setup steps are in `docs/team-corner-setup.md`, rules in `firestore.rules`. Until the Firebase values are set, the site shows the statuses from `content/site.ts`.

## Easter eggs

- ↑ ↑ ↓ ↓ ← → ← → B A toggles sparkle mode (extra glitter + chrome-shimmer headings).
- Four hidden daisies (work, team, careers, footer). Find them all for the same reward.
- Hover the micro-labels for secrets. The "+" tab does something cute.

## Calm mode

Follows the visitor's reduced-motion setting, and there's a "calm mode" toggle in the nav (saved per visitor). It turns off the glitter, custom cursors, the bee flight, the 3D daisy and the marquee, and page transitions become simple fades.
