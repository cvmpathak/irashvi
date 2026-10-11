'use client';

import * as React from 'react';
import { safeJSONParse } from '@/lib/utils';
import { productById } from '@/data/products';
import type { CartItem, Product, ProductVariant } from '@/data/types';

const STORAGE_KEY = 'irashvi.cart.v1';

export interface CartLine {
  productId: string;
  variantId: string;
  quantity: number;
  product: Product;
  variant: ProductVariant;
  lineTotal: number;
}

export interface CartTotals {
  itemCount: number;
  subtotal: number;
  shipping: number; // estimated, demonstration only
  estimatedTotal: number;
}

export interface CartContextValue {
  items: CartItem[];
  lines: CartLine[];
  totals: CartTotals;
  addItem: (item: CartItem) => void;
  updateQuantity: (productId: string, variantId: string, quantity: number) => void;
  removeItem: (productId: string, variantId: string) => void;
  clear: () => void;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}

const CartContext = React.createContext<CartContextValue | null>(null);

const isValidItem = (value: unknown): value is CartItem => {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as Record<string, unknown>;
  if (typeof candidate.productId !== 'string') return false;
  if (typeof candidate.variantId !== 'string') return false;
  if (typeof candidate.quantity !== 'number' || !Number.isFinite(candidate.quantity)) return false;
  if (candidate.quantity < 1 || candidate.quantity > 99) return false;
  return true;
};

function readStoredItems(): CartItem[] {
  if (typeof window === 'undefined') return [];
  const parsed = safeJSONParse<unknown[]>(window.localStorage.getItem(STORAGE_KEY), []);
  if (!Array.isArray(parsed)) return [];
  // Drop any item that fails shape validation or refers to a non-existent product/variant.
  return parsed.filter(isValidItem).filter((item) => {
    const product = productById[item.productId];
    if (!product) return false;
    return product.variants.some((v) => v.id === item.variantId);
  });
}

function writeStoredItems(items: CartItem[]) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // localStorage may be unavailable (private mode, quota, etc.).
    // We swallow the error here — the cart will still work for this session.
  }
}

const SHIPPING_ESTIMATE = 79;

function buildLines(items: CartItem[]): CartLine[] {
  const lines: CartLine[] = [];
  for (const item of items) {
    const product = productById[item.productId];
    if (!product) continue;
    const variant = product.variants.find((v) => v.id === item.variantId);
    if (!variant) continue;
    lines.push({
      productId: item.productId,
      variantId: item.variantId,
      quantity: item.quantity,
      product,
      variant,
      lineTotal: variant.price * item.quantity,
    });
  }
  return lines;
}

function buildTotals(lines: CartLine[]): CartTotals {
  const subtotal = lines.reduce((sum, line) => sum + line.lineTotal, 0);
  const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0);
  const shipping = subtotal > 0 ? SHIPPING_ESTIMATE : 0;
  return {
    itemCount,
    subtotal,
    shipping,
    estimatedTotal: subtotal + shipping,
  };
}

export interface CartProviderProps {
  children: React.ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = React.useState<CartItem[]>([]);
  const [hydrated, setHydrated] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  // Hydrate from localStorage after mount.
  React.useEffect(() => {
    setItems(readStoredItems());
    setHydrated(true);
  }, []);

  // Persist after hydration so the initial render matches the server.
  React.useEffect(() => {
    if (!hydrated) return;
    writeStoredItems(items);
  }, [items, hydrated]);

  const addItem = React.useCallback((newItem: CartItem) => {
    if (!isValidItem(newItem)) return;
    const product = productById[newItem.productId];
    if (!product) return;
    const variant = product.variants.find((v) => v.id === newItem.variantId);
    if (!variant) return;
    if (variant.availability === 'out_of_stock' || variant.availability === 'coming_soon') return;

    setItems((prev) => {
      const existing = prev.find(
        (i) => i.productId === newItem.productId && i.variantId === newItem.variantId,
      );
      if (existing) {
        const next = prev.map((p) =>
          p.productId === newItem.productId && p.variantId === newItem.variantId
            ? { ...p, quantity: Math.min(99, p.quantity + newItem.quantity) }
            : p,
        );
        return next;
      }
      return [...prev, { ...newItem, quantity: Math.min(99, newItem.quantity) }];
    });
    setIsOpen(true);
  }, []);

  const updateQuantity = React.useCallback(
    (productId: string, variantId: string, quantity: number) => {
      if (!Number.isFinite(quantity)) return;
      const safe = Math.max(0, Math.min(99, Math.floor(quantity)));
      setItems((prev) => {
        if (safe === 0) {
          return prev.filter((i) => !(i.productId === productId && i.variantId === variantId));
        }
        return prev.map((i) =>
          i.productId === productId && i.variantId === variantId ? { ...i, quantity: safe } : i,
        );
      });
    },
    [],
  );

  const removeItem = React.useCallback((productId: string, variantId: string) => {
    setItems((prev) => prev.filter((i) => !(i.productId === productId && i.variantId === variantId)));
  }, []);

  const clear = React.useCallback(() => {
    setItems([]);
  }, []);

  const lines = React.useMemo(() => buildLines(items), [items]);
  const totals = React.useMemo(() => buildTotals(lines), [lines]);

  const value = React.useMemo<CartContextValue>(
    () => ({
      items,
      lines,
      totals,
      addItem,
      updateQuantity,
      removeItem,
      clear,
      isOpen,
      setOpen: setIsOpen,
    }),
    [items, lines, totals, addItem, updateQuantity, removeItem, clear, isOpen],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = React.useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider.');
  }
  return ctx;
}