import type { Metadata } from 'next';
import { AnnouncementStrip } from '@/components/layout/AnnouncementStrip';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { CartProvider } from '@/features/cart/cart-context';
import { siteSettings } from '@/data/site-settings';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://irashvi.example'),
  title: {
    default: `${siteSettings.brand.name} — ${siteSettings.brand.tagline}`,
    template: `%s · ${siteSettings.brand.name}`,
  },
  description:
    'Irashvi — packaged food ingredients for everyday kitchens and businesses. Dried vegetables, vegetable powders, spices, cooking mixes, and pantry essentials.',
  applicationName: siteSettings.brand.name,
  keywords: [
    'dried vegetables',
    'vegetable powders',
    'spices',
    'cooking mixes',
    'pantry essentials',
    'bulk ingredients',
    'Irashvi',
  ],
  authors: [{ name: siteSettings.brand.name }],
  creator: siteSettings.brand.name,
  openGraph: {
    type: 'website',
    siteName: siteSettings.brand.name,
    title: `${siteSettings.brand.name} — ${siteSettings.brand.tagline}`,
    description:
      'Thoughtfully packed dried vegetables, powders, spices, mixes, and pantry staples.',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteSettings.brand.name} — ${siteSettings.brand.tagline}`,
    description:
      'Thoughtfully packed dried vegetables, powders, spices, mixes, and pantry staples.',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/images/brand/irashvi-logo.png', type: 'image/png' },
    ],
    apple: [{ url: '/images/brand/irashvi-logo.png' }],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: '#263C2B',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <a
          href="#main-content"
          className="sr-only-focusable fixed left-4 top-4 z-[60] rounded-md bg-forest-700 px-3 py-2 text-sm text-cream"
        >
          Skip to main content
        </a>
        <CartProvider>
          <AnnouncementStrip />
          <Header />
          <main id="main-content" className="min-h-[60vh]">
            {children}
          </main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}