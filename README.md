# Irashvi

A premium, modern, earthy-themed packaged-food e-commerce storefront built
with Next.js. This is the initial frontend-first phase: it ships a polished
catalog, cart, demonstration checkout, and wholesale enquiry experience that
runs **without** a database, payment gateway, or object storage.

> **Demo only.** Products, prices, SKUs, availability, and reviews on this site
> are illustrative. The checkout and wholesale forms are clearly labelled as
> demonstration flows. See [`docs/LOCAL-DATA.md`](./docs/LOCAL-DATA.md) and
> [`docs/FUTURE-DATABASE-INTEGRATION.md`](./docs/FUTURE-DATABASE-INTEGRATION.md).

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build

npm run typecheck  # tsc --noEmit
npm run lint       # next lint
npm test           # vitest (unit + component)
npm run test:e2e   # playwright (browser flows)
```

The site is self-contained: no `.env` is required for the demo to run.

## Tech stack

- Next.js 14 (App Router) + React 18
- TypeScript (strict)
- Tailwind CSS
- Motion for React (`motion`)
- Lucide icons
- Zod (form validation)
- Vitest + React Testing Library
- Playwright

## Project layout

```
src/
  app/                      # Next.js App Router (routes, layouts, metadata)
    page.tsx                # Homepage
    shop/, products/, categories/, search/
    cart/, checkout/
    wholesale/, our-story/, recipes/, journal/
    contact/, faq/, *-policy/
    api/ (empty)
    layout.tsx              # Root layout, providers, fonts
    globals.css             # Tailwind layers + tokens
    error.tsx / global-error.tsx / not-found.tsx
  components/
    ui/         # Button, Logo, Breadcrumbs, PolicyPage
    layout/     # Header (incl. mobile nav), Footer, AnnouncementStrip
    products/   # ProductCard, ProductGallery, ProductDetailClient, CatalogueClient
    cart/       # CartDrawer, CartView
    forms/      # CheckoutForm, WholesaleForm, CheckoutSuccessView
    sections/   # Hero, CategoryShowcase, FeaturedProducts, BrandStory, RecipesSection, WholesaleCTA
    animations/ # motion-variants
  data/         # types.ts, products.ts, categories.ts, recipes.ts, journal.ts, site-settings.ts
  services/
    catalogue/  # ProductRepository, CategoryRepository, LocalProductRepository, LocalCategoryRepository
    checkout/   # CheckoutService, LocalCheckoutService (demo)
    media/      # MediaStorage interface + LocalMediaStorage
  features/
    cart/       # CartProvider, useCart
    catalogue/  # parse-catalogue-params
  lib/          # utils.ts (cn), validation/, formatting/
  styles/
public/
  images/       # All illustration assets (self-contained)
docs/           # Architecture, design, future integration guides
tests/
  unit/         # Vitest unit tests
  components/   # React Testing Library component tests
  e2e/          # Browser end-to-end tests (Playwright)
```

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Next.js dev server on port 3000. |
| `npm run build` | Build the production bundle. |
| `npm start` | Serve the production bundle on port 3000. |
| `npm run typecheck` | Run `tsc --noEmit`. |
| `npm run lint` | Run `next lint`. |
| `npm test` | Run Vitest once. |
| `npm run test:watch` | Run Vitest in watch mode. |
| `npm run test:e2e` | Run Playwright (requires `npm run test:e2e:install` once). |

## What works right now

- Home, shop, category, product detail, search, our-story, recipes (index +
  detail), journal (index + detail), wholesale, contact, FAQ, all four policy
  pages, cart, checkout (demo), checkout cancelled + success.
- Cart state persists across reloads via `localStorage`. Invalid stored entries
  are dropped safely on hydration.
- Search, filters, and sorting are URL-driven so any view is shareable.
- Product detail page supports multiple variants, pack-size and quantity
  selection, and rejects unavailable variants.
- Mobile navigation drawer, accessible skip link, visible focus rings.
- `prefers-reduced-motion` is honoured.
- SEO: per-page metadata, canonical URLs, `sitemap.xml`, `robots.txt`, JSON-LD
  breadcrumbs and product structured data.

## What is explicitly a demonstration

- **Checkout** — generates a synthetic reference id, never charges a card, and
  does not transmit personal details to any backend.
- **Wholesale form** — validates input with Zod and shows a confirmation state,
  but does not transmit data anywhere.
- **Product catalogue** — local sample data, clearly identified as such.
- **Imagery** — self-contained SVG illustrations. Replace with real product
  photography before launch.

## Future integration boundaries

The application is intentionally split so a real backend can be added later
without touching UI components. See the docs:

- [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md)
- [`docs/LOCAL-DATA.md`](./docs/LOCAL-DATA.md)
- [`docs/BRAND-DESIGN-SYSTEM.md`](./docs/BRAND-DESIGN-SYSTEM.md)
- [`docs/TESTING.md`](./docs/TESTING.md)
- [`docs/FUTURE-DATABASE-INTEGRATION.md`](./docs/FUTURE-DATABASE-INTEGRATION.md)
- [`docs/FUTURE-PAYMENTS.md`](./docs/FUTURE-PAYMENTS.md)
- [`docs/FUTURE-MEDIA-STORAGE.md`](./docs/FUTURE-MEDIA-STORAGE.md)

## Accessibility

- WCAG 2.2 AA targeting: visible focus rings, semantic landmarks, labelled
  inputs, accessible form errors, dialog roles on drawers.
- Motion is gated behind `prefers-reduced-motion`.
- Keyboard-only flows are exercised in Playwright.

## License

Internal demo. Not for production deployment.