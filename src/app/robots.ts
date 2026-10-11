import type { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://irashvi.example';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/cart', '/checkout', '/checkout/success', '/checkout/cancelled'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}