import { PolicyPage, buildMetadata } from '@/components/ui/PolicyPage';

export const metadata = buildMetadata(
  'Terms & Conditions',
  'Terms and conditions for the Irashvi demo storefront.',
  '/terms-and-conditions',
);

export default function TermsPage() {
  return (
    <PolicyPage
      title="Terms & Conditions"
      description="Terms and conditions for the Irashvi demo storefront."
      canonical="/terms-and-conditions"
      effectiveDate="On launch"
      intro="These terms govern your use of the Irashvi demo storefront. They will be replaced with the live terms before any commercial launch."
      breadcrumbs={[{ label: 'Terms & Conditions', href: '/terms-and-conditions' }]}
      sections={[
        {
          heading: 'Demo only',
          body: [
            'This site is a demonstration storefront. No real products are sold, no real orders are placed, and no payments are taken.',
            'Pricing, availability, SKUs, and customer reviews shown on this site are sample data created to illustrate the experience.',
          ],
        },
        {
          heading: 'Acceptable use',
          body: [
            'You agree not to attempt to disrupt the storefront, scrape content beyond what is reasonable for personal use, or misrepresent your identity.',
          ],
        },
        {
          heading: 'Intellectual property',
          body: [
            'All Irashvi branding, copy, and product photography (where used) are illustrative. Replace these assets before publishing a live site.',
          ],
        },
        {
          heading: 'Limitation of liability',
          body: [
            'The demo site is provided "as is". To the extent permitted by law, Irashvi disclaims warranties of merchantability, fitness for purpose, and non-infringement.',
          ],
        },
        {
          heading: 'Governing law',
          body: [
            'These terms would, in a live deployment, be governed by the laws applicable to your registered business entity. This demo does not establish any such relationship.',
          ],
        },
      ]}
    />
  );
}