import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { journalEntries } from '@/data/journal';
import { formatDate } from '@/lib/formatting/date';
import { mediaStorage } from '@/services/media';

export const metadata: Metadata = {
  title: 'Journal',
  description:
    'Notes from the Irashvi pantry — drying, sourcing, planning, and cooking in small batches.',
  alternates: { canonical: '/journal' },
};

export default function JournalPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: 'Journal', href: '/journal' }]} />
      <header className="mt-6 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.24em] text-forest-700/55">Journal</p>
        <h1 className="mt-2 font-display text-display-lg text-forest-700 text-balance">
          Notes from the pantry.
        </h1>
        <p className="mt-3 text-base text-forest-700/75">
          Short reads on drying, sourcing, planning, and cooking — written for
          people who keep a kitchen they trust.
        </p>
      </header>
      <ul className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
        {journalEntries.map((entry) => (
          <li key={entry.id}>
            <Link
              href={`/journal/${entry.slug}`}
              className="group block overflow-hidden rounded-2xl-soft border border-forest-700/10 bg-white shadow-soft transition-shadow hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700 focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
            >
              <div className="relative aspect-[3/2] overflow-hidden bg-sand">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={mediaStorage.resolve(entry.image.src)}
                  alt={entry.image.alt}
                  className="h-full w-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-[1.04]"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-forest-700/55">
                  {entry.tag} · {formatDate(entry.createdAt)}
                </p>
                <h2 className="mt-2 font-display text-lg text-forest-700">{entry.title}</h2>
                <p className="mt-1 line-clamp-2 text-sm text-forest-700/70">{entry.summary}</p>
                <p className="mt-3 text-xs text-forest-700/55">{entry.readingMinutes} min read</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}