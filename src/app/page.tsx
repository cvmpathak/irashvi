import type { Metadata } from 'next';
import { productRepository } from '@/services/catalogue/local-product-repository';
import { categoryRepository } from '@/services/catalogue/local-category-repository';
import { recipes } from '@/data/recipes';
import { siteSettings } from '@/data/site-settings';
import { Hero } from '@/components/sections/Hero';
import { CategoryShowcase } from '@/components/sections/CategoryShowcase';
import { FeaturedProducts } from '@/components/sections/FeaturedProducts';
import { BrandStory } from '@/components/sections/BrandStory';
import { RecipesSection } from '@/components/sections/RecipesSection';
import { WholesaleCTA } from '@/components/sections/WholesaleCTA';

export const metadata: Metadata = {
  title: `${siteSettings.brand.name} — ${siteSettings.brand.tagline}`,
  description:
    'Thoughtfully packed dried vegetables, vegetable powders, spices, cooking mixes, and pantry essentials for everyday kitchens and businesses.',
  alternates: {
    canonical: '/',
  },
};

export default async function HomePage() {
  const [categories, featuredProducts] = await Promise.all([
    categoryRepository.getAllCategories(),
    productRepository.getFeaturedProducts(),
  ]);
  return (
    <>
      <Hero />
      <CategoryShowcase categories={categories} />
      <FeaturedProducts products={featuredProducts} />
      <BrandStory />
      <RecipesSection recipes={recipes} />
      <WholesaleCTA />
    </>
  );
}