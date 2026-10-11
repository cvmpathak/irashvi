'use client';

import * as React from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'motion/react';
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { useCart } from '@/features/cart/cart-context';
import { Button, LinkButton } from '@/components/ui/Button';
import { mediaStorage } from '@/services/media';
import { formatINR } from '@/lib/formatting/currency';
import { cn } from '@/lib/utils';

export function CartDrawer() {
  const { isOpen, setOpen, lines, totals, updateQuantity, removeItem, clear } = useCart();

  React.useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="cart"
          className="fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-label="Cart"
        >
          <div
            className="absolute inset-0 bg-charcoal/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <motion.aside
            className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-cream shadow-lift"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
          >
            <header className="flex items-center justify-between border-b border-forest-700/10 px-5 py-4">
              <div className="flex items-center gap-3">
                <ShoppingBag className="h-5 w-5 text-forest-700" aria-hidden="true" />
                <h2 className="font-display text-xl text-forest-700">Your cart</h2>
                <span className="text-xs uppercase tracking-[0.2em] text-forest-700/60">
                  {totals.itemCount} {totals.itemCount === 1 ? 'item' : 'items'}
                </span>
              </div>
              <button
                type="button"
                aria-label="Close cart"
                className="grid h-9 w-9 place-items-center rounded-full text-forest-700 hover:bg-forest-700/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700"
                onClick={() => setOpen(false)}
              >
                <X className="h-4 w-4" />
              </button>
            </header>
            {lines.length === 0 ? (
              <EmptyCart onClose={() => setOpen(false)} />
            ) : (
              <>
                <ul className="flex-1 overflow-y-auto px-5 py-4">
                  {lines.map((line) => (
                    <li
                      key={`${line.productId}-${line.variantId}`}
                      className="flex gap-3 border-b border-forest-700/10 py-4 last:border-b-0"
                    >
                      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-sand">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={mediaStorage.resolve(line.product.images[0]?.src ?? '')}
                          alt={line.product.images[0]?.alt ?? line.product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <Link
                          href={`/products/${line.product.slug}`}
                          className="block text-sm font-medium text-forest-700 hover:underline"
                          onClick={() => setOpen(false)}
                        >
                          {line.product.name}
                        </Link>
                        <p className="mt-1 text-xs text-forest-700/60">
                          {line.variant.packSize} · SKU {line.variant.sku}
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          <QuantityControl
                            value={line.quantity}
                            onChange={(q) =>
                              updateQuantity(line.productId, line.variantId, q)
                            }
                          />
                          <span className="text-sm font-medium text-forest-700">
                            {formatINR(line.lineTotal)}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(line.productId, line.variantId)}
                          className={cn(
                            'mt-2 inline-flex items-center gap-1 text-xs text-forest-700/60',
                            'hover:text-terracotta-400 focus-visible:text-terracotta-400 focus-visible:outline-none',
                          )}
                        >
                          <Trash2 className="h-3 w-3" aria-hidden="true" />
                          Remove
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <footer className="border-t border-forest-700/10 bg-sand/40 px-5 py-4">
                  <dl className="space-y-1 text-sm">
                    <div className="flex justify-between text-forest-700/80">
                      <dt>Subtotal</dt>
                      <dd>{formatINR(totals.subtotal)}</dd>
                    </div>
                    <div className="flex justify-between text-forest-700/80">
                      <dt>Estimated shipping</dt>
                      <dd>
                        {totals.shipping === 0 ? 'Free' : formatINR(totals.shipping)}
                      </dd>
                    </div>
                    <div className="mt-2 flex justify-between border-t border-forest-700/10 pt-2 text-base font-medium text-forest-700">
                      <dt>Estimated total</dt>
                      <dd>{formatINR(totals.estimatedTotal)}</dd>
                    </div>
                  </dl>
                  <p className="mt-3 text-[11px] leading-relaxed text-forest-700/60">
                    Demo checkout — prices are illustrative and no real order is
                    placed.
                  </p>
                  <div className="mt-4 flex flex-col gap-2">
                    <LinkButton
                      href="/checkout"
                      variant="primary"
                      size="md"
                      className="w-full"
                      onClick={() => setOpen(false)}
                    >
                      Checkout (demo)
                    </LinkButton>
                    <Link
                      href="/cart"
                      className="text-center text-xs text-forest-700/70 underline-offset-4 hover:underline"
                      onClick={() => setOpen(false)}
                    >
                      View full cart
                    </Link>
                    <button
                      type="button"
                      onClick={clear}
                      className="mt-1 text-center text-xs text-forest-700/60 underline-offset-4 hover:text-terracotta-400 hover:underline focus-visible:text-terracotta-400"
                    >
                      Clear cart
                    </button>
                  </div>
                </footer>
              </>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function EmptyCart({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
      <div className="grid h-16 w-16 place-items-center rounded-full bg-sand text-forest-700/70">
        <ShoppingBag className="h-6 w-6" aria-hidden="true" />
      </div>
      <p className="mt-4 font-display text-lg text-forest-700">Your cart is empty</p>
      <p className="mt-2 max-w-xs text-sm text-forest-700/70">
        Add a few of our dried vegetables, powders, or spice blends to get started.
      </p>
      <Button
        variant="primary"
        size="md"
        className="mt-6"
        onClick={onClose}
      >
        Continue shopping
      </Button>
    </div>
  );
}

function QuantityControl({
  value,
  onChange,
}: {
  value: number;
  onChange: (q: number) => void;
}) {
  return (
    <div className="inline-flex items-center rounded-full border border-forest-700/15">
      <button
        type="button"
        aria-label="Decrease quantity"
        className="grid h-8 w-8 place-items-center rounded-full text-forest-700/80 hover:bg-forest-700/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700 disabled:opacity-40"
        onClick={() => onChange(Math.max(1, value - 1))}
        disabled={value <= 1}
      >
        <Minus className="h-3 w-3" />
      </button>
      <span
        className="grid w-8 place-items-center text-sm font-medium text-forest-700"
        aria-live="polite"
      >
        {value}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        className="grid h-8 w-8 place-items-center rounded-full text-forest-700/80 hover:bg-forest-700/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700 disabled:opacity-40"
        onClick={() => onChange(Math.min(99, value + 1))}
        disabled={value >= 99}
      >
        <Plus className="h-3 w-3" />
      </button>
    </div>
  );
}