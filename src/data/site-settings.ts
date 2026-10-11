import type { SiteSettings } from './types';

export const siteSettings: SiteSettings = {
  brand: {
    name: 'Irashvi',
    tagline: 'Goodness, thoughtfully packed.',
    // Placeholder contact details — clearly identified as demonstration data.
    email: 'hello@irashvi.example',
    phone: '+91 00000 00000',
    address: 'Sample Address Line, City, State, PIN',
    socials: [
      { label: 'Instagram', href: 'https://instagram.com/example' },
      { label: 'LinkedIn', href: 'https://linkedin.com/company/example' },
    ],
  },
  announcement: {
    enabled: true,
    message:
      'Demo storefront — products, prices, and availability are illustrative only.',
  },
  navigation: {
    primary: [
      { label: 'Shop', href: '/shop', description: 'Browse the full catalogue' },
      {
        label: 'Categories',
        href: '/categories/dried-vegetables',
        description: 'Shop by category',
      },
      { label: 'Our Story', href: '/our-story', description: 'The Irashvi story' },
      { label: 'Recipes', href: '/recipes', description: 'Simple, seasonal ideas' },
      { label: 'Wholesale', href: '/wholesale', description: 'Bulk and B2B enquiries' },
      { label: 'Journal', href: '/journal', description: 'Notes from the pantry' },
    ],
    footer: [
      {
        heading: 'Shop',
        links: [
          { label: 'All products', href: '/shop' },
          { label: 'Dried Vegetables', href: '/categories/dried-vegetables' },
          { label: 'Vegetable Powders', href: '/categories/vegetable-powders' },
          { label: 'Spices & Seasonings', href: '/categories/spices-seasonings' },
          { label: 'Cooking Mixes', href: '/categories/cooking-mixes' },
          { label: 'Pantry Essentials', href: '/categories/pantry-essentials' },
          { label: 'Bulk Ingredients', href: '/categories/bulk-ingredients' },
        ],
      },
      {
        heading: 'Company',
        links: [
          { label: 'Our Story', href: '/our-story' },
          { label: 'Recipes', href: '/recipes' },
          { label: 'Journal', href: '/journal' },
          { label: 'Wholesale', href: '/wholesale' },
          { label: 'Contact', href: '/contact' },
        ],
      },
      {
        heading: 'Help',
        links: [
          { label: 'FAQ', href: '/faq' },
          { label: 'Shipping Policy', href: '/shipping-policy' },
          { label: 'Returns & Refunds', href: '/returns-refunds' },
          { label: 'Privacy Policy', href: '/privacy-policy' },
          { label: 'Terms & Conditions', href: '/terms-and-conditions' },
        ],
      },
    ],
  },
  policies: {
    shipping:
      'This demo storefront does not process orders. The text below describes the policy you would publish with your live shipping integration.',
    returns:
      'Because no real order is placed on this demo storefront, returns and refunds are illustrative only.',
    privacy:
      'Irashvi takes privacy seriously. The demo storefront does not collect or transmit personal information beyond your browser session.',
    terms:
      'These terms govern your use of the Irashvi demo storefront. They will be replaced with the live terms before any commercial launch.',
  },
  faqs: [
    {
      id: 'faq-demo-pricing',
      question: 'Are the prices on this site real?',
      answer:
        'No. Prices, SKUs, and availability on this site are illustrative. No order is actually placed or charged — checkout is a demonstration flow.',
    },
    {
      id: 'faq-data-storage',
      question: 'Where is my data stored?',
      answer:
        'Cart state stays in your browser (localStorage). We do not transmit it to a server. Wholesale enquiries are validated but not actually submitted anywhere.',
    },
    {
      id: 'faq-wholesale',
      question: 'How do wholesale enquiries work?',
      answer:
        'The wholesale form is a demonstration. It validates your input and shows a confirmation, but it does not currently send your details to anyone.',
    },
    {
      id: 'faq-images',
      question: 'Why are product images illustrated?',
      answer:
        'To keep the demo self-contained and offline-friendly, we use illustrative placeholders. A live launch will replace these with product photography.',
    },
    {
      id: 'faq-source',
      question: 'Where do the products come from?',
      answer:
        'The product catalogue is a small, hand-curated demo list stored in src/data. It is clearly identified as demonstration data and can be replaced or extended freely.',
    },
  ],
};