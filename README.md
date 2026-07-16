# MACPROTEC Engineering — Website Rebuild (Next.js)

Home page rebuild in Next.js (App Router) + React + Tailwind CSS, following the
site's information architecture. Structural inspiration (stats bar, industry
list, dark values band, insights grid) from the Kondor reference layout, but
brand colors and copy are Macprotec's own.

## Setup

```bash
npm install
# or: pnpm install / yarn install
npm run dev
```

Then open http://localhost:3000

## Requirements

Node.js 18.17 or later (Next.js 14 requirement). If `npm install` fails with an
`ENOENT: package.json` error, you're not inside the `macprotec-site` folder —
`cd` into it first (the folder that directly contains this README and
`package.json`).

## Project structure

```
app/                    Next.js App Router pages
  page.tsx              Home, assembles all section components
  layout.tsx            Root layout + metadata
  globals.css           Tailwind base + font imports
  api/contact/route.ts  Contact form submission handler (stub — wire to email/CRM)
components/
  layout/               Header, Footer (nav-data driven)
  home/                 Section components used on the home page
lib/
  constants.ts           Single source of truth: nav links, services, expertise, articles
types/
  content.ts             Shared TypeScript types for content collections
```

## Notes

- Services and Expertise are data arrays in `lib/constants.ts`, not hardcoded
  markup — add a new entry there and it appears in nav, footer, and grids
  automatically.
- Each `Service` has a `published` boolean. Home shows all six offerings;
  set `published: true` once a service has a real detail page to link to.
- The contact form posts to `app/api/contact/route.ts`, which currently just
  logs the submission — connect it to an email provider (Resend, SendGrid) or
  your CRM before going live.
- Only the Home page is built so far. Services index/detail, Expertise
  index/detail, and Resources pages follow the same component pattern and are
  the natural next step.
