import type { Category, Product, ProductVariant } from '@/data/types';

export interface ProductFilter {
  categorySlug?: string;
  minPrice?: number;
  maxPrice?: number;
  packSizes?: string[];
  availability?: string[];
  query?: string;
}

export type ProductSort = 'featured' | 'price_asc' | 'price_desc' | 'name';

export interface ProductListOptions {
  filter?: ProductFilter;
  sort?: ProductSort;
  limit?: number;
}

export interface ProductRepository {
  getAllProducts(): Promise<Product[]>;
  getProductBySlug(slug: string): Promise<Product | null>;
  getProductsByCategory(categorySlug: string): Promise<Product[]>;
  searchProducts(query: string): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
  listProducts(options?: ProductListOptions): Promise<Product[]>;
  getVariant(productId: string, variantId: string): Promise<ProductVariant | null>;
}

export interface CategoryRepository {
  getAllCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | null>;
}