import type { Metadata } from 'next';
import { CheckoutForm } from '@/components/forms/CheckoutForm';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Checkout',
  description:
    'Demo checkout — validates your details and generates a synthetic reference. No payment is taken.',
  alternates: { canonical: '/checkout' },
  robots: { index: false, follow: true },
};

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: 'Cart', href: '/cart' },
          { label: 'Checkout', href: '/checkout' },
        ]}
      />
      <header className="mt-6">
        <p className="text-xs uppercase tracking-[0.24em] text-forest-700/55">Checkout</p>
        <h1 className="mt-2 font-display text-display-md text-forest-700">
          Demonstration checkout
        </h1>
        <p className="mt-2 max-w-xl text-sm text-forest-700/70">
          Validate your details below. A live launch would connect a payment
          provider here; for now, we simulate the order flow end-to-end.
        </p>
      </header>
      <div className="mt-10">
        <CheckoutForm />
      </div>
    </div>
  );
}