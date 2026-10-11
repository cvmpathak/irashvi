import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: '/',
      },
      ...items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: item.label,
        item: item.href,
      })),
    ],
  };
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1 text-xs text-forest-700/60">
        <li className="flex items-center gap-1">
          <Link
            href="/"
            className="inline-flex items-center gap-1 rounded px-1 py-1 hover:text-forest-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700"
          >
            <Home className="h-3 w-3" aria-hidden="true" />
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center gap-1">
            <ChevronRight className="h-3 w-3 text-forest-700/35" aria-hidden="true" />
            {index === items.length - 1 ? (
              <span aria-current="page" className="px-1 py-1 text-forest-700/85">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="rounded px-1 py-1 hover:text-forest-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </nav>
  );
}