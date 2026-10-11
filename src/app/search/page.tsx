import type { Metadata } from 'next';
import Link from 'next/link';
import { productRepository } from '@/services/catalogue/local-product-repository';
import { parseCatalogueParams } from '@/features/catalogue/parse-catalogue-params';
import { CatalogueClient } from '@/components/products/CatalogueClient';
import { categoryRepository } from '@/services/catalogue/local-category-repository';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

interface SearchPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search the Irashvi catalogue by name, description, or category.',
  alternates: { canonical: '/search' },
  robots: { index: false, follow: true },
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { filter, sort } = parseCatalogueParams(searchParams);
  const query = filter.query ?? '';
  const [results, categories] = await Promise.all([
    productRepository.listProducts({ filter, sort }),
    categoryRepository.getAllCategories(),
  ]);

  // Suggestions are based on simple substring matching across names.
  const suggestions = query
    ? Array.from(
        new Set(
          results
            .slice(0, 5)
            .flatMap((p) => p.name.split(/\s+/))
            .filter((w) => w.toLowerCase().includes(query.toLowerCase())),
        ),
      ).slice(0, 4)
    : [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: 'Search', href: '/search' }]} />
      <header className="mt-6">
        <p className="text-xs uppercase tracking-[0.24em] text-forest-700/55">Search</p>
        <h1 className="mt-2 font-display text-display-md text-forest-700 text-balance">
          {query ? `Results for “${query}”` : 'Search the catalogue'}
        </h1>
        <p className="mt-3 max-w-xl text-base text-forest-700/75">
          Search across product names, descriptions, and categories. Use the
          filters to narrow down by category, pack size, and price.
        </p>
      </header>
      <form
        action="/search"
        role="search"
        className="mt-6 flex items-center gap-2 rounded-full border border-forest-700/15 bg-white px-4 py-2 shadow-soft focus-within:ring-2 focus-within:ring-forest-700"
      >
        <input
          type="search"
          name="q"
          defaultValue={query}
          placeholder="Try “turmeric”, “dried carrot”, “tadka”…"
          aria-label="Search products"
          className="w-full bg-transparent py-2 text-sm text-forest-700 placeholder:text-forest-700/40 focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-full bg-forest-700 px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-cream hover:bg-forest-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700 focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
        >
          Search
        </button>
      </form>
      {suggestions.length > 0 && (
        <p className="mt-3 text-xs text-forest-700/60">
          Suggestions:{' '}
          {suggestions.map((word, i) => (
            <span key={word}>
              <Link
                href={`/search?q=${encodeURIComponent(word)}`}
                className="underline-offset-4 hover:text-forest-700 hover:underline"
              >
                {word}
              </Link>
              {i < suggestions.length - 1 ? ' · ' : ''}
            </span>
          ))}
        </p>
      )}
      <div className="mt-10">
        <CatalogueClient
          initialProducts={results}
          categories={categories}
          filter={filter}
          sort={sort}
        />
      </div>
    </div>
  );
}