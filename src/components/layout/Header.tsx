'use client';

import * as React from 'react';
import Link from 'next/link';
import { Menu, Search, ShoppingBag, X } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { LinkButton } from '@/components/ui/Button';
import { useCart } from '@/features/cart/cart-context';
import { siteSettings } from '@/data/site-settings';
import { cn } from '@/lib/utils';

export function Header() {
  const { totals, setOpen } = useCart();
  const [scrolled, setScrolled] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  React.useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-40 border-b transition-colors duration-300 ease-smooth',
          scrolled
            ? 'border-forest-700/15 bg-cream/90 backdrop-blur supports-[backdrop-filter]:bg-cream/80'
            : 'border-transparent bg-cream',
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 lg:gap-8">
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              className="grid h-10 w-10 place-items-center rounded-full text-forest-700 hover:bg-forest-700/10 lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
            <Logo />
          </div>
          <nav
            aria-label="Primary"
            className="hidden items-center gap-1 lg:flex"
          >
            {siteSettings.navigation.primary.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-2 text-sm font-medium text-forest-700/85 transition-colors hover:bg-forest-700/5 hover:text-forest-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Search"
              aria-expanded={searchOpen}
              className="grid h-10 w-10 place-items-center rounded-full text-forest-700 hover:bg-forest-700/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700"
              onClick={() => setSearchOpen((v) => !v)}
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label={`Cart (${totals.itemCount} item${totals.itemCount === 1 ? '' : 's'})`}
              onClick={() => setOpen(true)}
              className="relative grid h-10 w-10 place-items-center rounded-full text-forest-700 hover:bg-forest-700/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700"
            >
              <ShoppingBag className="h-5 w-5" />
              {totals.itemCount > 0 && (
                <span
                  aria-hidden="true"
                  className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-terracotta-400 px-1 text-[10px] font-medium leading-none text-cream"
                >
                  {totals.itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
        {searchOpen && (
          <div className="border-t border-forest-700/10 bg-cream">
            <SearchPanel onClose={() => setSearchOpen(false)} />
          </div>
        )}
      </header>
      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}

function SearchPanel({ onClose }: { onClose: () => void }) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    inputRef.current?.focus();
  }, []);
  return (
    <form
      role="search"
      action="/search"
      className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 sm:px-6 lg:px-8"
    >
      <Search className="h-4 w-4 text-forest-700/60" aria-hidden="true" />
      <input
        ref={inputRef}
        type="search"
        name="q"
        placeholder="Search dried vegetables, spices, mixes…"
        aria-label="Search products"
        className="w-full bg-transparent py-2 text-sm text-forest-700 placeholder:text-forest-700/40 focus:outline-none"
      />
      <button
        type="button"
        onClick={onClose}
        className="rounded-full p-1 text-forest-700/60 hover:bg-forest-700/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700"
        aria-label="Close search"
      >
        <X className="h-4 w-4" />
      </button>
    </form>
  );
}

function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div
      className={cn(
        'fixed inset-0 z-50 transition-opacity duration-300 lg:hidden',
        open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
      )}
      aria-hidden={!open}
    >
      <div
        className="absolute inset-0 bg-charcoal/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={cn(
          'absolute inset-y-0 left-0 flex w-[88%] max-w-sm flex-col bg-cream shadow-lift transition-transform duration-300 ease-smooth',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex items-center justify-between border-b border-forest-700/10 px-4 py-3">
          <Logo />
          <button
            type="button"
            aria-label="Close menu"
            className="grid h-10 w-10 place-items-center rounded-full text-forest-700 hover:bg-forest-700/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav aria-label="Mobile primary" className="flex-1 overflow-y-auto px-4 py-4">
          <ul className="space-y-1">
            {siteSettings.navigation.primary.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="block rounded-xl px-3 py-3 text-base font-medium text-forest-700 hover:bg-forest-700/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 border-t border-forest-700/10 pt-4">
            <p className="px-3 text-xs uppercase tracking-[0.2em] text-forest-700/60">Help</p>
            <ul className="mt-2 space-y-1">
              <li>
                <Link
                  href="/contact"
                  onClick={onClose}
                  className="block rounded-xl px-3 py-2 text-sm text-forest-700/80 hover:bg-forest-700/5"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  onClick={onClose}
                  className="block rounded-xl px-3 py-2 text-sm text-forest-700/80 hover:bg-forest-700/5"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <div className="border-t border-forest-700/10 p-4">
          <LinkButton
            href="/wholesale"
            variant="primary"
            size="md"
            className="w-full"
          >
            Wholesale enquiries
          </LinkButton>
        </div>
      </aside>
    </div>
  );
}