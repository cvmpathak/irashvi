import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export interface PolicyPageProps {
  title: string;
  description: string;
  canonical: string;
  effectiveDate?: string;
  intro?: string;
  sections: { heading: string; body: string[] }[];
  breadcrumbs: { label: string; href: string }[];
}

export function PolicyPage({
  title,
  description,
  canonical,
  effectiveDate,
  intro,
  sections,
  breadcrumbs,
}: PolicyPageProps) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <Breadcrumbs items={breadcrumbs} />
      <header className="mt-8">
        <p className="text-xs uppercase tracking-[0.24em] text-forest-700/55">Policies</p>
        <h1 className="mt-2 font-display text-display-md text-forest-700 text-balance">
          {title}
        </h1>
        {effectiveDate && (
          <p className="mt-3 text-xs uppercase tracking-[0.2em] text-forest-700/55">
            Effective {effectiveDate}
          </p>
        )}
        {intro && (
          <p className="mt-3 max-w-reading text-base text-forest-700/80">{intro}</p>
        )}
      </header>
      <div className="prose prose-sm mt-10 max-w-reading text-forest-700/85">
        {sections.map((section) => (
          <section key={section.heading} className="mt-8 first:mt-0">
            <h2 className="font-display text-xl text-forest-700">{section.heading}</h2>
            {section.body.map((p, i) => (
              <p key={i} className="mt-3 text-base leading-relaxed text-forest-700/85">
                {p}
              </p>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}

export function buildMetadata(
  title: string,
  description: string,
  canonical: string,
): Metadata {
  return {
    title,
    description,
    alternates: { canonical },
  };
}