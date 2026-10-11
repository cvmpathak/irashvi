import { describe, expect, it } from 'vitest';
import { checkoutSchema } from '@/lib/validation/checkout';
import { wholesaleSchema } from '@/lib/validation/wholesale';

const validCheckout = {
  fullName: 'Shivam Pathak',
  email: 'shivam@example.com',
  phone: '+91 98765 43210',
  addressLine: '4 Sample Lane',
  city: 'Pune',
  state: 'Maharashtra',
  pinCode: '411014',
  notes: '',
};

describe('checkoutSchema', () => {
  it('accepts a complete, well-formed form', () => {
    const parsed = checkoutSchema.safeParse(validCheckout);
    expect(parsed.success).toBe(true);
  });

  it('rejects invalid email', () => {
    const parsed = checkoutSchema.safeParse({ ...validCheckout, email: 'not-an-email' });
    expect(parsed.success).toBe(false);
  });

  it('rejects invalid phone characters', () => {
    const parsed = checkoutSchema.safeParse({ ...validCheckout, phone: 'abc' });
    expect(parsed.success).toBe(false);
  });

  it('requires a name of at least two characters', () => {
    const parsed = checkoutSchema.safeParse({ ...validCheckout, fullName: 'A' });
    expect(parsed.success).toBe(false);
  });

  it('accepts valid alphanumeric postal codes', () => {
    const parsed = checkoutSchema.safeParse({ ...validCheckout, pinCode: '411014' });
    expect(parsed.success).toBe(true);
  });

  it('rejects an empty pin code', () => {
    const parsed = checkoutSchema.safeParse({ ...validCheckout, pinCode: '' });
    expect(parsed.success).toBe(false);
  });
});

describe('wholesaleSchema', () => {
  const valid = {
    name: 'Asha Rao',
    company: 'Greenleaf Kitchens',
    email: 'asha@example.com',
    phone: '+91 99000 12345',
    businessType: 'restaurant' as const,
    productInterest: 'Dried vegetables, spices',
    estimatedQuantity: '50 kg / month',
    deliveryLocation: 'Bengaluru',
    message: '',
  };

  it('accepts a valid submission', () => {
    const parsed = wholesaleSchema.safeParse(valid);
    expect(parsed.success).toBe(true);
  });

  it('rejects an invalid business type', () => {
    const parsed = wholesaleSchema.safeParse({
      ...valid,
      businessType: 'unknown' as unknown as typeof valid.businessType,
    });
    expect(parsed.success).toBe(false);
  });

  it('rejects an invalid email', () => {
    const parsed = wholesaleSchema.safeParse({ ...valid, email: 'no-at-symbol' });
    expect(parsed.success).toBe(false);
  });
});