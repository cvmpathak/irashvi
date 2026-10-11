'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import type { ProductImage } from '@/data/types';
import { mediaStorage } from '@/services/media';

export interface ProductGalleryProps {
  images: ProductImage[];
}

export function ProductGallery({ images }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const active = images[activeIndex] ?? images[0];

  if (!active) return null;

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-square overflow-hidden rounded-2xl-soft border border-forest-700/10 bg-sand">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={mediaStorage.resolve(active.src)}
          alt={active.alt}
          className="h-full w-full object-cover transition-opacity duration-500 ease-smooth"
          width={active.width}
          height={active.height}
        />
      </div>
      {images.length > 1 && (
        <ul className="flex gap-2" role="tablist" aria-label="Product images">
          {images.map((image, index) => {
            const isActive = index === activeIndex;
            return (
              <li key={`${image.src}-${index}`}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Show image ${index + 1}`}
                  className={cn(
                    'relative h-16 w-16 overflow-hidden rounded-xl border transition-all duration-300 ease-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700',
                    isActive
                      ? 'border-forest-700 ring-2 ring-forest-700/40'
                      : 'border-forest-700/15 hover:border-forest-700/40',
                  )}
                  onClick={() => setActiveIndex(index)}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={mediaStorage.resolve(image.src)}
                    alt=""
                    className="h-full w-full object-cover"
                    aria-hidden="true"
                  />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}