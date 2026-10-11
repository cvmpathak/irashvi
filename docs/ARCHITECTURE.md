# Architecture

Irashvi is a Next.js 14 (App Router) application built around three explicit
boundaries:

1. **UI components** consume well-typed domain models.
2. **Services / repositories** expose the data layer through interfaces. The
   current implementations read from local TypeScript modules; future
   implementations can replace them with a database without touching UI.
3. **Pages** compose UI and services. They are mostly server components for
   performance, with interactive islands upgraded to client components.

## High-level flow

```
┌────────────┐    ┌──────────────────┐    ┌────────────────────────┐
│  App pages │ →  │ Repository /     │ →  │ Local data modules     │
│ (server)   │    │ service layer    │    │ (products, categories, │
│            │    │                  │    │  recipes, journal,     │
└────────────┘    └──────────────────┘    │  site-settings)        │
        │                                   └────────────────────────┘
        │ for interactive bits
        ▼
┌────────────┐    ┌──────────────────┐
│  Client    │ ←  │ Cart / Forms /   │
│  islands   │    │ Drawers          │
└────────────┘    └──────────────────┘
```

## Server / client split

- **Server components (default)**: every page, every layout, every static
  section. They render with the local data layer and ship as HTML.
- **Client components**: anything that needs state, animation, or browser APIs:
  - `Header` — sticky header + drawer/menu state
  - `CartDrawer` / `CartView` — cart state
  - `CatalogueClient` — filters & sort with URL sync
  - `ProductDetailClient` — variant & quantity selection
  - `CheckoutForm` / `WholesaleForm` — controlled forms + Zod validation
  - `Hero`, `CategoryShowcase`, `FeaturedProducts`, `BrandStory`,
    `RecipesSection`, `WholesaleCTA` — Motion entrance animations

The `<CartProvider>` wraps the whole app in `src/app/layout.tsx`. The cart
context is the single source of truth for cart state during a session and
persists to `localStorage` on the client only.

## Data layer interfaces

`src/services/catalogue/types.ts` defines:

```ts
interface ProductRepository {
  getAllProducts(): Promise<Product[]>;
  getProductBySlug(slug: string): Promise<Product | null>;
  getProductsByCategory(slug: string): Promise<Product[]>;
  searchProducts(query: string): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
  listProducts(options?: ProductListOptions): Promise<Product[]>;
  getVariant(productId: string, variantId: string): Promise<ProductVariant | null>;
}

interface CategoryRepository {
  getAllCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | null>;
}
```

`LocalProductRepository` and `LocalCategoryRepository` are the only concrete
implementations today. Pages always import from `@/services/catalogue` (which
re-exports the singletons), so swapping in a database-backed implementation
requires zero UI changes.

## Checkout boundary

`src/services/checkout/types.ts` declares the integration boundary:

```ts
interface CheckoutService {
  submitDemoCheckout(items: CartItem[], form: CheckoutFormData): Promise<CheckoutConfirmation>;
}
```

`LocalCheckoutService` validates with Zod, computes a synthetic total, and
returns a synthetic reference. Future providers can replace it without
touching `CheckoutForm`.

## Media boundary

`src/services/media/types.ts` defines `MediaStorage.resolve(src)`. The local
implementation simply passes through `/images/*` paths. A future S3-compatible
adapter can be plugged in by registering a different singleton in
`src/services/media/index.ts`.

## Filtering & sorting

`src/features/catalogue/parse-catalogue-params.ts` converts Next.js search
params into a `ProductFilter` + `ProductSort`. The catalogue UI calls
`productRepository.listProducts({ filter, sort })` whenever the URL changes,
keeping state shareable and avoiding full page reloads.

## SEO surface

- Per-route `metadata` exports.
- `sitemap.ts` and `robots.ts` (App Router file conventions).
- JSON-LD breadcrumbs on every page, JSON-LD `Product` on the PDP.
- Canonical URLs on each route.

## Animation

`src/components/animations/motion-variants.ts` exposes a small set of reusable
`Variants` (`fadeUp`, `fadeIn`, `staggerContainer`) and a `viewportOnce`
helper. All section-level animations reuse the same variants.

## Accessibility

- Skip link in the root layout.
- All forms use labelled inputs and inline error messages with `aria-invalid`
  / `aria-describedby`.
- Drawers use `role="dialog"` + `aria-modal`.
- Focus rings on every interactive element.
- `prefers-reduced-motion` honoured globally in `globals.css`.

## Errors

- `src/app/error.tsx` — segment-level error boundary.
- `src/app/global-error.tsx` — root error boundary (HTML includes its own
  minimal document so it still works without the layout).
- `src/app/not-found.tsx` — custom 404.
- Empty states for empty cart, no search results, empty filters, product not
  found.