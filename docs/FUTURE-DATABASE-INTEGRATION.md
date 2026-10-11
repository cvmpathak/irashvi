# Future Database Integration

This document describes how to add a real database to the storefront without
rewriting the UI. It is **not** implemented in the current build — the demo
runs entirely against local TypeScript data.

## Goals

1. Replace `LocalProductRepository` and `LocalCategoryRepository` with
   database-backed implementations of the same interfaces.
2. Persist orders, addresses, customers, wholesale enquiries.
3. Move pricing and totals calculations to the server (trusted code) and
   reconcile local cart state against current database prices.

## Stack

- **PostgreSQL** (recommended) or MySQL.
- **Prisma** for schema, migrations, and typed queries.
- **Next.js Server Actions / Route Handlers** for mutations.

## Schema (sketch)

The Prisma schema should mirror the existing TypeScript domain types:

```prisma
model Category {
  id        String   @id
  slug      String   @unique
  name      String
  description String
  image     Json     // { src, alt, width, height }
  hero      String?
  products  Product[]
  createdAt DateTime @default(now())
}

model Product {
  id        String   @id
  slug      String   @unique
  name      String
  shortDescription String
  description String
  categoryId String
  category  Category @relation(fields: [categoryId], references: [id])
  images    Json
  variants  ProductVariant[]
  ingredients String[]
  netQuantity String?
  usageInstructions String?
  storageInstructions String?
  shelfLife String?
  availability Availability
  featured  Boolean  @default(false)
  createdAt DateTime @default(now())
}

model ProductVariant {
  id          String   @id
  productId   String
  product     Product  @relation(fields: [productId], references: [id])
  packSize    String
  price       Int      // store as paise (integer) — convert at the boundary
  sku         String @unique
  availability Availability
  inventory   Int      @default(0)
}

model Order {
  id            String      @id @default(cuid())
  reference     String      @unique
  status        OrderStatus
  items         OrderItem[]
  customer      Customer?   @relation(fields: [customerId], references: [id])
  address       Address?    @relation(fields: [addressId], references: [id])
  subtotal      Int
  shipping      Int
  total         Int
  paymentIntent String?
  notes         String?
  createdAt     DateTime    @default(now())
}

model OrderItem {
  id          String   @id @default(cuid())
  orderId     String
  order       Order    @relation(fields: [orderId], references: [id])
  productId   String
  variantId   String
  quantity    Int
  unitPrice   Int
}

model Customer {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String
  phone     String?
  addresses Address[]
  orders    Order[]
}

model Address {
  id         String   @id @default(cuid())
  customerId String
  customer   Customer @relation(fields: [customerId], references: [id])
  line1      String
  city       String
  state      String
  pin        String
}

model Coupon {
  id          String   @id @default(cuid())
  code        String   @unique
  description String
  discount    Int
  active      Boolean  @default(true)
}

model WholesaleEnquiry {
  id                String   @id @default(cuid())
  name              String
  company           String
  email             String
  phone             String
  businessType      String
  productInterest   String
  estimatedQuantity String
  deliveryLocation  String
  message           String?
  status            String   @default("new")
  createdAt         DateTime @default(now())
}
```

## Repository swap

The interface boundaries already exist:

```ts
// src/services/catalogue/types.ts
export interface ProductRepository { ... }
export interface CategoryRepository { ... }
```

Add a `DbProductRepository` and `DbCategoryRepository`. Re-export them from
`src/services/catalogue/index.ts` instead of the local ones. UI components
and pages will continue to import the same singleton names.

```ts
// src/services/catalogue/index.ts (future)
export const productRepository: ProductRepository = new DbProductRepository(prisma);
export const categoryRepository: CategoryRepository = new DbCategoryRepository(prisma);
```

No UI code needs to change.

## Checkout

Replace `LocalCheckoutService` with `DbCheckoutService` that:

1. Validates the form with the same Zod schema.
2. Recomputes prices against the database (never trust client totals).
3. Reserves inventory (decrement `ProductVariant.inventory`).
4. Creates an `Order` and `OrderItem` records.
5. Returns the same `CheckoutConfirmation` shape so the existing UI keeps
   working.

The PaymentProvider integration sits behind `CheckoutService.submitCheckout`
in the same way, and is documented in [`FUTURE-PAYMENTS.md`](./FUTURE-PAYMENTS.md).

## Cart reconciliation

The current cart stores `{productId, variantId, quantity}` locally. When a
user checks out, the server should:

- Re-fetch each variant from the database.
- Reject the order if any variant is out of stock or has changed price.
- Return the authoritative totals on the confirmation page.

## Caching & ISR

Most catalogue pages are good candidates for Next.js ISR:

```ts
export const revalidate = 3600; // 1 hour
```

Pages that should be **dynamic** (because they read the request): `/cart`,
`/checkout`, `/checkout/success`, `/checkout/cancelled`. Mark them with:

```ts
export const dynamic = 'force-dynamic';
```

## Migrations & seed data

- Keep `src/data/*.ts` as a *seed* source so the database can be bootstrapped
  in development and CI.
- Provide a one-time script (e.g. `npm run db:seed`) that maps the local
  arrays into the schema above.