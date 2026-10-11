import { PolicyPage, buildMetadata } from '@/components/ui/PolicyPage';

export const metadata = buildMetadata(
  'Shipping Policy',
  'Shipping policy for the Irashvi demo storefront. No real orders are placed in this build.',
  '/shipping-policy',
);

export default function ShippingPolicyPage() {
  return (
    <PolicyPage
      title="Shipping Policy"
      description="Shipping policy for the Irashvi demo storefront."
      canonical="/shipping-policy"
      effectiveDate="On launch"
      intro="This demo storefront does not process orders. The shipping policy below describes the experience a live deployment would offer."
      breadcrumbs={[{ label: 'Shipping Policy', href: '/shipping-policy' }]}
      sections={[
        {
          heading: 'Order processing',
          body: [
            'In the live deployment, orders placed before the daily cut-off would be processed within one business day. You would receive an email confirmation with a tracking link as soon as your order leaves our facility.',
            'During promotional periods or local holidays, processing may take an additional day. We will communicate any delays proactively.',
          ],
        },
        {
          heading: 'Delivery timelines',
          body: [
            'Standard delivery: 3–7 business days within India, depending on your delivery PIN code.',
            'Express delivery: 1–3 business days within major metros, where available.',
            'Wholesale and bulk orders: timelines would be confirmed at the time of order confirmation.',
          ],
        },
        {
          heading: 'Shipping fees',
          body: [
            'Shipping fees in this demo build are a placeholder ₹79 estimate. A live deployment would calculate shipping from your PIN code and chosen courier partner.',
            'Free shipping thresholds (if any) would be displayed at checkout.',
          ],
        },
        {
          heading: 'Serviceable PIN codes',
          body: [
            'Most PIN codes across India are serviceable. Remote or restricted regions may require additional time or be unavailable for certain products.',
          ],
        },
      ]}
    />
  );
}