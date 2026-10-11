'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Category } from '@/data/types';
import { mediaStorage } from '@/services/media';

export interface CategoryShowcaseProps {
  categories: Category[];
}

export function CategoryShowcase({ categories }: CategoryShowcaseProps) {
  return (
    <section
      aria-labelledby="categories-heading"
      className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mb-10 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-forest-700/55">Shop by category</p>
          <h2
            id="categories-heading"
            className="mt-2 font-display text-display-md text-forest-700 text-balance"
          >
            Six corners of a well-kept pantry.
          </h2>
        </div>
        <Link
          href="/shop"
          className="inline-flex items-center gap-1 text-sm text-forest-700/80 underline-offset-4 hover:underline"
        >
          View all products
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <li key={category.id}>
            <Link
              href={`/categories/${category.slug}`}
              aria-label={`Browse ${category.name}`}
              className="group block overflow-hidden rounded-2xl-soft border border-forest-700/10 bg-white shadow-soft transition-all duration-300 hover:shadow-lift hover-scale-img focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700 focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
            >
              <div className="relative aspect-[3/2] overflow-hidden bg-sand">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={mediaStorage.resolve(category.image.src)}
                  alt={category.image.alt}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <span className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-cream/90 text-forest-700 transition-transform duration-300 group-hover:rotate-12">
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg text-forest-700">{category.name}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-forest-700/70">
                  {category.description}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}