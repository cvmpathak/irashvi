import Link from 'next/link';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { LinkButton } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: 'Not found', href: '/not-found' }]} />
      <p className="mt-8 text-xs uppercase tracking-[0.24em] text-forest-700/55">404</p>
      <h1 className="mt-2 font-display text-display-lg text-forest-700">
        We couldn't find that page.
      </h1>
      <p className="mt-3 text-base text-forest-700/75">
        The link may have changed, or the page may no longer exist. Try one of
        the routes below.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <LinkButton href="/" variant="primary" size="md">
          Return home
        </LinkButton>
        <Link
          href="/shop"
          className="text-sm text-forest-700/70 underline-offset-4 hover:underline"
        >
          Browse products
        </Link>
      </div>
    </div>
  );
}