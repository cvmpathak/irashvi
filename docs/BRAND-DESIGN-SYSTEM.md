# Brand & Design System

## Brand

- **Name**: Irashvi
- **Tagline**: Goodness, thoughtfully packed.
- **Personality**: natural, earthy, trustworthy, contemporary, approachable.
- **Voice**: calm, plain-spoken, specific. Never over-claim.

## Colour palette

| Token | Hex | Use |
| --- | --- | --- |
| Forest 700 | `#263C2B` | Primary ink, buttons, footer |
| Cream | `#F5F0E5` | Default page background |
| Sage 300 | `#B7B98A` | Accents, separators |
| Terracotta 400 | `#B96945` | Highlight, secondary CTA |
| Charcoal 200 | `#2B2D28` | Body text |
| Sand 200 | `#E7DFCF` | Subtle surfaces, chips |

These are wired into Tailwind via `tailwind.config.ts` (`forest`, `cream`,
`sage`, `terracotta`, `charcoal`, `sand`) and into CSS custom properties in
`globals.css`.

## Typography

- **Display / headlines**: `Cormorant Garamond` (Google Fonts), via the
  `font-display` utility. Used for `h1`, hero copy, and section headings.
- **Body / UI**: `Inter` (Google Fonts), via the default body font. Sizes use
  fluid clamps where appropriate (`text-display-xl` → `text-display-md`).

Both fonts are loaded via `next/font` in `src/app/layout.tsx` for optimal
loading.

## Spacing & radii

- Container widths: `max-w-7xl` for the main canvas, `max-w-3xl` for editorial
  pages, `max-w-reading` (68ch) for prose.
- Card radii: `rounded-2xl-soft` (1.25rem), `rounded-3xl` (1.5rem).
- Section padding: `py-20` on most sections, `py-12` on list pages.

## Surfaces & elevation

- `shadow-soft` — default card shadow.
- `shadow-lift` — hover / featured card shadow.
- `bg-grain` — subtle radial highlight on hero surfaces.
- Avoid neon gradients, glassmorphism, and continuous looping animations.

## Motion

- Section reveals use `whileInView` with `viewport={{ once: true, margin: '-80px' }}`.
- Stagger via the shared `staggerContainer` variants.
- All motion is `transform` + `opacity` only. No scroll hijacking.
- `prefers-reduced-motion` disables animations globally via
  `globals.css`.

## Imagery

This demo uses self-contained SVG illustrations so the storefront runs without
external CDN. Replace them with real photography before launch. Recommended
sizes:

- Product cards: `1000 × 1000` (square).
- Category hero: `1200 × 800` (3:2).
- Brand / hero: `1200 × 900` (4:3).
- All assets live under `public/images/`.

## Voice & copy rules

- Avoid fabricated nutritional claims, certifications, or sourcing stories.
- Use clear "demo" labelling wherever data is illustrative.
- Keep paragraph rhythm generous; favour one idea per line.
- Don't claim a real order is created, a real payment is taken, or a real
  enquiry is sent.