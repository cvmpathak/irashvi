import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProductCard } from '@/components/products/ProductCard';
import { CartProvider } from '@/features/cart/cart-context';
import { productBySlug } from '@/data/products';
import * as React from 'react';

describe('ProductCard', () => {
  it('renders product name and short description', () => {
    const product = productBySlug['dried-carrot'];
    render(
      <CartProvider>
        <ProductCard product={product} />
      </CartProvider>,
    );
    expect(screen.getByText('Dried Carrot')).toBeInTheDocument();
    expect(screen.getByText(/sun-dried carrot cubes/i)).toBeInTheDocument();
  });

  it('shows an availability label', () => {
    const product = productBySlug['dried-carrot'];
    render(
      <CartProvider>
        <ProductCard product={product} />
      </CartProvider>,
    );
    expect(screen.getByText(/in stock/i)).toBeInTheDocument();
  });

  it('links to the product detail page', () => {
    const product = productBySlug['dried-carrot'];
    render(
      <CartProvider>
        <ProductCard product={product} />
      </CartProvider>,
    );
    const link = screen.getByRole('link', { name: /view dried carrot/i });
    expect(link).toHaveAttribute('href', '/products/dried-carrot');
  });
});