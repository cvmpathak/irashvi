import type { Metadata } from 'next';
import { WholesaleForm } from '@/components/forms/WholesaleForm';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { categories } from '@/data/categories';

export const metadata: Metadata = {
  title: 'Wholesale',
  description:
    'Wholesale enquiries for restaurants, retailers, and distributors. Demonstration form — no submission is sent.',
  alternates: { canonical: '/wholesale' },
};

const processSteps = [
  {
    title: 'Send an enquiry',
    body: 'Share a few details about your business and the products you are considering.',
  },
  {
    title: 'Receive product & pricing details',
    body: 'We respond with pack sizes, indicative pricing, and minimum order quantities.',
  },
  {
    title: 'Confirm & ship',
    body: 'Once an order is confirmed, we coordinate dispatch to your delivery location.',
  },
];

const faqs = [
  {
    q: 'What pack sizes are available?',
    a: 'Most products are available in 100 g, 250 g, 500 g, 1 kg and 2 kg formats. Custom pack sizes can be arranged on request.',
  },
  {
    q: 'Do you ship pan-India?',
    a: 'Yes — wholesale shipping is available across India. International shipping can be discussed for qualifying orders.',
  },
  {
    q: 'Is there a minimum order quantity?',
    a: 'MOQs vary by product and pack format. Most bulk formats start at 5 kg per SKU.',
  },
  {
    q: 'Do you offer private labelling?',
    a: 'For qualifying volumes, we can discuss private label and white-label arrangements.',
  },
];

export default function WholesalePage() {
  return (
    <div>
      <section className="bg-forest-700 text-cream">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-12 lg:px-8">
          <div>
            <BreadcrumbsDark items={[{ label: 'Wholesale', href: '/wholesale' }]} />
            <p className="mt-6 text-xs uppercase tracking-[0.24em] text-cream/65">Wholesale</p>
            <h1 className="mt-2 font-display text-display-lg text-cream text-balance">
              Bulk ingredients for kitchens that feed many.
            </h1>
            <p className="mt-4 max-w-reading text-base text-cream/80">
              Restaurants, retailers, and distributors — explore our bulk
              formats and request product information. A live build would
              route enquiries through a configured form service or backend
              endpoint; this page is a demonstration flow.
            </p>
          </div>
          <div className="rounded-2xl-soft border border-cream/15 bg-cream/5 p-6 backdrop-blur-sm">
            <p className="font-display text-lg text-cream">Indicative MOQs</p>
            <ul className="mt-3 space-y-2 text-sm text-cream/85">
              <li className="flex justify-between"><span>Bulk dried vegetables</span><span>5 kg+</span></li>
              <li className="flex justify-between"><span>Bulk powders</span><span>5 kg+</span></li>
              <li className="flex justify-between"><span>Bulk spices</span><span>5 kg+</span></li>
              <li className="flex justify-between"><span>Cooking mixes</span><span>10 kg+</span></li>
            </ul>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="font-display text-display-md text-forest-700">Product categories we cover</h2>
        <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <li
              key={category.id}
              className="rounded-2xl-soft border border-forest-700/10 bg-white p-5 shadow-soft"
            >
              <p className="font-display text-base text-forest-700">{category.name}</p>
              <p className="mt-1 text-sm text-forest-700/70">{category.description}</p>
            </li>
          ))}
        </ul>
      </section>
      <section className="bg-sand/40">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="font-display text-display-md text-forest-700">How a wholesale enquiry works</h2>
          <ol className="mt-6 grid gap-5 sm:grid-cols-3">
            {processSteps.map((step, index) => (
              <li key={step.title} className="rounded-2xl-soft border border-forest-700/10 bg-white p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-forest-700/55">Step {index + 1}</p>
                <p className="mt-2 font-display text-base text-forest-700">{step.title}</p>
                <p className="mt-1 text-sm text-forest-700/75">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <h2 className="font-display text-display-md text-forest-700">Wholesale enquiry</h2>
            <p className="mt-3 max-w-reading text-sm text-forest-700/75">
              Fill in the form below to request product information. This is a
              demonstration — the form validates your details and shows a
              confirmation state, but your enquiry is not transmitted anywhere.
            </p>
            <div className="mt-6">
              <WholesaleForm />
            </div>
          </div>
          <div>
            <h2 className="font-display text-display-md text-forest-700">Wholesale FAQ</h2>
            <div className="mt-6 divide-y divide-forest-700/10 rounded-2xl-soft border border-forest-700/10 bg-white">
              {faqs.map((item) => (
                <details key={item.q} className="group px-6 py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium text-forest-700">
                    <span>{item.q}</span>
                    <span aria-hidden="true" className="grid h-6 w-6 place-items-center rounded-full border border-forest-700/20 text-xs transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-forest-700/75">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function BreadcrumbsDark({ items }: { items: { label: string; href: string }[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-1 text-xs text-cream/65">
        <li>
          <a href="/" className="hover:text-cream">Home</a>
        </li>
        {items.map((item) => (
          <li key={item.href} className="flex items-center gap-1">
            <span aria-hidden="true">/</span>
            <span className="text-cream/85">{item.label}</span>
          </li>
        ))}
      </ol>
    </nav>
  );
}