/**
 * Domain types for Irashvi's local product catalogue.
 *
 * These types are intentionally framework-agnostic. They are referenced by:
 *   - the local catalogue data (`src/data/products.ts`)
 *   - the catalogue service interfaces (`src/services/catalogue`)
 *   - UI components throughout the storefront
 *
 * A future backend / database implementation must conform to these shapes so
 * that components do not need to be rewritten when the data source changes.
 */

export type ProductAvailability = 'in_stock' | 'low_stock' | 'out_of_stock' | 'coming_soon';

export interface ProductVariant {
  id: string;
  packSize: string;
  price: number; // demonstration price in INR
  sku: string;
  availability: ProductAvailability;
}

export interface ProductImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  categoryId: string;
  images: ProductImage[];
  variants: ProductVariant[];
  ingredients?: string[];
  netQuantity?: string;
  usageInstructions?: string;
  storageInstructions?: string;
  shelfLife?: string;
  availability: ProductAvailability;
  featured: boolean;
  createdAt: string; // ISO date
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: ProductImage;
  hero?: string;
}

export interface Recipe {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  timeMinutes: number;
  servings: number;
  difficulty: 'easy' | 'medium' | 'advanced';
  ingredients: string[];
  steps: string[];
  relatedProductIds: string[];
  image: ProductImage;
  createdAt: string;
}

export interface JournalEntry {
  id: string;
  slug: string;
  title: string;
  summary: string;
  body: string;
  readingMinutes: number;
  tag: string;
  image: ProductImage;
  createdAt: string;
}

export interface NavItem {
  label: string;
  href: string;
  description?: string;
}

export interface SiteSettings {
  brand: {
    name: string;
    tagline: string;
    email: string;
    phone: string;
    address: string;
    socials: { label: string; href: string }[];
  };
  announcement: {
    enabled: boolean;
    message: string;
    link?: { label: string; href: string };
  };
  navigation: {
    primary: NavItem[];
    footer: { heading: string; links: NavItem[] }[];
  };
  policies: {
    shipping: string;
    returns: string;
    privacy: string;
    terms: string;
  };
  faqs: { id: string; question: string; answer: string }[];
}

export interface CartItem {
  productId: string;
  variantId: string;
  quantity: number;
}