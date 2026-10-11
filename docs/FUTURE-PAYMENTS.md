# Future Payments

The current storefront **does not** process payments. There is no payment
gateway, no payment SDK, no payment credentials in the codebase, and no claim
that a successful checkout represents a paid order.

This document describes how to integrate a real provider later.

## Boundary

The integration sits behind `CheckoutService`. The existing interface is:

```ts
// src/services/checkout/types.ts
export interface CheckoutService {
  submitDemoCheckout(
    items: CartItem[],
    form: CheckoutFormData,
  ): Promise<CheckoutConfirmation>;
}
```

A future `PaymentCheckoutService` will extend that with:

```ts
export interface CheckoutService {
  submitDemoCheckout(...): Promise<CheckoutConfirmation>;
  createOrder(...): Promise<{ orderId: string; reference: string }>;
  createPayment(orderId: string): Promise<PaymentIntent>;
  verifyWebhook(payload: string, signature: string): Promise<void>;
}
```

## Provider

The recommended provider is one that supports INR and the operating region.
Razorpay, Stripe (with the India product), and Pinelabs are all viable
choices. Pick one and adapt the boundary above.

## Server-side responsibilities

- **Pricing**: always recompute totals against the database. Never trust the
  browser.
- **Inventory reservation**: hold stock while a payment is in flight.
- **Idempotency**: create orders with stable client-supplied keys so retries
  don't double-charge.
- **Webhook verification**: use the provider's signature verification on the
  server. The webhook is the only source of truth for "payment succeeded".

## What must never happen

- Collect or store card numbers, CVV, or bank credentials in your own
  database. The provider's hosted checkout handles this.
- Mark an order as paid before the webhook confirms it.
- Pretend a demo confirmation is a real payment success.
- Trigger a "payment succeeded" UI flow from the client.

## UI integration

`CheckoutForm` already shows a placeholder payment section explaining the demo
limitation. The same component can be wrapped in a server action that calls
`paymentService.createPayment(orderId)` and redirects to the provider's
hosted checkout.

On return, the success page reads the real order by reference id and shows a
real confirmation.

## Testing

When the provider is wired in:

- Use the provider's test mode keys.
- Verify webhook signature handling with the provider's signature test
  vectors.
- Add an integration test that exercises the full flow against a sandbox
  account.