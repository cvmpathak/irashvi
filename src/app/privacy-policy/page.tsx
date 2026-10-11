import { PolicyPage, buildMetadata } from '@/components/ui/PolicyPage';

export const metadata = buildMetadata(
  'Privacy Policy',
  'Privacy policy for the Irashvi demo storefront.',
  '/privacy-policy',
);

export default function PrivacyPolicyPage() {
  return (
    <PolicyPage
      title="Privacy Policy"
      description="Privacy policy for the Irashvi demo storefront."
      canonical="/privacy-policy"
      effectiveDate="On launch"
      intro="This demo storefront does not transmit personal data to a server. Cart contents are stored in your browser via localStorage, and the demo checkout does not submit your details anywhere."
      breadcrumbs={[{ label: 'Privacy Policy', href: '/privacy-policy' }]}
      sections={[
        {
          heading: 'What we store in this demo',
          body: [
            'Cart items are saved in your browser via localStorage so that your cart survives a refresh. You can clear your cart at any time using the "Clear cart" action.',
            'The wholesale and checkout forms validate your input locally using Zod. The wholesale form does not transmit any data, and the checkout form returns a synthetic reference id for display only.',
          ],
        },
        {
          heading: 'What a live deployment would collect',
          body: [
            'A live deployment would collect only the data necessary to fulfil your order or respond to your enquiry. This includes the details you enter in the checkout or wholesale forms.',
            'Payment details would be collected directly by the chosen payment processor and never stored on Irashvi servers.',
          ],
        },
        {
          heading: 'Cookies and analytics',
          body: [
            'The demo build does not set tracking cookies or run third-party scripts. A future deployment may use privacy-respecting analytics; any change to this policy would be reflected here.',
          ],
        },
        {
          heading: 'Contact',
          body: [
            'Questions about this policy can be sent to the contact details listed on the Contact page.',
          ],
        },
      ]}
    />
  );
}