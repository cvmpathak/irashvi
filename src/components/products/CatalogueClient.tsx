'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion as m } from 'motion/react';
import { Filter, SlidersHorizontal, X } from 'lucide-react';
import type { Category, Product } from '@/data/types';
import type { ProductFilter, ProductSort } from '@/services/catalogue/types';
import { listProductsSync } from '@/services/catalogue/local-product-repository';
import { ProductCard } from '@/components/products/ProductCard';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export interface CatalogueClientProps {
  initialProducts: Product[];
  categories: Category[];
  filter: ProductFilter;
  sort: ProductSort;
}

const SORT_OPTIONS: { value: ProductSort; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'price_asc', label: 'Price · Low to high' },
  { value: 'price_desc', label: 'Price · High to low' },
  { value: 'name', label: 'Alphabetical' },
];

const PACK_SIZE_OPTIONS = ['100 g', '200 g', '250 g', '500 g', '1 kg', '2 kg'];
const AVAILABILITY_OPTIONS = [
  { value: 'in_stock', label: 'In stock' },
  { value: 'low_stock', label: 'Low stock' },
];

export function CatalogueClient({
  initialProducts,
  categories,
  filter: initialFilter,
  sort: initialSort,
}: CatalogueClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filter, setFilter] = React.useState<ProductFilter>(initialFilter);
  const [sort, setSort] = React.useState<ProductSort>(initialSort);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  // Recompute products client-side using the local repository. This keeps the
  // page interactive without requiring a server round trip per filter change.
  const products = React.useMemo(() => {
    return listProductsSync({ filter, sort });
  }, [filter, sort]);

  const updateQuery = React.useCallback(
    (next: { filter: ProductFilter; sort: ProductSort }) => {
      const params = new URLSearchParams(searchParams.toString());
      const setOrDelete = (key: string, value: string | undefined | null) => {
        if (value === undefined || value === null || value === '') {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      };
      setOrDelete('q', next.filter.query);
      setOrDelete('category', next.filter.categorySlug);
      setOrDelete('minPrice', next.filter.minPrice?.toString());
      setOrDelete('maxPrice', next.filter.maxPrice?.toString());
      params.delete('packSize');
      next.filter.packSizes?.forEach((p) => params.append('packSize', p));
      params.delete('availability');
      next.filter.availability?.forEach((a) => params.append('availability', a));
      setOrDelete('sort', next.sort === 'featured' ? undefined : next.sort);
      const qs = params.toString();
      router.replace(qs ? `?${qs}` : '?', { scroll: false });
    },
    [router, searchParams],
  );

  const applyFilter = (next: ProductFilter) => {
    setFilter(next);
    updateQuery({ filter: next, sort });
  };

  const applySort = (next: ProductSort) => {
    setSort(next);
    updateQuery({ filter, sort: next });
  };

  const clearAll = () => {
    setFilter({});
    setSort('featured');
    router.replace('?', { scroll: false });
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
      <aside
        aria-label="Catalogue filters"
        className="hidden lg:block"
      >
        <FiltersPanel
          categories={categories}
          filter={filter}
          sort={sort}
          onFilterChange={applyFilter}
          onSortChange={applySort}
          onClear={clearAll}
        />
      </aside>
      <div className="lg:hidden">
        <div className="flex items-center justify-between border-y border-forest-700/10 bg-sand/40 px-4 py-3">
          <p className="text-sm text-forest-700/80">
            {products.length} {products.length === 1 ? 'product' : 'products'}
          </p>
          <div className="flex items-center gap-2">
            <select
              aria-label="Sort products"
              value={sort}
              onChange={(e) => applySort(e.target.value as ProductSort)}
              className="rounded-full border border-forest-700/20 bg-cream px-3 py-1.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open filters"
            >
              <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
              Filters
            </Button>
          </div>
        </div>
      </div>
      <div>
        <div className="hidden items-end justify-between border-b border-forest-700/10 pb-4 lg:flex">
          <p className="text-sm text-forest-700/80">
            Showing {products.length} {products.length === 1 ? 'product' : 'products'}
          </p>
          <div className="flex items-center gap-3">
            <label htmlFor="sort-desktop" className="text-xs uppercase tracking-[0.2em] text-forest-700/55">
              Sort
            </label>
            <select
              id="sort-desktop"
              value={sort}
              onChange={(e) => applySort(e.target.value as ProductSort)}
              className="rounded-full border border-forest-700/20 bg-cream px-3 py-1.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        {products.length === 0 ? (
          <EmptyState onClear={clearAll} />
        ) : (
          <m.ul
            key={JSON.stringify({ filter, sort })}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3"
          >
            {products.map((product) => (
              <li key={product.id} className="h-full">
                <ProductCard product={product} />
              </li>
            ))}
          </m.ul>
        )}
      </div>
      <FilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        categories={categories}
        filter={filter}
        sort={sort}
        onFilterChange={(next) => {
          applyFilter(next);
        }}
        onSortChange={applySort}
        onClear={clearAll}
        onApply={() => setDrawerOpen(false)}
      />
    </div>
  );
}

function FiltersPanel({
  categories,
  filter,
  sort,
  onFilterChange,
  onSortChange,
  onClear,
}: {
  categories: Category[];
  filter: ProductFilter;
  sort: ProductSort;
  onFilterChange: (next: ProductFilter) => void;
  onSortChange: (next: ProductSort) => void;
  onClear: () => void;
}) {
  return (
    <div className="sticky top-32 space-y-6 rounded-2xl-soft border border-forest-700/10 bg-white p-5 shadow-soft">
      <div className="flex items-center justify-between">
        <p className="font-display text-base text-forest-700">Refine</p>
        <button
          type="button"
          onClick={onClear}
          className="text-xs text-forest-700/60 underline-offset-4 hover:text-forest-700 hover:underline"
        >
          Clear all
        </button>
      </div>
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.18em] text-forest-700/55">Category</p>
        <ul className="space-y-1">
          <li>
            <CategoryRadio
              label="All categories"
              value={undefined}
              current={filter.categorySlug}
              onSelect={(v) => onFilterChange({ ...filter, categorySlug: v })}
            />
          </li>
          {categories.map((category) => (
            <li key={category.id}>
              <CategoryRadio
                label={category.name}
                value={category.slug}
                current={filter.categorySlug}
                onSelect={(v) => onFilterChange({ ...filter, categorySlug: v })}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.18em] text-forest-700/55">Pack size</p>
        <ul className="grid grid-cols-2 gap-1">
          {PACK_SIZE_OPTIONS.map((size) => (
            <li key={size}>
              <Checkbox
                label={size}
                checked={filter.packSizes?.includes(size) ?? false}
                onChange={(checked) => {
                  const current = new Set(filter.packSizes ?? []);
                  if (checked) current.add(size);
                  else current.delete(size);
                  onFilterChange({ ...filter, packSizes: Array.from(current) });
                }}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.18em] text-forest-700/55">Availability</p>
        <ul className="space-y-1">
          {AVAILABILITY_OPTIONS.map((opt) => (
            <li key={opt.value}>
              <Checkbox
                label={opt.label}
                checked={filter.availability?.includes(opt.value) ?? false}
                onChange={(checked) => {
                  const current = new Set(filter.availability ?? []);
                  if (checked) current.add(opt.value);
                  else current.delete(opt.value);
                  onFilterChange({ ...filter, availability: Array.from(current) });
                }}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.18em] text-forest-700/55">Price (₹)</p>
        <PriceRange
          min={filter.minPrice ?? 0}
          max={filter.maxPrice ?? 2000}
          onChange={(min, max) =>
            onFilterChange({
              ...filter,
              minPrice: min > 0 ? min : undefined,
              maxPrice: max < 2000 ? max : undefined,
            })
          }
        />
      </div>
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.18em] text-forest-700/55">Sort</p>
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value as ProductSort)}
          className="w-full rounded-full border border-forest-700/20 bg-cream px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

function FilterDrawer({
  open,
  onClose,
  categories,
  filter,
  onFilterChange,
  onSortChange,
  onClear,
  onApply,
}: {
  open: boolean;
  onClose: () => void;
  categories: Category[];
  filter: ProductFilter;
  sort: ProductSort;
  onFilterChange: (next: ProductFilter) => void;
  onSortChange: (next: ProductSort) => void;
  onClear: () => void;
  onApply: () => void;
}) {
  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 lg:hidden',
        open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
      )}
      aria-hidden={!open}
    >
      <div className="absolute inset-0 bg-charcoal/40" onClick={onClose} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Filter products"
        className={cn(
          'absolute inset-x-0 bottom-0 max-h-[88vh] overflow-y-auto rounded-t-3xl bg-cream px-5 pb-6 pt-4 shadow-lift transition-transform duration-300 ease-smooth',
          open ? 'translate-y-0' : 'translate-y-full',
        )}
      >
        <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-forest-700/15" aria-hidden="true" />
        <div className="flex items-center justify-between pb-4">
          <p className="flex items-center gap-2 font-display text-lg text-forest-700">
            <Filter className="h-4 w-4" aria-hidden="true" />
            Filters
          </p>
          <button
            type="button"
            aria-label="Close filters"
            className="grid h-9 w-9 place-items-center rounded-full text-forest-700 hover:bg-forest-700/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <FiltersPanel
          categories={categories}
          filter={filter}
          sort={'featured'}
          onFilterChange={onFilterChange}
          onSortChange={onSortChange}
          onClear={onClear}
        />
        <Button variant="primary" size="md" className="mt-6 w-full" onClick={onApply}>
          Apply filters
        </Button>
      </div>
    </div>
  );
}

function CategoryRadio({
  label,
  value,
  current,
  onSelect,
}: {
  label: string;
  value: string | undefined;
  current: string | undefined;
  onSelect: (next: string | undefined) => void;
}) {
  const isActive = current === value;
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      aria-pressed={isActive}
      className={cn(
        'flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700',
        isActive
          ? 'bg-forest-700 text-cream'
          : 'text-forest-700/85 hover:bg-forest-700/5',
      )}
    >
      <span>{label}</span>
      {isActive && <span aria-hidden="true">•</span>}
    </button>
  );
}

function Checkbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 text-sm text-forest-700/85 hover:bg-forest-700/5">
      <input
        type="checkbox"
        className="h-4 w-4 rounded border-forest-700/30 text-forest-700 focus-visible:ring-2 focus-visible:ring-forest-700"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span>{label}</span>
    </label>
  );
}

function PriceRange({
  min,
  max,
  onChange,
}: {
  min: number;
  max: number;
  onChange: (min: number, max: number) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="number"
        inputMode="numeric"
        aria-label="Minimum price"
        value={min}
        min={0}
        max={2000}
        step={50}
        onChange={(e) => onChange(Math.max(0, Number(e.target.value) || 0), max)}
        className="w-full rounded-md border border-forest-700/20 bg-cream px-2 py-1.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700"
      />
      <span aria-hidden="true" className="text-forest-700/40">–</span>
      <input
        type="number"
        inputMode="numeric"
        aria-label="Maximum price"
        value={max}
        min={0}
        max={5000}
        step={50}
        onChange={(e) => onChange(min, Math.max(min, Number(e.target.value) || 0))}
        className="w-full rounded-md border border-forest-700/20 bg-cream px-2 py-1.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700"
      />
    </div>
  );
}

function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="mt-10 grid place-items-center rounded-2xl-soft border border-forest-700/10 bg-white px-6 py-16 text-center">
      <p className="font-display text-xl text-forest-700">No matching products</p>
      <p className="mt-2 max-w-sm text-sm text-forest-700/70">
        Try clearing some filters or adjusting your search.
      </p>
      <Button variant="outline" size="md" className="mt-6" onClick={onClear}>
        Clear filters
      </Button>
      <Link
        href="/shop"
        className="mt-3 text-xs text-forest-700/60 underline-offset-4 hover:underline"
      >
        Or browse the full catalogue
      </Link>
    </div>
  );
}