'use client';

import * as React from 'react';
import { Minus, Plus, ShieldCheck, Truck } from 'lucide-react';
import type { Product, ProductVariant } from '@/data/types';
import { ProductGallery } from '@/components/products/ProductGallery';
import { AddToCartButton } from '@/components/products/AddToCartButton';
import { formatINR } from '@/lib/formatting/currency';
import { cn } from '@/lib/utils';

export interface ProductDetailClientProps {
  product: Product;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [variantId, setVariantId] = React.useState<string>(
    product.variants[0]?.id ?? '',
  );
  const [quantity, setQuantity] = React.useState(1);

  const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0];

  if (!variant) return null;

  const unavailable =
    variant.availability === 'out_of_stock' || variant.availability === 'coming_soon';

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
      <ProductGallery images={product.images} />
      <div className="flex flex-col">
        <p className="text-xs uppercase tracking-[0.24em] text-forest-700/55">
          {availabilityLabel(variant.availability)}
        </p>
        <h1 className="mt-2 font-display text-display-lg text-forest-700">{product.name}</h1>
        <p className="mt-3 max-w-reading text-base leading-relaxed text-forest-700/80">
          {product.shortDescription}
        </p>
        <p className="mt-4 font-display text-3xl text-forest-700">{formatINR(variant.price)}</p>
        <p className="mt-1 text-xs text-forest-700/60">SKU {variant.sku} · {variant.packSize}</p>

        <div className="mt-6">
          <p className="text-xs uppercase tracking-[0.2em] text-forest-700/55">Pack size</p>
          <ul className="mt-2 flex flex-wrap gap-2" role="radiogroup" aria-label="Pack size">
            {product.variants.map((v) => {
              const active = v.id === variantId;
              return (
                <li key={v.id}>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setVariantId(v.id)}
                    className={cn(
                      'rounded-full border px-4 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700 focus-visible:ring-offset-2 focus-visible:ring-offset-cream',
                      active
                        ? 'border-forest-700 bg-forest-700 text-cream'
                        : 'border-forest-700/25 text-forest-700 hover:border-forest-700/50',
                    )}
                  >
                    <span className="font-medium">{v.packSize}</span>
                    <span className="ml-2 text-xs opacity-75">{formatINR(v.price)}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <p className="text-xs uppercase tracking-[0.2em] text-forest-700/55">Quantity</p>
          <div className="inline-flex items-center rounded-full border border-forest-700/15">
            <button
              type="button"
              aria-label="Decrease quantity"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="grid h-10 w-10 place-items-center rounded-full text-forest-700/80 hover:bg-forest-700/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700 disabled:opacity-40"
              disabled={quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="grid w-10 place-items-center text-sm font-medium text-forest-700">
              {quantity}
            </span>
            <button
              type="button"
              aria-label="Increase quantity"
              onClick={() => setQuantity((q) => Math.min(99, q + 1))}
              className="grid h-10 w-10 place-items-center rounded-full text-forest-700/80 hover:bg-forest-700/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700 disabled:opacity-40"
              disabled={quantity >= 99}
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <AddToCartButton
            product={product}
            variantId={variant.id}
            quantity={quantity}
            size="lg"
            disabled={unavailable}
          />
          <p className="text-xs text-forest-700/55">Estimated total {formatINR(variant.price * quantity)}</p>
        </div>

        <p className="mt-6 max-w-reading text-sm leading-relaxed text-forest-700/75">
          {product.description}
        </p>

        <dl className="mt-8 grid gap-4 border-t border-forest-700/10 pt-6 sm:grid-cols-2">
          {product.ingredients && (
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-forest-700/55">Ingredients</dt>
              <dd className="mt-1 text-sm text-forest-700/85">{product.ingredients.join(', ')}.</dd>
            </div>
          )}
          {product.netQuantity && (
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-forest-700/55">Net quantity</dt>
              <dd className="mt-1 text-sm text-forest-700/85">{product.netQuantity}</dd>
            </div>
          )}
          {product.usageInstructions && (
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-forest-700/55">Usage</dt>
              <dd className="mt-1 text-sm text-forest-700/85">{product.usageInstructions}</dd>
            </div>
          )}
          {product.storageInstructions && (
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-forest-700/55">Storage</dt>
              <dd className="mt-1 text-sm text-forest-700/85">{product.storageInstructions}</dd>
            </div>
          )}
          {product.shelfLife && (
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-forest-700/55">Shelf life</dt>
              <dd className="mt-1 text-sm text-forest-700/85">{product.shelfLife}</dd>
            </div>
          )}
        </dl>

        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          <li className="flex items-start gap-3 rounded-xl border border-forest-700/10 bg-sand/40 p-3 text-sm text-forest-700/80">
            <ShieldCheck className="mt-0.5 h-4 w-4 text-forest-700/70" aria-hidden="true" />
            <p>Plain, well-sealed packaging that protects freshness.</p>
          </li>
          <li className="flex items-start gap-3 rounded-xl border border-forest-700/10 bg-sand/40 p-3 text-sm text-forest-700/80">
            <Truck className="mt-0.5 h-4 w-4 text-forest-700/70" aria-hidden="true" />
            <p>Estimated delivery calculated at checkout (demo).</p>
          </li>
        </ul>
      </div>
    </div>
  );
}

function availabilityLabel(availability: ProductVariant['availability']) {
  switch (availability) {
    case 'in_stock':
      return 'In stock';
    case 'low_stock':
      return 'Low stock';
    case 'out_of_stock':
      return 'Sold out';
    case 'coming_soon':
      return 'Coming soon';
    default:
      return '';
  }
}