import type { Metadata } from 'next';
import { CartView } from '@/components/cart/CartView';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Cart',
  description: 'Review the items in your cart.',
  alternates: { canonical: '/cart' },
  robots: { index: false, follow: true },
};

export default function CartPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: 'Cart', href: '/cart' }]} />
      <header className="mt-6">
        <p className="text-xs uppercase tracking-[0.24em] text-forest-700/55">Cart</p>
        <h1 className="mt-2 font-display text-display-md text-forest-700">Your cart</h1>
        <p className="mt-2 max-w-xl text-sm text-forest-700/70">
          Cart items are stored locally on this device (localStorage). No order
          is created until you submit the demo checkout.
        </p>
      </header>
      <CartView />
    </div>
  );
}