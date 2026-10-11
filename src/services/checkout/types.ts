import type { CartItem } from '@/data/types';

export interface CheckoutFormData {
  fullName: string;
  email: string;
  phone: string;
  addressLine: string;
  city: string;
  state: string;
  pinCode: string;
  notes?: string;
}

export interface CheckoutConfirmation {
  /** Synthetic reference, only suitable for display in the demo flow. */
  referenceId: string;
  estimatedTotal: number;
  currency: 'INR';
  items: CartItem[];
  submittedAt: string;
  fullName: string;
  email: string;
}

/**
 * Integration boundary for future payment + order persistence.
 *
 * The current demo implementation only validates the form and returns a
 * confirmation. It MUST NOT claim that a real order was placed, that a
 * payment was processed, or that data was transmitted to a third party.
 */
export interface CheckoutService {
  /**
   * Validate form data with Zod and return a structured confirmation.
   * Throws a ZodError on invalid input.
   */
  submitDemoCheckout(
    items: CartItem[],
    form: CheckoutFormData,
  ): Promise<CheckoutConfirmation>;
}