# Local Data

Irashvi ships with a small, self-contained catalogue in
`src/data/`. Everything is type-checked at build time so a typo
breaks the build rather than the runtime.

## Files

- `types.ts` — domain models (Product, Category, Recipe, JournalEntry,
  SiteSettings, CartItem).
- `products.ts` — `products[]` array, with `productBySlug` and `productById`
  indexes.
- `categories.ts` — `categories[]` array + slug/id indexes.
- `recipes.ts` — `recipes[]` array.
- `journal.ts` — `journalEntries[]` array.
- `site-settings.ts` — brand, navigation, footer, FAQ, and policy stubs.

## Editing products

Open `src/data/products.ts` and edit the array. Each product needs:

```ts
{
  id: 'prod-...',
  slug: 'kebab-case',
  name: 'Display Name',
  shortDescription: 'One sentence, ≤ 120 chars.',
  description: 'Longer paragraph(s) of marketing copy.',
  categoryId: 'cat-dried-vegetables', // matches a category id
  images: [{ src: '/images/products/foo.svg', alt: '...', width: 1000, height: 1000 }],
  variants: [
    { id: 'var-...', packSize: '100 g', price: 220, sku: 'IR-...', availability: 'in_stock' },
  ],
  ingredients: ['Carrot (100%)'],
  netQuantity: '100 g / 250 g / 1 kg',
  usageInstructions: '...',
  storageInstructions: '...',
  shelfLife: 'Best within 9 months of packaging.',
  availability: 'in_stock',
  featured: true,
  createdAt: '2026-05-04',
}
```

Slugs are stable identifiers — don't change them after publishing unless you
set up a redirect.

## Editing categories

Open `src/data/categories.ts`. Each category needs an `id` (e.g.
`cat-dried-vegetables`), a `slug`, a `name`, a `description`, and an `image`.
Optional `hero` shows as a soft subtitle on the category page.

## Recipes and journal entries

Recipes live in `src/data/recipes.ts`, journal entries in
`src/data/journal.ts`. Both are consumed by their respective index and detail
pages. `relatedProductIds` on a recipe must reference real product IDs.

## Site settings

`src/data/site-settings.ts` controls:

- `brand.email`, `brand.phone`, `brand.address`, `brand.socials` — placeholder
  values; replace with real data before launch.
- `announcement` — toggle the announcement strip and edit the message.
- `navigation.primary` and `navigation.footer` — header / footer links.
- `policies` — short policy blurbs. Long-form pages are static and live under
  `src/app/{shipping-policy,returns-refunds,privacy-policy,terms-and-conditions}`.
- `faqs` — homepage FAQ data; the dedicated `/faq` page consumes it.

## What you must not store in the demo

- Payment information.
- Real customer data.
- Authentication credentials or tokens.
- Anything that pretends to be a real order or enquiry.

The cart context is the only place that uses `localStorage`, and it stores
non-sensitive item identifiers, variant IDs, and quantities only. Invalid
or stale entries are dropped on hydration.