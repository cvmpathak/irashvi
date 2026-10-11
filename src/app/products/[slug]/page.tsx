import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { productRepository } from '@/services/catalogue/local-product-repository';
import { categoryById } from '@/data/categories';
import { ProductDetailClient } from '@/components/products/ProductDetailClient';
import { ProductCard } from '@/components/products/ProductCard';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

interface ProductPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await productRepository.getProductBySlug(params.slug);
  if (!product) return { title: 'Product not found' };
  return {
    title: product.name,
    description: product.shortDescription,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: `${product.name} · Irashvi`,
      description: product.shortDescription,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await productRepository.getProductBySlug(params.slug);
  if (!product) notFound();
  const category = categoryById[product.categoryId];
  const allProducts = await productRepository.getAllProducts();
  const related = allProducts
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.shortDescription,
    sku: product.variants[0]?.sku,
    image: product.images.map((i) => i.src),
    brand: { '@type': 'Brand', name: 'Irashvi' },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'INR',
      lowPrice: Math.min(...product.variants.map((v) => v.price)),
      highPrice: Math.max(...product.variants.map((v) => v.price)),
      offerCount: product.variants.length,
    },
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: 'Shop', href: '/shop' },
          ...(category
            ? [{ label: category.name, href: `/categories/${category.slug}` }]
            : []),
          { label: product.name, href: `/products/${product.slug}` },
        ]}
      />
      <div className="mt-6">
        <ProductDetailClient product={product} />
      </div>
      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="mt-20">
          <h2
            id="related-heading"
            className="font-display text-display-md text-forest-700"
          >
            You may also like
          </h2>
          <ul className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <li key={p.id} className="h-full">
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </section>
      )}
      <section aria-labelledby="product-faq" className="mt-20 max-w-3xl">
        <h2 id="product-faq" className="font-display text-display-md text-forest-700">
          Common questions
        </h2>
        <div className="mt-6 divide-y divide-forest-700/10 rounded-2xl-soft border border-forest-700/10 bg-white">
          <FAQItem
            q="Is this product really in stock?"
            a="Stock and pricing shown here are part of a demonstration storefront. No real inventory is held against these listings."
          />
          <FAQItem
            q="How long does shipping take?"
            a="Shipping estimates are not active on this demo build. A live deployment would use a real shipping provider."
          />
          <FAQItem
            q="Can I order this in bulk?"
            a="Yes. Head to our Wholesale page for larger pack formats and business enquiries (demonstration flow)."
          />
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="group px-6 py-4">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium text-forest-700">
        <span>{q}</span>
        <span aria-hidden="true" className="grid h-6 w-6 place-items-center rounded-full border border-forest-700/20 text-xs text-forest-700 transition-transform group-open:rotate-45">
          +
        </span>
      </summary>
      <p className="mt-3 text-sm leading-relaxed text-forest-700/75">{a}</p>
    </details>
  );
}