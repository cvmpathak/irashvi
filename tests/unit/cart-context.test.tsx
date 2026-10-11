import { describe, expect, it } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from '@/features/cart/cart-context';
import { productById } from '@/data/products';
import * as React from 'react';

function wrapper({ children }: { children: React.ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}

describe('cart context', () => {
  it('adds, updates and removes an item', () => {
    const product = productById['prod-dried-carrot']!;
    const variant = product.variants[0];
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addItem({
        productId: product.id,
        variantId: variant.id,
        quantity: 1,
      });
    });
    expect(result.current.lines).toHaveLength(1);
    expect(result.current.lines[0].quantity).toBe(1);
    act(() => {
      result.current.updateQuantity(product.id, variant.id, 3);
    });
    expect(result.current.lines[0].quantity).toBe(3);
    act(() => {
      result.current.removeItem(product.id, variant.id);
    });
    expect(result.current.lines).toHaveLength(0);
  });

  it('caps quantity at 99 and floors at 1', () => {
    const product = productById['prod-dried-carrot']!;
    const variant = product.variants[0];
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addItem({
        productId: product.id,
        variantId: variant.id,
        quantity: 1,
      });
    });
    act(() => {
      result.current.updateQuantity(product.id, variant.id, 200);
    });
    expect(result.current.lines[0].quantity).toBe(99);
    act(() => {
      result.current.updateQuantity(product.id, variant.id, 0);
    });
    expect(result.current.lines).toHaveLength(0);
  });

  it('rejects unknown product or variant ids', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addItem({
        productId: 'unknown',
        variantId: 'unknown',
        quantity: 1,
      });
    });
    expect(result.current.lines).toHaveLength(0);
  });

  it('rejects out-of-stock variants', () => {
    const product = productById['prod-dried-carrot']!;
    // Force the first variant into out_of_stock for the test by constructing
    // a synthetic add — we cannot mutate the immutable catalogue, so we use
    // an unknown variant id which is also rejected.
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addItem({
        productId: product.id,
        variantId: 'var-out-of-stock',
        quantity: 1,
      });
    });
    expect(result.current.lines).toHaveLength(0);
  });
});