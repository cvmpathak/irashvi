'use client';

import * as React from 'react';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { formatINR } from '@/lib/formatting/currency';
import { safeJSONParse } from '@/lib/utils';

interface Confirmation {
  referenceId: string;
  estimatedTotal: number;
  fullName: string;
  email: string;
}

export function CheckoutSuccessView() {
  const [confirmation, setConfirmation] = React.useState<Confirmation | null>(null);
  React.useEffect(() => {
    const raw = window.sessionStorage.getItem('irashvi.lastCheckout');
    const parsed = safeJSONParse<Confirmation | null>(raw, null);
    if (parsed) setConfirmation(parsed);
  }, []);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-sage-200 text-forest-700">
        <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
      </div>
      <h1 className="mt-6 font-display text-display-md text-forest-700">
        Demo order received
      </h1>
      <p className="mt-3 text-base text-forest-700/80">
        We have generated a synthetic reference for this demonstration. No
        payment has been taken, no order has been created, and no personal
        details have been transmitted.
      </p>
      {confirmation ? (
        <dl className="mx-auto mt-8 max-w-md rounded-2xl-soft border border-forest-700/10 bg-white p-6 text-left">
          <div className="flex justify-between text-sm">
            <dt className="text-forest-700/60">Reference</dt>
            <dd className="font-mono text-forest-700">{confirmation.referenceId}</dd>
          </div>
          <div className="mt-2 flex justify-between text-sm">
            <dt className="text-forest-700/60">Name</dt>
            <dd className="text-forest-700">{confirmation.fullName}</dd>
          </div>
          <div className="mt-2 flex justify-between text-sm">
            <dt className="text-forest-700/60">Email</dt>
            <dd className="text-forest-700">{confirmation.email}</dd>
          </div>
          <div className="mt-2 flex justify-between border-t border-forest-700/10 pt-2 text-sm">
            <dt className="text-forest-700/60">Estimated total</dt>
            <dd className="text-forest-700">{formatINR(confirmation.estimatedTotal)}</dd>
          </div>
        </dl>
      ) : (
        <p className="mt-6 text-sm text-forest-700/60">
          We couldn't find a recent checkout. Place a demo order to see your reference here.
        </p>
      )}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/shop"
          className="inline-flex items-center justify-center rounded-full bg-forest-700 px-6 py-2.5 text-sm font-medium text-cream hover:bg-forest-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700 focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
        >
          Continue shopping
        </Link>
        <Link
          href="/"
          className="text-sm text-forest-700/70 underline-offset-4 hover:underline"
        >
          Return to home
        </Link>
      </div>
    </div>
  );
}