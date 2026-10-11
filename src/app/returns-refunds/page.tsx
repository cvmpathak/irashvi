import { PolicyPage, buildMetadata } from '@/components/ui/PolicyPage';

export const metadata = buildMetadata(
  'Returns & Refunds',
  'Returns and refunds policy for the Irashvi demo storefront.',
  '/returns-refunds',
);

export default function ReturnsPolicyPage() {
  return (
    <PolicyPage
      title="Returns & Refunds"
      description="Returns and refunds policy for the Irashvi demo storefront."
      canonical="/returns-refunds"
      effectiveDate="On launch"
      intro="No real order is placed on this demo storefront. The policy below describes how returns and refunds would be handled in a live deployment."
      breadcrumbs={[{ label: 'Returns & Refunds', href: '/returns-refunds' }]}
      sections={[
        {
          heading: 'Eligibility',
          body: [
            'Unopened, sealed products in their original packaging can be returned within 7 days of delivery.',
            'Damaged or incorrect items must be reported within 48 hours of delivery with a photograph of the package and product.',
          ],
        },
        {
          heading: 'Process',
          body: [
            'Email us at the address on the Contact page with your order reference and the issue you experienced. We will respond within 1 business day.',
            'Approved returns would be collected from your delivery address or dropped off at a partner location, depending on your PIN code.',
          ],
        },
        {
          heading: 'Refunds',
          body: [
            'Refunds would be processed to the original payment method within 5–7 business days of receiving the returned product.',
            'For wholesale orders, refunds and replacements would be agreed at the time of order confirmation.',
          ],
        },
      ]}
    />
  );
}