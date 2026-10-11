import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { siteSettings } from '@/data/site-settings';
import { Mail, MapPin, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Irashvi. Demo contact details are clearly identified as placeholder information.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  const { brand } = siteSettings;
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: 'Contact', href: '/contact' }]} />
      <header className="mt-8">
        <p className="text-xs uppercase tracking-[0.24em] text-forest-700/55">Contact</p>
        <h1 className="mt-2 font-display text-display-md text-forest-700 text-balance">
          Get in touch.
        </h1>
        <p className="mt-3 max-w-reading text-base text-forest-700/80">
          We are happy to hear from home cooks, retailers, and restaurants. The
          contact details below are placeholder values for this demo; replace
          them with your real channels before launch.
        </p>
      </header>
      <ul className="mt-10 grid gap-4 sm:grid-cols-3">
        <li className="rounded-2xl-soft border border-forest-700/10 bg-white p-5">
          <Mail className="h-5 w-5 text-forest-700" aria-hidden="true" />
          <p className="mt-3 text-xs uppercase tracking-[0.2em] text-forest-700/55">Email</p>
          <a
            href={`mailto:${brand.email}`}
            className="mt-1 block text-sm font-medium text-forest-700 underline-offset-4 hover:underline"
          >
            {brand.email}
          </a>
        </li>
        <li className="rounded-2xl-soft border border-forest-700/10 bg-white p-5">
          <Phone className="h-5 w-5 text-forest-700" aria-hidden="true" />
          <p className="mt-3 text-xs uppercase tracking-[0.2em] text-forest-700/55">Phone</p>
          <p className="mt-1 text-sm font-medium text-forest-700">{brand.phone}</p>
        </li>
        <li className="rounded-2xl-soft border border-forest-700/10 bg-white p-5">
          <MapPin className="h-5 w-5 text-forest-700" aria-hidden="true" />
          <p className="mt-3 text-xs uppercase tracking-[0.2em] text-forest-700/55">Address</p>
          <p className="mt-1 text-sm font-medium text-forest-700">{brand.address}</p>
        </li>
      </ul>
      <p className="mt-8 max-w-reading rounded-2xl-soft border border-forest-700/10 bg-sand/50 p-5 text-sm text-forest-700/80">
        For wholesale enquiries, please use the{' '}
        <a
          href="/wholesale"
          className="font-medium text-forest-700 underline-offset-4 hover:underline"
        >
          wholesale enquiry form
        </a>{' '}
        — it includes the fields our team needs to respond well.
      </p>
    </div>
  );
}