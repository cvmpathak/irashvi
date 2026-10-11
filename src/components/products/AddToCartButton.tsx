'use client';

import * as React from 'react';
import { Check, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/features/cart/cart-context';
import type { Product } from '@/data/types';

export interface AddToCartButtonProps {
  product: Product;
  variantId: string;
  quantity?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
}

export function AddToCartButton({
  product,
  variantId,
  quantity = 1,
  size = 'md',
  className,
  disabled,
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [feedback, setFeedback] = React.useState<'idle' | 'added'>('idle');

  const onClick = () => {
    if (!variantId) return;
    addItem({
      productId: product.id,
      variantId,
      quantity,
    });
    setFeedback('added');
    window.setTimeout(() => setFeedback('idle'), 1400);
  };

  const label =
    feedback === 'added'
      ? 'Added'
      : product.availability === 'out_of_stock' || product.availability === 'coming_soon'
      ? 'Unavailable'
      : 'Add to cart';

  const icon = feedback === 'added' ? <Check className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4" />;

  return (
    <Button
      variant={feedback === 'added' ? 'secondary' : 'primary'}
      size={size}
      className={className}
      onClick={onClick}
      disabled={disabled || feedback === 'added' || !variantId}
      aria-live="polite"
    >
      {icon}
      {label}
    </Button>
  );
}