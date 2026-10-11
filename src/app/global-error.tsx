'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function GlobalError({
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
    <html lang="en">
      <body style={{ background: '#F5F0E5', color: '#2B2D28', fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ maxWidth: 640, margin: '0 auto', padding: '64px 24px', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 32, marginBottom: 16 }}>
            Something went wrong.
          </h1>
          <p style={{ marginBottom: 24, color: '#2B2D28' }}>
            An unexpected error occurred. Please try again, or head back home.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={reset}
              style={{
                background: '#263C2B',
                color: '#F5F0E5',
                border: 'none',
                padding: '10px 18px',
                borderRadius: 999,
                cursor: 'pointer',
                fontSize: 14,
              }}
            >
              Try again
            </button>
            <Link href="/" style={{ color: '#2B2D28', textDecoration: 'underline' }}>
              Return home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}