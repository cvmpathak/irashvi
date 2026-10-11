import { describe, expect, it } from 'vitest';
import { parseCatalogueParams } from '@/features/catalogue/parse-catalogue-params';

describe('parseCatalogueParams', () => {
  it('returns defaults for empty params', () => {
    const { filter, sort } = parseCatalogueParams({});
    expect(sort).toBe('featured');
    expect(filter.categorySlug).toBeUndefined();
    expect(filter.packSizes).toEqual([]);
    expect(filter.availability).toEqual([]);
  });

  it('reads scalar query params', () => {
    const { filter, sort } = parseCatalogueParams({
      q: 'turmeric',
      category: 'spices-seasonings',
      sort: 'price_asc',
      minPrice: '100',
      maxPrice: '500',
    });
    expect(filter.query).toBe('turmeric');
    expect(filter.categorySlug).toBe('spices-seasonings');
    expect(filter.minPrice).toBe(100);
    expect(filter.maxPrice).toBe(500);
    expect(sort).toBe('price_asc');
  });

  it('supports repeated pack size and availability params', () => {
    const { filter } = parseCatalogueParams({
      packSize: ['100 g', '250 g'],
      availability: 'in_stock',
    });
    expect(filter.packSizes).toEqual(['100 g', '250 g']);
    expect(filter.availability).toEqual(['in_stock']);
  });

  it('falls back to featured on an unknown sort value', () => {
    const { sort } = parseCatalogueParams({ sort: 'unknown-value' });
    expect(sort).toBe('featured');
  });

  it('ignores invalid numeric ranges', () => {
    const { filter } = parseCatalogueParams({
      minPrice: 'abc',
      maxPrice: 'xyz',
    });
    expect(filter.minPrice).toBeUndefined();
    expect(filter.maxPrice).toBeUndefined();
  });
});