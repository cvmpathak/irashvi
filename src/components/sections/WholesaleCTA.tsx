'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowRight, Building2, Sparkles, Truck, Users } from 'lucide-react';
import { LinkButton } from '@/components/ui/Button';

export function WholesaleCTA() {
  return (
    <section
      aria-labelledby="wholesale-heading"
      className="bg-forest-700 text-cream"
    >
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-cream/65">
              For businesses
            </p>
            <h2
              id="wholesale-heading"
              className="mt-2 font-display text-display-lg text-cream text-balance"
            >
              Bulk ingredients for kitchens that feed many.
            </h2>
            <p className="mt-6 max-w-reading text-base leading-relaxed text-cream/80">
              Restaurants, retailers, and distributors can explore our bulk
              formats and request product information through our wholesale
              enquiry page. Larger pack sizes are designed for predictable cost,
              consistent quality, and straightforward storage.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <LinkButton
                href="/wholesale"
                size="lg"
                className="bg-cream !text-forest-700 hover:bg-cream/40"
              >
                Wholesale enquiries
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </LinkButton>
              <Link
                href="/categories/bulk-ingredients"
                className="text-sm text-cream/80 underline-offset-4 hover:underline"
              >
                Browse bulk ingredients
              </Link>
            </div>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            <WholesalePoint
              icon={<Building2 className="h-5 w-5" aria-hidden="true" />}
              title="Restaurants"
              body="Consistent pack sizes for predictable costing and reliable plating."
            />
            <WholesalePoint
              icon={<Users className="h-5 w-5" aria-hidden="true" />}
              title="Retailers"
              body="Short, attractive SKUs that fit the way you merchandise."
            />
            <WholesalePoint
              icon={<Truck className="h-5 w-5" aria-hidden="true" />}
              title="Distributors"
              body="Standardised packaging, multi-pack options, clear labelling."
            />
            <WholesalePoint
              icon={<Sparkles className="h-5 w-5" aria-hidden="true" />}
              title="Caterers"
              body="Bulk ingredients that hold their flavour through long prep days."
            />
          </ul>
        </div>
      </div>
    </section>
  );
}

function WholesalePoint({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <li className="rounded-2xl border border-cream/15 bg-cream/5 p-5 backdrop-blur-sm">
      <div className="grid h-9 w-9 place-items-center rounded-full bg-cream/15 text-cream">
        {icon}
      </div>
      <p className="mt-4 font-display text-lg">{title}</p>
      <p className="mt-1 text-sm text-cream/75">{body}</p>
    </li>
  );
}