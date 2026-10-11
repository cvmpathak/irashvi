import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { categoryRepository } from '@/services/catalogue/local-category-repository';
import { productRepository } from '@/services/catalogue/local-product-repository';
import { parseCatalogueParams } from '@/features/catalogue/parse-catalogue-params';
import { CatalogueClient } from '@/components/products/CatalogueClient';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

interface CategoryPageProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = await categoryRepository.getCategoryBySlug(params.slug);
  if (!category) {
    return { title: 'Category not found' };
  }
  return {
    title: category.name,
    description: category.description,
    alternates: {
      canonical: `/categories/${category.slug}`,
    },
    openGraph: {
      title: `${category.name} · Irashvi`,
      description: category.description,
    },
  };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const category = await categoryRepository.getCategoryBySlug(params.slug);
  if (!category) notFound();
  const { filter, sort } = parseCatalogueParams({
    ...searchParams,
    category: params.slug,
  });
  const [products, categories] = await Promise.all([
    productRepository.listProducts({ filter, sort }),
    categoryRepository.getAllCategories(),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: 'Shop', href: '/shop' },
          { label: category.name, href: `/categories/${category.slug}` },
        ]}
      />
      <header className="mt-6 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-forest-700/55">Category</p>
          <h1 className="mt-2 font-display text-display-lg text-forest-700 text-balance">
            {category.name}
          </h1>
          <p className="mt-3 max-w-xl text-base text-forest-700/75">{category.description}</p>
          {category.hero && (
            <p className="mt-3 max-w-xl text-sm text-forest-700/55">{category.hero}</p>
          )}
        </div>
        <div className="aspect-[4/3] overflow-hidden rounded-2xl-soft border border-forest-700/10 bg-sand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={category.image.src}
            alt={category.image.alt}
            className="h-full w-full object-cover"
          />
        </div>
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