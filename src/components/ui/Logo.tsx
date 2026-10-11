import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface LogoProps {
  className?: string;
  variant?: 'dark' | 'light';
  /**
   * `image` renders only the supplied logo artwork (default — the provided
   * logo already contains the full IRASHVI wordmark).
   * `wordmark` falls back to the typographic mark for environments where the
   * image asset is not available.
   */
  variant_mark?: 'image' | 'wordmark';
  /** When true, scales the image up for hero / footer use. */
  large?: boolean;
}

export function Logo({
  className,
  variant = 'dark',
  variant_mark = 'image',
  large = false,
}: LogoProps) {
  const ink = variant === 'light' ? '#F5F0E5' : '#263C2B';

  if (variant_mark === 'wordmark') {
    return (
      <Link
        href="/"
        aria-label="Irashvi — return to home"
        className={cn('inline-flex items-center gap-3 group', className)}
      >
        <span aria-hidden="true" className="relative inline-flex">
          <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
            <path
              d="M4 22 C 10 4, 30 4, 36 18 C 30 34, 12 36, 4 22 Z"
              fill={ink}
              opacity="0.95"
            />
            <path
              d="M8 22 C 14 12, 26 12, 32 18"
              stroke="#E7E8D2"
              strokeWidth="1.2"
              fill="none"
            />
            <line x1="10" y1="24" x2="32" y2="20" stroke="#E7E8D2" strokeWidth="0.8" />
          </svg>
        </span>
        <span className="leading-none">
          <span
            className="block font-display text-xl tracking-[0.32em]"
            style={{ color: ink }}
          >
            IRASHVI
          </span>
          <span
            className="mt-1 hidden text-[10px] tracking-[0.32em] sm:block"
            style={{ color: ink, opacity: 0.7 }}
          >
            GOODNESS · THOUGHTFULLY · PACKED
          </span>
        </span>
      </Link>
    );
  }

  // The supplied logo image already includes the full wordmark and tagline,
  // so we render it as a single block. The square artwork scales nicely in
  // both header and footer contexts.
  const sizeClasses = large ? 'h-16 w-16 sm:h-20 sm:w-20' : 'h-10 w-10 sm:h-12 sm:w-12';

  return (
    <Link
      href="/"
      aria-label="Irashvi — return to home"
      className={cn('inline-flex items-center group', className)}
    >
      <span aria-hidden="true" className="relative inline-flex">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/brand/irashvi-logo.png"
          alt=""
          width={1024}
          height={1024}
          className={cn(
            sizeClasses,
            'rounded-full object-cover transition-transform duration-300 ease-smooth group-hover:scale-[1.03]',
          )}
        />
      </span>
      {large && (
        <span className="sr-only">Irashvi — goodness, thoughtfully packed.</span>
      )}
    </Link>
  );
}