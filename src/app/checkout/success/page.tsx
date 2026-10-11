import type { Metadata } from 'next';
import { CheckoutSuccessView } from '@/components/forms/CheckoutSuccessView';

export const metadata: Metadata = {
  title: 'Demo checkout — confirmation',
  description: 'Demonstration-only checkout confirmation.',
  alternates: { canonical: '/checkout/success' },
  robots: { index: false, follow: false },
};

export default function CheckoutSuccessPage() {
  return <CheckoutSuccessView />;
}