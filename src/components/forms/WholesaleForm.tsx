'use client';

import * as React from 'react';
import { CheckCircle2, ShieldAlert } from 'lucide-react';
import { wholesaleSchema, type WholesaleFormData } from '@/lib/validation/wholesale';
import { Button } from '@/components/ui/Button';

type Errors = Partial<Record<keyof WholesaleFormData, string>>;

const BUSINESS_TYPES: { value: WholesaleFormData['businessType']; label: string }[] = [
  { value: 'restaurant', label: 'Restaurant / Café' },
  { value: 'retailer', label: 'Retailer' },
  { value: 'distributor', label: 'Distributor' },
  { value: 'caterer', label: 'Caterer' },
  { value: 'other', label: 'Other' },
];

export function WholesaleForm() {
  const [form, setForm] = React.useState<WholesaleFormData>({
    name: '',
    company: '',
    email: '',
    phone: '',
    businessType: 'restaurant',
    productInterest: '',
    estimatedQuantity: '',
    deliveryLocation: '',
    message: '',
  });
  const [errors, setErrors] = React.useState<Errors>({});
  const [submitting, setSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  const onChange = <K extends keyof WholesaleFormData>(
    key: K,
    value: WholesaleFormData[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = wholesaleSchema.safeParse(form);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as keyof WholesaleFormData;
        if (!next[k]) next[k] = issue.message;
      }
      setErrors(next);
      return;
    }
    setSubmitting(true);
    // No real submission. Wait briefly to simulate a network call so the
    // user understands this is a placeholder for a real provider integration.
    await new Promise((resolve) => window.setTimeout(resolve, 600));
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-2xl-soft border border-forest-700/10 bg-white p-8 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-sage-200 text-forest-700">
          <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
        </div>
        <h2 className="mt-4 font-display text-2xl text-forest-700">Demo enquiry received</h2>
        <p className="mt-3 text-sm text-forest-700/75">
          Thank you, {form.name}. This is a demonstration submission. We have
          not transmitted your details anywhere; a live build would deliver
          them to our wholesale team through a configured form service or
          backend endpoint.
        </p>
        <Button
          variant="outline"
          size="md"
          className="mt-6"
          onClick={() => {
            setSubmitted(false);
            setForm({
              name: '',
              company: '',
              email: '',
              phone: '',
              businessType: 'restaurant',
              productInterest: '',
              estimatedQuantity: '',
              deliveryLocation: '',
              message: '',
            });
          }}
        >
          Submit another enquiry
        </Button>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="space-y-6"
      aria-describedby="wholesale-demo-notice"
    >
      <div className="rounded-2xl-soft border border-forest-700/15 bg-cream/70 p-4">
        <p id="wholesale-demo-notice" className="flex items-start gap-3 text-sm text-forest-700/85">
          <ShieldAlert className="mt-0.5 h-4 w-4 text-terracotta-400" aria-hidden="true" />
          <span>
            <strong className="font-medium">Demo form.</strong> Validation runs,
            but your enquiry is not sent anywhere. A live build would route it
            through a configured form provider or backend endpoint.
          </span>
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Your name"
          id="name"
          autoComplete="name"
          value={form.name}
          onChange={(v) => onChange('name', v)}
          error={errors.name}
        />
        <Field
          label="Company"
          id="company"
          autoComplete="organization"
          value={form.company}
          onChange={(v) => onChange('company', v)}
          error={errors.company}
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
      <div>
        <label htmlFor="businessType" className="text-xs uppercase tracking-[0.18em] text-forest-700/55">
          Business type
        </label>
        <select
          id="businessType"
          value={form.businessType}
          onChange={(e) => onChange('businessType', e.target.value as WholesaleFormData['businessType'])}
          className="mt-2 w-full rounded-xl border border-forest-700/15 bg-cream px-4 py-2.5 text-sm text-forest-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700"
        >
          {BUSINESS_TYPES.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {errors.businessType && (
          <p className="mt-1.5 text-xs text-terracotta-500">{errors.businessType}</p>
        )}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Products of interest"
          id="productInterest"
          value={form.productInterest}
          onChange={(v) => onChange('productInterest', v)}
          error={errors.productInterest}
          placeholder="e.g. dried vegetables, spices"
        />
        <Field
          label="Estimated monthly quantity"
          id="estimatedQuantity"
          value={form.estimatedQuantity}
          onChange={(v) => onChange('estimatedQuantity', v)}
          error={errors.estimatedQuantity}
          placeholder="e.g. 50 kg"
        />
        <Field
          label="Delivery location"
          id="deliveryLocation"
          autoComplete="address-level2"
          value={form.deliveryLocation}
          onChange={(v) => onChange('deliveryLocation', v)}
          error={errors.deliveryLocation}
          className="sm:col-span-2"
          placeholder="City, state"
        />
      </div>
      <div>
        <label htmlFor="message" className="text-xs uppercase tracking-[0.18em] text-forest-700/55">
          Message (optional)
        </label>
        <textarea
          id="message"
          rows={4}
          maxLength={600}
          value={form.message ?? ''}
          onChange={(e) => onChange('message', e.target.value)}
          className="mt-2 w-full rounded-2xl border border-forest-700/15 bg-cream px-4 py-3 text-sm text-forest-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700"
        />
      </div>
      <Button type="submit" variant="primary" size="md" disabled={submitting}>
        {submitting ? 'Submitting…' : 'Submit enquiry (demo)'}
      </Button>
    </form>
  );
}

interface FieldProps {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  autoComplete?: string;
  error?: string;
  placeholder?: string;
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
  placeholder,
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
        placeholder={placeholder}
        aria-invalid={!!error}
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