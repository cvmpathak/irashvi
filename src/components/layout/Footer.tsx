import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { siteSettings } from '@/data/site-settings';

export function Footer() {
  const { brand, navigation } = siteSettings;
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-forest-700/15 bg-forest-700 text-cream">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.4fr_repeat(3,_1fr)] lg:gap-16 lg:px-8">
        <div>
          <Logo variant="light" large />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-cream/75">
            {brand.tagline} Packaged food ingredients for everyday kitchens and
            the businesses that serve them.
          </p>
          <ul className="mt-6 space-y-1 text-sm text-cream/75">
            <li>{brand.address}</li>
            <li>
              <a
                href={`mailto:${brand.email}`}
                className="underline-offset-4 hover:underline"
              >
                {brand.email}
              </a>
            </li>
            <li>{brand.phone}</li>
          </ul>
        </div>
        {navigation.footer.map((column) => (
          <nav key={column.heading} aria-label={column.heading}>
            <p className="text-xs uppercase tracking-[0.24em] text-cream/60">
              {column.heading}
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-cream/85 underline-offset-4 hover:text-cream hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-4 py-6 text-xs text-cream/60 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <p>
            © {year} {brand.name}. All rights reserved. Demo storefront — products and prices are illustrative.
          </p>
          <ul className="flex flex-wrap gap-4">
            {brand.socials.map((social) => (
              <li key={social.href}>
                <a
                  href={social.href}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="underline-offset-4 hover:underline"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}