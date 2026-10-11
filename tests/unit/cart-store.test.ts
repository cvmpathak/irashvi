import { describe, expect, it, beforeEach } from 'vitest';
import { LocalCheckoutService } from '@/services/checkout/local-checkout-service';
import { productById } from '@/data/products';

const service = new LocalCheckoutService();

const baseForm = {
  fullName: 'Shivam Pathak',
  email: 'shivam@example.com',
  phone: '+91 98765 43210',
  addressLine: '4 Sample Lane',
  city: 'Pune',
  state: 'Maharashtra',
  pinCode: '411014',
  notes: '',
};

const product = productById['prod-dried-carrot']!;
const variant = product.variants[0];

describe('LocalCheckoutService', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('produces a synthetic confirmation with the expected total', async () => {
    const confirmation = await service.submitDemoCheckout(
      [{ productId: product.id, variantId: variant.id, quantity: 2 }],
      baseForm,
    );
    expect(confirmation.estimatedTotal).toBe(variant.price * 2);
    expect(confirmation.referenceId).toMatch(/IR-DEMO-/);
  });

  it('throws on invalid input', async () => {
    await expect(
      service.submitDemoCheckout(
        [{ productId: product.id, variantId: variant.id, quantity: 1 }],
        { ...baseForm, email: 'invalid' },
      ),
    ).rejects.toBeTruthy();
  });

  it('ignores unknown items in totals', async () => {
    const confirmation = await service.submitDemoCheckout(
      [
        { productId: product.id, variantId: variant.id, quantity: 1 },
        { productId: 'missing', variantId: 'missing', quantity: 99 },
      ],
      baseForm,
    );
    expect(confirmation.estimatedTotal).toBe(variant.price);
  });
});