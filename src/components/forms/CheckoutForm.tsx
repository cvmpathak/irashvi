'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Lock, ShieldAlert } from 'lucide-react';
import { useCart } from '@/features/cart/cart-context';
import { checkoutService } from '@/services/checkout';
import { checkoutSchema, type CheckoutFormData } from '@/lib/validation/checkout';
import { formatINR } from '@/lib/formatting/currency';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

type Errors = Partial<Record<keyof CheckoutFormData, string>>;

export function CheckoutForm() {
  const router = useRouter();
  const { items, totals, clear } = useCart();
  const [form, setForm] = React.useState<CheckoutFormData>({
    fullName: '',
    email: '',
    phone: '',
    addressLine: '',
    city: '',
    state: '',
    pinCode: '',
    notes: '',
  });
  const [errors, setErrors] = React.useState<Errors>({});
  const [submitting, setSubmitting] = React.useState(false);
  const [formError, setFormError] = React.useState<string | null>(null);

  const onChange = <K extends keyof CheckoutFormData>(
    key: K,
    value: CheckoutFormData[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);
    const parsed = checkoutSchema.safeParse(form);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as keyof CheckoutFormData;
        if (!next[k]) next[k] = issue.message;
      }
      setErrors(next);
      return;
    }
    if (items.length === 0) {
      setFormError('Your cart is empty. Add at least one product before checking out.');
      return;
    }
    setSubmitting(true);
    try {
      const confirmation = await checkoutService.submitDemoCheckout(items, parsed.data);
      // Store the synthetic confirmation in sessionStorage for the success page.
      window.sessionStorage.setItem(
        'irashvi.lastCheckout',
        JSON.stringify(confirmation),
      );
      clear();
      router.push(`/checkout/success?ref=${encodeURIComponent(confirmation.referenceId)}`);
    } catch (err) {
      setFormError('Something went wrong while processing the demo checkout.');
      // eslint-disable-next-line no-console
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="rounded-2xl-soft border border-forest-700/10 bg-white p-8 text-center">
        <p className="font-display text-lg text-forest-700">Your cart is empty.</p>
        <p className="mt-2 text-sm text-forest-700/70">
          Add a product before continuing to the demonstration checkout.
        </p>
        <Link
          href="/shop"
          className="mt-4 inline-block rounded-full bg-forest-700 px-5 py-2 text-sm font-medium text-cream hover:bg-forest-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700 focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
        >
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="grid gap-10 lg:grid-cols-[1.4fr_1fr]"
      aria-describedby="checkout-demo-notice"
    >
      <div className="space-y-8">
        <div className="rounded-2xl-soft border border-forest-700/15 bg-cream/70 p-4">
          <p id="checkout-demo-notice" className="flex items-start gap-3 text-sm text-forest-700/85">
            <ShieldAlert className="mt-0.5 h-4 w-4 text-terracotta-400" aria-hidden="true" />
            <span>
              <strong className="font-medium">Demo checkout.</strong> This form
              validates your details and generates a synthetic reference, but no
              real order is placed and no payment is taken.
            </span>
          </p>
        </div>
        <fieldset className="rounded-2xl-soft border border-forest-700/10 bg-white p-6">
          <legend className="px-2 text-xs uppercase tracking-[0.24em] text-forest-700/55">
            Contact
          </legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Full name"
              id="fullName"
              autoComplete="name"
              value={form.fullName}
              onChange={(v) => onChange('fullName', v)}
              error={errors.fullName}
            />
            <Field
              label="Email"
              id="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(v) => onChange('email', v)}
              error={errors.email}
            />
            <Field
              label="Phone"
              id="phone"
              type="tel"
              autoComplete="tel"
              value={form.phone}
              onChange={(v) => onChange('phone', v)}
              error={errors.phone}
            />
          </div>
        </fieldset>
        <fieldset className="rounded-2xl-soft border border-forest-700/10 bg-white p-6">
          <legend className="px-2 text-xs uppercase tracking-[0.24em] text-forest-700/55">
            Delivery address
          </legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Street address"
              id="addressLine"
              autoComplete="street-address"
              value={form.addressLine}
              onChange={(v) => onChange('addressLine', v)}
              error={errors.addressLine}
              className="sm:col-span-2"
            />
            <Field
              label="City"
              id="city"
              autoComplete="address-level2"
              value={form.city}
              onChange={(v) => onChange('city', v)}
              error={errors.city}
            />
            <Field
              label="State"
              id="state"
              autoComplete="address-level1"
              value={form.state}
              onChange={(v) => onChange('state', v)}
              error={errors.state}
            />
            <Field
              label="PIN / Postal code"
              id="pinCode"
              autoComplete="postal-code"
              value={form.pinCode}
              onChange={(v) => onChange('pinCode', v)}
              error={errors.pinCode}
            />
            <div className="sm:col-span-2">
              <label htmlFor="notes" className="text-xs uppercase tracking-[0.18em] text-forest-700/55">
                Notes (optional)
              </label>
              <textarea
                id="notes"
                value={form.notes ?? ''}
                rows={3}
                maxLength={280}
                onChange={(e) => onChange('notes', e.target.value)}
                className="mt-2 w-full rounded-2xl border border-forest-700/15 bg-cream px-4 py-3 text-sm text-forest-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700"
              />
            </div>
          </div>
        </fieldset>
        <fieldset className="rounded-2xl-soft border border-forest-700/10 bg-white p-6">
          <legend className="px-2 text-xs uppercase tracking-[0.24em] text-forest-700/55">
            Payment
          </legend>
          <p className="flex items-start gap-3 text-sm text-forest-700/85">
            <Lock className="mt-0.5 h-4 w-4 text-forest-700/70" aria-hidden="true" />
            <span>
              No payment is collected in this demo. A live build would surface
              a payment provider (e.g. Razorpay, Stripe) at this step with
              secure server-side integration.
            </span>
          </p>
        </fieldset>
        {formError && (
          <p
            role="alert"
            className="rounded-xl border border-terracotta-400/40 bg-terracotta-100/40 px-4 py-3 text-sm text-terracotta-500"
          >
            {formError}
          </p>
        )}
      </div>
      <aside
        aria-label="Order review"
        className="h-fit rounded-2xl-soft border border-forest-700/10 bg-sand/40 p-6"
      >
        <h2 className="font-display text-lg text-forest-700">Order review</h2>
        <ul className="mt-4 divide-y divide-forest-700/15">
          {totals.itemCount === 0 ? (
            <li className="py-3 text-sm text-forest-700/60">No items.</li>
          ) : null}
          {items.map((item) => (
            <li key={`${item.productId}-${item.variantId}`} className="py-3">
              <p className="text-sm font-medium text-forest-700">
                {item.quantity} × {item.productId}
              </p>
              <p className="text-xs text-forest-700/60">Variant {item.variantId}</p>
            </li>
          ))}
        </ul>
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
        <Button
          type="submit"
          variant="primary"
          size="md"
          className="mt-6 w-full"
          disabled={submitting}
        >
          {submitting ? 'Processing…' : 'Place demo order'}
        </Button>
        <p className="mt-3 text-[11px] leading-relaxed text-forest-700/60">
          You will see a synthetic reference ID. Nothing is charged and no
          personal details are transmitted to a third party.
        </p>
      </aside>
    </form>
  );
}

interface FieldProps {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  autoComplete?: string;
  error?: string;
  className?: string;
}

function Field({
  label,
  id,
  value,
  onChange,
  type = 'text',
  autoComplete,
  error,
  className,
}: FieldProps) {
  const errorId = error ? `${id}-error` : undefined;
  return (
    <div className={className}>
      <label htmlFor={id} className="text-xs uppercase tracking-[0.18em] text-forest-700/55">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={errorId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-xl border border-forest-700/15 bg-cream px-4 py-2.5 text-sm text-forest-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700"
      />
      {error && (
        <p id={errorId} className="mt-1.5 text-xs text-terracotta-500">
          {error}
        </p>
      )}
    </div>
  );
}