import * as React from 'react';
import Link from 'next/link';
import { Product } from '@/data/types';
import { formatINR } from '@/lib/formatting/currency';
import { mediaStorage } from '@/services/media';
import { AddToCartButton } from '@/components/products/AddToCartButton';

export interface ProductCardProps {
  product: Product;
  defaultVariantId?: string;
}

export function ProductCard({ product }: ProductCardProps) {
  const defaultVariant = product.variants[0];
  const minPrice = Math.min(...product.variants.map((v) => v.price));
  const maxPrice = Math.max(...product.variants.map((v) => v.price));
  const samePrice = minPrice === maxPrice;
  const unavailable =
    product.availability === 'out_of_stock' || product.availability === 'coming_soon';

  return (
    <article className="group flex h-full flex-col rounded-2xl-soft border border-forest-700/10 bg-white shadow-soft transition-shadow duration-300 hover:shadow-lift">
      <Link
        href={`/products/${product.slug}`}
        aria-label={`View ${product.name}`}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700 focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
      >
        <div className="relative aspect-square overflow-hidden rounded-t-2xl-soft bg-sand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={mediaStorage.resolve(product.images[0]?.src ?? '')}
            alt={product.images[0]?.alt ?? product.name}
            className="h-full w-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-[1.04]"
            loading="lazy"
          />
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-cream/95 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-forest-700">
            {availabilityLabel(product.availability)}
          </span>
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <Link
          href={`/products/${product.slug}`}
          className="block text-base font-medium text-forest-700 hover:underline"
        >
          {product.name}
        </Link>
        <p className="mt-1 line-clamp-2 text-sm text-forest-700/70">
          {product.shortDescription}
        </p>
        <div className="mt-4 flex items-baseline justify-between">
          <p className="text-sm text-forest-700/80">
            {samePrice
              ? formatINR(minPrice)
              : `${formatINR(minPrice)} – ${formatINR(maxPrice)}`}
          </p>
          {defaultVariant && (
            <p className="text-xs text-forest-700/55">{defaultVariant.packSize}</p>
          )}
        </div>
        <div className="mt-5 flex-1" />
        <AddToCartButton
          product={product}
          variantId={defaultVariant?.id ?? ''}
          disabled={unavailable}
          size="sm"
          className="w-full"
        />
      </div>
    </article>
  );
}

function availabilityLabel(availability: Product['availability']) {
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