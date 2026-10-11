import type { MetadataRoute } from 'next';
import { categoryRepository } from '@/services/catalogue/local-category-repository';
import { productRepository } from '@/services/catalogue/local-product-repository';
import { recipes } from '@/data/recipes';
import { journalEntries } from '@/data/journal';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://irashvi.example';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, products] = await Promise.all([
    categoryRepository.getAllCategories(),
    productRepository.getAllProducts(),
  ]);
  const lastModified = new Date();
  const staticUrls: MetadataRoute.Sitemap = [
    '/',
    '/shop',
    '/our-story',
    '/recipes',
    '/journal',
    '/wholesale',
    '/contact',
    '/faq',
    '/shipping-policy',
    '/returns-refunds',
    '/privacy-policy',
    '/terms-and-conditions',
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
  }));
  const categoryUrls: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${SITE_URL}/categories/${category.slug}`,
    lastModified,
  }));
  const productUrls: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${SITE_URL}/products/${product.slug}`,
    lastModified,
  }));
  const recipeUrls: MetadataRoute.Sitemap = recipes.map((recipe) => ({
    url: `${SITE_URL}/recipes/${recipe.slug}`,
    lastModified,
  }));
  const journalUrls: MetadataRoute.Sitemap = journalEntries.map((entry) => ({
    url: `${SITE_URL}/journal/${entry.slug}`,
    lastModified,
  }));
  return [...staticUrls, ...categoryUrls, ...productUrls, ...recipeUrls, ...journalUrls];
}