import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { LinkButton } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Our Story',
  description:
    'The story behind Irashvi — a small range of dried vegetables, spices, and cooking mixes, made with intention.',
  alternates: { canonical: '/our-story' },
};

export default function OurStoryPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: 'Our Story', href: '/our-story' }]} />
      <header className="mt-8">
        <p className="text-xs uppercase tracking-[0.24em] text-forest-700/55">Our story</p>
        <h1 className="mt-2 font-display text-display-lg text-forest-700 text-balance">
          A small range, made with intention.
        </h1>
        <p className="mt-4 text-base leading-relaxed text-forest-700/80">
          Irashvi began with a simple idea: that the everyday staples in our
          kitchens deserve a quiet kind of care. We work with growers, millers,
          and small processors who respect their ingredients, and we package
          them in plain, well-sealed formats that keep them at their best.
        </p>
      </header>

      <section className="mt-10 space-y-6 text-base leading-relaxed text-forest-700/80">
        <p>
          The name <em>Irashvi</em> is drawn from a quietly botanical root —
          close to the word for growth and renewal — and that's the way we
          think about ingredients: things that are renewed by being looked
          after.
        </p>
        <p>
          Our range is short on purpose. We choose dried vegetables, vegetable
          powders, spices, and cooking mixes that earn their place on the
          shelf — staples you can rely on, blended and packed in formats that
          are easy to store, easy to read, and easy to cook with.
        </p>
        <h2 className="font-display text-2xl text-forest-700">What we value</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>Honesty about what's in the pack.</li>
          <li>Plain packaging that protects what's inside.</li>
          <li>A small list, kept well.</li>
          <li>Respect for the people who grow, mill, and pack.</li>
        </ul>
        <h2 className="font-display text-2xl text-forest-700">What's next</h2>
        <p>
          We will continue to add to the catalogue slowly — only when we have
          something we trust. In the meantime, our recipes and journal are
          there to help you make the most of what's already on the shelf.
        </p>
      </section>

      <div className="mt-12 flex flex-wrap items-center gap-3 border-t border-forest-700/10 pt-8">
        <LinkButton href="/shop" variant="primary" size="md">
          Explore the catalogue
        </LinkButton>
        <Link
          href="/recipes"
          className="text-sm text-forest-700/70 underline-offset-4 hover:underline"
        >
          See recipes
        </Link>
      </div>
    </div>
  );
}