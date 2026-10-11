'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Product } from '@/data/types';
import { ProductCard } from '@/components/products/ProductCard';

export interface FeaturedProductsProps {
  products: Product[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <section
      id="featured"
      aria-labelledby="featured-heading"
      className="bg-sand/40 py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-forest-700/55">
              Featured products
            </p>
            <h2
              id="featured-heading"
              className="mt-2 font-display text-display-md text-forest-700 text-balance"
            >
              A handful of pantry favourites.
            </h2>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1 text-sm text-forest-700/80 underline-offset-4 hover:underline"
          >
            See all
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <li key={product.id} className="h-full">
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}