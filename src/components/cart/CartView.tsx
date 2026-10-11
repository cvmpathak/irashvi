'use client';

import * as React from 'react';
import Link from 'next/link';
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '@/features/cart/cart-context';
import { Button, LinkButton } from '@/components/ui/Button';
import { formatINR } from '@/lib/formatting/currency';
import { mediaStorage } from '@/services/media';

export function CartView() {
  const { lines, totals, updateQuantity, removeItem, clear } = useCart();

  if (lines.length === 0) {
    return (
      <div className="mt-10 grid place-items-center rounded-2xl-soft border border-forest-700/10 bg-white px-6 py-16 text-center">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-sand text-forest-700/70">
          <ShoppingBag className="h-6 w-6" aria-hidden="true" />
        </div>
        <p className="mt-4 font-display text-xl text-forest-700">Your cart is empty.</p>
        <p className="mt-2 max-w-sm text-sm text-forest-700/70">
          Add a few of our dried vegetables, powders, or spice blends to get started.
        </p>
        <LinkButton href="/shop" variant="primary" size="md" className="mt-6">
          Continue shopping
        </LinkButton>
      </div>
    );
  }

  return (
    <div className="mt-10 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
      <section
        aria-labelledby="cart-items-heading"
        className="rounded-2xl-soft border border-forest-700/10 bg-white p-2 shadow-soft sm:p-4"
      >
        <h2 id="cart-items-heading" className="sr-only">
          Items in your cart
        </h2>
        <ul className="divide-y divide-forest-700/10">
          {lines.map((line) => (
            <li
              key={`${line.productId}-${line.variantId}`}
              className="flex gap-4 px-2 py-4 sm:px-4"
            >
              <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-sand">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={mediaStorage.resolve(line.product.images[0]?.src ?? '')}
                  alt={line.product.images[0]?.alt ?? line.product.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <Link
                      href={`/products/${line.product.slug}`}
                      className="text-base font-medium text-forest-700 hover:underline"
                    >
                      {line.product.name}
                    </Link>
                    <p className="mt-1 text-xs text-forest-700/60">
                      {line.variant.packSize} · SKU {line.variant.sku}
                    </p>
                  </div>
                  <p className="font-display text-base text-forest-700">
                    {formatINR(line.lineTotal)}
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="inline-flex items-center rounded-full border border-forest-700/15">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      className="grid h-9 w-9 place-items-center rounded-full text-forest-700/80 hover:bg-forest-700/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700 disabled:opacity-40"
                      onClick={() => updateQuantity(line.productId, line.variantId, line.quantity - 1)}
                      disabled={line.quantity <= 1}
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="grid w-9 place-items-center text-sm font-medium text-forest-700">
                      {line.quantity}
                    </span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      className="grid h-9 w-9 place-items-center rounded-full text-forest-700/80 hover:bg-forest-700/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700 disabled:opacity-40"
                      onClick={() => updateQuantity(line.productId, line.variantId, line.quantity + 1)}
                      disabled={line.quantity >= 99}
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(line.productId, line.variantId)}
                    className="inline-flex items-center gap-1 text-xs text-forest-700/60 hover:text-terracotta-400 focus-visible:text-terracotta-400 focus-visible:outline-none"
                  >
                    <Trash2 className="h-3 w-3" aria-hidden="true" />
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between border-t border-forest-700/10 px-2 py-4 sm:px-4">
          <Link
            href="/shop"
            className="text-sm text-forest-700/70 underline-offset-4 hover:underline"
          >
            ← Continue shopping
          </Link>
          <button
            type="button"
            onClick={clear}
            className="text-xs text-forest-700/55 underline-offset-4 hover:text-terracotta-400 hover:underline focus-visible:text-terracotta-400 focus-visible:outline-none"
          >
            Clear cart
          </button>
        </div>
      </section>
      <aside
        aria-label="Order summary"
        className="h-fit rounded-2xl-soft border border-forest-700/10 bg-sand/40 p-6"
      >
        <h2 className="font-display text-lg text-forest-700">Order summary</h2>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between text-forest-700/80">
            <dt>Subtotal</dt>
            <dd>{formatINR(totals.subtotal)}</dd>
          </div>
          <div className="flex justify-between text-forest-700/80">
            <dt>Estimated shipping</dt>
            <dd>{totals.shipping === 0 ? 'Free' : formatINR(totals.shipping)}</dd>
          </div>
          <div className="flex justify-between border-t border-forest-700/15 pt-3 text-base font-medium text-forest-700">
            <dt>Estimated total</dt>
            <dd>{formatINR(totals.estimatedTotal)}</dd>
          </div>
        </dl>
        <p className="mt-3 text-[11px] leading-relaxed text-forest-700/60">
          Demo checkout — prices are illustrative and no real order is placed.
        </p>
        <LinkButton
          href="/checkout"
          variant="primary"
          size="md"
          className="mt-5 w-full"
        >
          Proceed to checkout (demo)
        </LinkButton>
        <Button variant="ghost" size="sm" className="mt-2 w-full" onClick={clear}>
          Clear cart
        </Button>
      </aside>
    </div>
  );
}