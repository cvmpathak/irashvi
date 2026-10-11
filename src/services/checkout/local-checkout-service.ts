import { checkoutSchema } from '@/lib/validation/checkout';
import type { CartItem } from '@/data/types';
import { productById } from '@/data/products';
import type {
  CheckoutConfirmation,
  CheckoutFormData,
  CheckoutService,
} from './types';

/**
 * LocalCheckoutService — DEMO ONLY.
 *
 * This implementation:
 *   - Validates the form with Zod.
 *   - Returns a synthetic reference id.
 *   - Does NOT persist the order.
 *   - Does NOT charge any payment method.
 *   - Does NOT transmit personal details anywhere.
 *
 * A future implementation will:
 *   - Persist the order to the database via the order repository.
 *   - Reserve inventory.
 *   - Initiate payment via the PaymentProvider interface.
 *   - Verify the webhook and mark the order paid.
 *   - Send a confirmation email.
 */
export class LocalCheckoutService implements CheckoutService {
  async submitDemoCheckout(
    items: CartItem[],
    form: CheckoutFormData,
  ): Promise<CheckoutConfirmation> {
    const validated = checkoutSchema.parse(form);

    const estimatedTotal = items.reduce((sum, item) => {
      const product = productById[item.productId];
      if (!product) return sum;
      const variant = product.variants.find((v) => v.id === item.variantId);
      if (!variant) return sum;
      return sum + variant.price * item.quantity;
    }, 0);

    const referenceId = `IR-DEMO-${Date.now().toString(36).toUpperCase()}`;

    return {
      referenceId,
      estimatedTotal,
      currency: 'INR',
      items,
      submittedAt: new Date().toISOString(),
      fullName: validated.fullName,
      email: validated.email,
    };
  }
}

export const checkoutService: CheckoutService = new LocalCheckoutService();