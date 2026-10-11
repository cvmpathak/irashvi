import type { Metadata } from 'next';
import { productRepository } from '@/services/catalogue/local-product-repository';
import { categoryRepository } from '@/services/catalogue/local-category-repository';
import { parseCatalogueParams } from '@/features/catalogue/parse-catalogue-params';
import { CatalogueClient } from '@/components/products/CatalogueClient';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Shop',
  description:
    'Browse the Irashvi catalogue — dried vegetables, vegetable powders, spices, cooking mixes, and pantry essentials.',
  alternates: {
    canonical: '/shop',
  },
};

interface ShopPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const { filter, sort } = parseCatalogueParams(searchParams);
  const [products, categories] = await Promise.all([
    productRepository.listProducts({ filter, sort }),
    categoryRepository.getAllCategories(),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: 'Shop', href: '/shop' }]} />
      <header className="mt-6 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.24em] text-forest-700/55">Shop</p>
        <h1 className="mt-2 font-display text-display-lg text-forest-700 text-balance">
          The full Irashvi catalogue.
        </h1>
        <p className="mt-3 text-base text-forest-700/75">
          Browse, filter, and sort our small list of dependable ingredients.
          Prices and availability are sample data for this demo storefront.
        </p>
      </header>
      <div className="mt-10">
        <CatalogueClient
          initialProducts={products}
          categories={categories}
          filter={filter}
          sort={sort}
        />
      </div>
    </div>
  );
}