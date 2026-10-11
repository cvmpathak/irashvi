import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { journalBySlug, journalEntries } from '@/data/journal';
import { formatDate } from '@/lib/formatting/date';
import { mediaStorage } from '@/services/media';

interface JournalPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return journalEntries.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: JournalPageProps): Promise<Metadata> {
  const entry = journalBySlug[params.slug];
  if (!entry) return { title: 'Journal entry not found' };
  return {
    title: entry.title,
    description: entry.summary,
    alternates: { canonical: `/journal/${entry.slug}` },
  };
}

export default function JournalEntryPage({ params }: JournalPageProps) {
  const entry = journalBySlug[params.slug];
  if (!entry) notFound();
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: 'Journal', href: '/journal' },
          { label: entry.title, href: `/journal/${entry.slug}` },
        ]}
      />
      <header className="mt-8">
        <p className="text-xs uppercase tracking-[0.24em] text-forest-700/55">
          {entry.tag} · {formatDate(entry.createdAt)} · {entry.readingMinutes} min read
        </p>
        <h1 className="mt-2 font-display text-display-md text-forest-700 text-balance">
          {entry.title}
        </h1>
        <p className="mt-3 text-base text-forest-700/80">{entry.summary}</p>
      </header>
      <div className="mt-8 aspect-[3/2] overflow-hidden rounded-2xl-soft border border-forest-700/10 bg-sand">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={mediaStorage.resolve(entry.image.src)}
          alt={entry.image.alt}
          className="h-full w-full object-cover"
        />
      </div>
      <p className="mt-10 max-w-reading text-base leading-relaxed text-forest-700/85">
        {entry.body}
      </p>
      <div className="mt-12 flex flex-wrap items-center gap-3 border-t border-forest-700/10 pt-8">
        <Link
          href="/journal"
          className="text-sm text-forest-700/70 underline-offset-4 hover:underline"
        >
          ← Back to journal
        </Link>
      </div>
    </article>
  );
}