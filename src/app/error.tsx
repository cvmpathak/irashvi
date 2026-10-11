'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6 lg:px-8">
      <p className="text-xs uppercase tracking-[0.24em] text-forest-700/55">Error</p>
      <h1 className="mt-2 font-display text-display-md text-forest-700">
        Something went wrong.
      </h1>
      <p className="mt-3 text-base text-forest-700/75">
        We hit an unexpected issue rendering this page. You can try again, or
        head somewhere else.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center justify-center rounded-full bg-forest-700 px-6 py-2.5 text-sm font-medium text-cream hover:bg-forest-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700 focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
        >
          Try again
        </button>
        <Link
          href="/"
          className="text-sm text-forest-700/70 underline-offset-4 hover:underline"
        >
          Return home
        </Link>
      </div>
    </div>
  );
}