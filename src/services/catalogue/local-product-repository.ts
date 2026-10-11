import { categoryById } from '@/data/categories';
import { productById, productBySlug, products } from '@/data/products';
import type { Product, ProductVariant } from '@/data/types';
import type {
  ProductFilter,
  ProductListOptions,
  ProductRepository,
  ProductSort,
} from './types';

const matchesQuery = (product: Product, query: string) => {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  if (product.name.toLowerCase().includes(q)) return true;
  if (product.shortDescription.toLowerCase().includes(q)) return true;
  if (product.description.toLowerCase().includes(q)) return true;
  const category = categoryById[product.categoryId];
  if (category && category.slug.toLowerCase().includes(q)) return true;
  if (category && category.name.toLowerCase().includes(q)) return true;
  return false;
};

function categorySlugOf(product: Product): string | null {
  const category = categoryById[product.categoryId];
  return category ? category.slug : null;
}

const matchesFilter = (product: Product, filter?: ProductFilter): boolean => {
  if (!filter) return true;
  if (filter.categorySlug && categorySlugOf(product) !== filter.categorySlug) return false;
  if (typeof filter.minPrice === 'number' || typeof filter.maxPrice === 'number') {
    const prices = product.variants.map((v) => v.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    if (typeof filter.minPrice === 'number' && max < filter.minPrice) return false;
    if (typeof filter.maxPrice === 'number' && min > filter.maxPrice) return false;
  }
  if (filter.packSizes && filter.packSizes.length > 0) {
    const sizes = product.variants.map((v) => v.packSize.toLowerCase());
    const wanted = filter.packSizes.map((s) => s.toLowerCase());
    if (!sizes.some((s) => wanted.includes(s))) return false;
  }
  if (filter.availability && filter.availability.length > 0) {
    if (!filter.availability.includes(product.availability)) return false;
  }
  return true;
};

const sortProducts = (list: Product[], sort: ProductSort = 'featured'): Product[] => {
  const copy = [...list];
  switch (sort) {
    case 'price_asc':
      copy.sort(
        (a, b) =>
          Math.min(...a.variants.map((v) => v.price)) -
          Math.min(...b.variants.map((v) => v.price)),
      );
      break;
    case 'price_desc':
      copy.sort(
        (a, b) =>
          Math.max(...b.variants.map((v) => v.price)) -
          Math.max(...a.variants.map((v) => v.price)),
      );
      break;
    case 'name':
      copy.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'featured':
    default:
      copy.sort((a, b) => {
        if (a.featured === b.featured) return a.createdAt.localeCompare(b.createdAt);
        return a.featured ? -1 : 1;
      });
      break;
  }
  return copy;
};

export class LocalProductRepository implements ProductRepository {
  async getAllProducts(): Promise<Product[]> {
    return products;
  }

  async getProductBySlug(slug: string): Promise<Product | null> {
    return productBySlug[slug] ?? null;
  }

  async getProductsByCategory(categorySlug: string): Promise<Product[]> {
    return products.filter((p) => categorySlugOf(p) === categorySlug);
  }

  async searchProducts(query: string): Promise<Product[]> {
    if (!query.trim()) return [];
    return products.filter((p) => matchesQuery(p, query));
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return products.filter((p) => p.featured);
  }

  async listProducts(options: ProductListOptions = {}): Promise<Product[]> {
    const { filter, sort, limit } = options;
    const filtered = products.filter((p) => {
      const queryOk = matchesQuery(p, filter?.query ?? '');
      return queryOk && matchesFilter(p, filter);
    });
    const sorted = sortProducts(filtered, sort);
    return typeof limit === 'number' ? sorted.slice(0, limit) : sorted;
  }

  async getVariant(productId: string, variantId: string): Promise<ProductVariant | null> {
    const product = productById[productId];
    if (!product) return null;
    return product.variants.find((v) => v.id === variantId) ?? null;
  }
}

export const productRepository: ProductRepository = new LocalProductRepository();

/**
 * Synchronous listing helper. Useful for client components that recompute
 * filtered/sorted results from already-loaded data without a server round trip.
 * Mirrors `LocalProductRepository.listProducts` but returns the array directly.
 */
export function listProductsSync(options: ProductListOptions = {}): Product[] {
  const { filter, sort, limit } = options;
  const filtered = products.filter((p) => {
    const queryOk = matchesQuery(p, filter?.query ?? '');
    return queryOk && matchesFilter(p, filter);
  });
  const sorted = sortProducts(filtered, sort);
  return typeof limit === 'number' ? sorted.slice(0, limit) : sorted;
}