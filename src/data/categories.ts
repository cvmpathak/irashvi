import type { Category } from './types';

export const categories: Category[] = [
  {
    id: 'cat-dried-vegetables',
    slug: 'dried-vegetables',
    name: 'Dried Vegetables',
    description:
      'Sun-dried vegetables that retain colour, aroma, and flavour — ready to cook, store, and travel well.',
    hero:
      'Naturally dried vegetables for everyday kitchens — gentle on storage, generous on flavour.',
    image: {
      src: '/images/categories/dried-vegetables.svg',
      alt: 'Still life of dried carrot, peas and beetroot on a linen cloth',
      width: 1200,
      height: 800,
    },
  },
  {
    id: 'cat-vegetable-powders',
    slug: 'vegetable-powders',
    name: 'Vegetable Powders',
    description:
      'Fine vegetable powders for seasoning, colouring, and enriching everyday meals without additives.',
    hero: 'Pure vegetable powders — a quiet way to add depth, colour, and nutrition to a dish.',
    image: {
      src: '/images/categories/vegetable-powders.svg',
      alt: 'Wooden spoons holding fine vegetable powders beside a ceramic bowl',
      width: 1200,
      height: 800,
    },
  },
  {
    id: 'cat-spices-seasonings',
    slug: 'spices-seasonings',
    name: 'Spices & Seasonings',
    description:
      'Whole and ground spices — single-origin, carefully cleaned, and packaged to keep their oils intact.',
    hero: 'Spices that bring a kitchen to life, selected with patience and stored with care.',
    image: {
      src: '/images/categories/spices-seasonings.svg',
      alt: 'Spice jars lined on a wooden shelf',
      width: 1200,
      height: 800,
    },
  },
  {
    id: 'cat-cooking-mixes',
    slug: 'cooking-mixes',
    name: 'Cooking Mixes',
    description:
      'Thoughtfully blended mixes for curries, dals, rice, and grills — ready when you are.',
    hero: 'Blended cooking mixes for the dishes you keep returning to.',
    image: {
      src: '/images/categories/cooking-mixes.svg',
      alt: 'Ceramic jars filled with cooking spice mixes on a stone counter',
      width: 1200,
      height: 800,
    },
  },
  {
    id: 'cat-pantry-essentials',
    slug: 'pantry-essentials',
    name: 'Pantry Essentials',
    description:
      'Reliable everyday pantry items — pulses, flours, and staples packaged to stay fresh.',
    hero: 'Quiet, dependable pantry staples for a kitchen that runs smoothly.',
    image: {
      src: '/images/categories/pantry-essentials.svg',
      alt: 'Pantry shelves with jars of lentils and flour',
      width: 1200,
      height: 800,
    },
  },
  {
    id: 'cat-bulk-ingredients',
    slug: 'bulk-ingredients',
    name: 'Bulk Ingredients',
    description:
      'Larger pack formats for restaurants, retailers, and food businesses — same quality, larger volumes.',
    hero: 'Bulk formats for kitchens, cafés, and businesses that move quickly.',
    image: {
      src: '/images/categories/bulk-ingredients.svg',
      alt: 'Bulk fabric sacks holding grains and spices in a warehouse',
      width: 1200,
      height: 800,
    },
  },
];

export const categoryBySlug: Record<string, Category> = Object.fromEntries(
  categories.map((c) => [c.slug, c]),
);

export const categoryById: Record<string, Category> = Object.fromEntries(
  categories.map((c) => [c.id, c]),
);