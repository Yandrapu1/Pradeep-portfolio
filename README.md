# Pradeep Yandrapu — Portfolio

A production-grade portfolio for **Pradeep Yandrapu, Full Stack Developer**, built with
Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS v4.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run lint    # eslint
```

## Architecture

- **`src/app`** — App Router pages, layout, metadata, `robots.ts`, `sitemap.ts`,
  the generated Open Graph image (`opengraph-image.tsx`), and the contact API route.
- **`src/components`** — section components. Static sections (`About`, `Experience`,
  `Education`, `Footer`) are server components; interactive/animated sections
  (`Hero`, `Navigation`, `Work`, `Skills`, `Process`, `Contact`, `ThemeToggle`,
  `CaseStudyModal`, `BackToTop`) run on the client. Shared helpers: `SectionHeader`,
  `Reveal` (scroll-in), and `Providers` (motion config).
- **`src/data`** — content and configuration: `projects.ts`, `skills.ts`, and
  `site.ts` (links, resume path, canonical URL).

## Design system

All colors are semantic tokens defined once in `src/app/globals.css` and remapped per
theme. Components reference tokens only (`bg-surface`, `text-ink`, `border-line`,
`text-brand`, …) — never raw hex. Light and dark themes are both first-class; the theme
is applied before first paint (no flash), respects the system preference, and persists
the user's choice in `localStorage`.

## Motion

Motion is intentionally restrained: staggered hero entrance, subtle scroll-in reveals,
and small hover lifts via **Framer Motion**. `Providers` wraps the app in
`<MotionConfig reducedMotion="user">`, so every animation is automatically disabled for
visitors who prefer reduced motion.

## Configuration & placeholders

Update these in `src/data/site.ts` when the real assets are ready:

- `SITE_URL` — canonical/OG domain (currently a placeholder).
- `RESUME_URL` — points to `/resume.pdf`; add that file to `public/` to enable the
  resume links.
- `EMAIL` — set a real address to expose a direct `mailto:` link in the contact section.

Add a portrait image to the hero placeholder when available.

## Contact form

The `/api/contact` route validates input and reports honestly:

- With `RESEND_API_KEY` set (and the provider send wired in), it returns
  `delivered: true` and the UI confirms the message was sent.
- Without a provider configured, it returns `delivered: false`; the UI thanks the user
  and points them to the direct GitHub/LinkedIn links instead of claiming an email was
  sent.
