import { describe, expect, it } from 'vitest';
import { LocalProductRepository } from '@/services/catalogue/local-product-repository';

const repo = new LocalProductRepository();

describe('LocalProductRepository', () => {
  it('returns every product', async () => {
    const products = await repo.getAllProducts();
    expect(products.length).toBeGreaterThan(0);
  });

  it('finds a product by slug', async () => {
    const product = await repo.getProductBySlug('dried-carrot');
    expect(product?.name).toBe('Dried Carrot');
  });

  it('returns null for unknown slugs', async () => {
    const product = await repo.getProductBySlug('does-not-exist');
    expect(product).toBeNull();
  });

  it('filters by category slug', async () => {
    const list = await repo.getProductsByCategory('spices-seasonings');
    expect(list.length).toBeGreaterThan(0);
    list.forEach((p) => expect(p.categoryId).toBe('cat-spices-seasonings'));
  });

  it('searches across name, description and category', async () => {
    const matches = await repo.searchProducts('turmeric');
    expect(matches.length).toBeGreaterThan(0);
    expect(matches[0].name.toLowerCase()).toContain('turmeric');
  });

  it('sorts by price ascending', async () => {
    const list = await repo.listProducts({ sort: 'price_asc' });
    const prices = list.map((p) => Math.min(...p.variants.map((v) => v.price)));
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });

  it('sorts by name', async () => {
    const list = await repo.listProducts({ sort: 'name' });
    const names = list.map((p) => p.name);
    expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)));
  });

  it('filters by price range', async () => {
    const list = await repo.listProducts({
      filter: { minPrice: 200, maxPrice: 600 },
    });
    list.forEach((p) => {
      const min = Math.min(...p.variants.map((v) => v.price));
      const max = Math.max(...p.variants.map((v) => v.price));
      expect(max).toBeGreaterThanOrEqual(200);
      expect(min).toBeLessThanOrEqual(600);
    });
  });

  it('filters by availability', async () => {
    const list = await repo.listProducts({
      filter: { availability: ['in_stock'] },
    });
    list.forEach((p) => expect(p.availability).toBe('in_stock'));
  });

  it('returns featured products', async () => {
    const featured = await repo.getFeaturedProducts();
    expect(featured.length).toBeGreaterThan(0);
    featured.forEach((p) => expect(p.featured).toBe(true));
  });
});