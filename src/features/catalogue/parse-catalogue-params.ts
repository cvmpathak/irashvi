import type { ProductFilter, ProductSort } from '@/services/catalogue/types';

const SORT_VALUES: ProductSort[] = ['featured', 'price_asc', 'price_desc', 'name'];

const toArray = (value: string | string[] | undefined): string[] => {
  if (!value) return [];
  if (Array.isArray(value)) return value.flatMap((v) => v.split(','));
  return value.split(',').filter(Boolean);
};

const toNumber = (value: string | string[] | undefined): number | undefined => {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw) return undefined;
  const n = Number.parseInt(raw, 10);
  return Number.isFinite(n) ? n : undefined;
};

export function parseCatalogueParams(params: {
  [key: string]: string | string[] | undefined;
}): { filter: ProductFilter; sort: ProductSort } {
  const filter: ProductFilter = {};
  const sortRaw = Array.isArray(params.sort) ? params.sort[0] : params.sort;
  const sort: ProductSort = (SORT_VALUES as string[]).includes(sortRaw ?? '')
    ? (sortRaw as ProductSort)
    : 'featured';

  const categorySlug = Array.isArray(params.category) ? params.category[0] : params.category;
  if (categorySlug) filter.categorySlug = categorySlug;

  const query = Array.isArray(params.q) ? params.q[0] : params.q;
  if (query) filter.query = query;

  filter.packSizes = toArray(params.packSize);
  filter.availability = toArray(params.availability);

  const min = toNumber(params.minPrice);
  const max = toNumber(params.maxPrice);
  if (typeof min === 'number') filter.minPrice = min;
  if (typeof max === 'number') filter.maxPrice = max;

  return { filter, sort };
}

export function buildCatalogueSearchString(state: {
  filter: ProductFilter;
  sort: ProductSort;
}): string {
  const params = new URLSearchParams();
  if (state.filter.categorySlug) params.set('category', state.filter.categorySlug);
  if (state.filter.query) params.set('q', state.filter.query);
  state.filter.packSizes?.forEach((p) => params.append('packSize', p));
  state.filter.availability?.forEach((a) => params.append('availability', a));
  if (typeof state.filter.minPrice === 'number') params.set('minPrice', String(state.filter.minPrice));
  if (typeof state.filter.maxPrice === 'number') params.set('maxPrice', String(state.filter.maxPrice));
  if (state.sort && state.sort !== 'featured') params.set('sort', state.sort);
  const qs = params.toString();
  return qs ? `?${qs}` : '';
}