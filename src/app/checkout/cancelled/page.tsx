import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Checkout cancelled',
  description: 'You cancelled the demo checkout. Your cart is preserved.',
  alternates: { canonical: '/checkout/cancelled' },
  robots: { index: false, follow: false },
};

export default function CheckoutCancelledPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
      <h1 className="font-display text-display-md text-forest-700">Checkout cancelled</h1>
      <p className="mt-3 text-base text-forest-700/80">
        No order was placed. Your cart is still here when you're ready.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/cart"
          className="inline-flex items-center justify-center rounded-full bg-forest-700 px-6 py-2.5 text-sm font-medium text-cream hover:bg-forest-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700 focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
        >
          Back to cart
        </Link>
        <Link
          href="/shop"
          className="text-sm text-forest-700/70 underline-offset-4 hover:underline"
        >
          Continue shopping
        </Link>
      </div>
    </div>
  );
}