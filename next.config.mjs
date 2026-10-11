/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      // Future CDN support; intentionally empty for the demo phase.
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'motion'],
  },
};

export default nextConfig;