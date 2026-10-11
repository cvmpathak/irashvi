import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { siteSettings } from '@/data/site-settings';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about the Irashvi demo storefront.',
  alternates: { canonical: '/faq' },
};

export default function FAQPage() {
  const { faqs } = siteSettings;
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: 'FAQ', href: '/faq' }]} />
      <header className="mt-8">
        <p className="text-xs uppercase tracking-[0.24em] text-forest-700/55">Help</p>
        <h1 className="mt-2 font-display text-display-md text-forest-700 text-balance">
          Frequently asked questions.
        </h1>
        <p className="mt-3 max-w-reading text-base text-forest-700/80">
          The storefront you are using is a demonstration. These answers cover
          the most common questions about how it behaves.
        </p>
      </header>
      <div className="mt-10 divide-y divide-forest-700/10 rounded-2xl-soft border border-forest-700/10 bg-white">
        {faqs.map((faq) => (
          <details key={faq.id} className="group px-6 py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium text-forest-700">
              <span>{faq.question}</span>
              <span
                aria-hidden="true"
                className="grid h-6 w-6 place-items-center rounded-full border border-forest-700/20 text-xs text-forest-700 transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-forest-700/80">{faq.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
}