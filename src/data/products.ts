import type { Product } from './types';

/**
 * Local demonstration product catalogue.
 *
 * Pricing, availability, and SKUs in this file are SAMPLE DATA only.
 * They exist to make the storefront interactive and are not commercial offers.
 */

const placeholderImage = (id: string) => ({
  src: `/images/products/${id}.svg`,
  alt: 'Product illustration placeholder',
  width: 1000,
  height: 1000,
});

export const products: Product[] = [
  {
    id: 'prod-dried-carrot',
    slug: 'dried-carrot',
    name: 'Dried Carrot',
    shortDescription:
    'Sweet, sun-dried carrot cubes — a vivid, ready-to-cook pantry staple.',
    description:
    'Our dried carrot is cut from mature roots, gently sun-dried, and packaged to keep its natural sweetness. Rehydrate in warm water for soups, stews, and rice dishes, or grind for a fine, naturally coloured powder.',
    categoryId: 'cat-dried-vegetables',
    images: [placeholderImage('dried-carrot')],
    variants: [
      {
        id: 'var-dried-carrot-100g',
        packSize: '100 g',
        price: 220,
        sku: 'IR-DRC-100',
        availability: 'in_stock',
      },
      {
        id: 'var-dried-carrot-250g',
        packSize: '250 g',
        price: 480,
        sku: 'IR-DRC-250',
        availability: 'in_stock',
      },
      {
        id: 'var-dried-carrot-1kg',
        packSize: '1 kg',
        price: 1650,
        sku: 'IR-DRC-1K',
        availability: 'low_stock',
      },
    ],
    ingredients: ['Carrot (100%)'],
    netQuantity: '100 g / 250 g / 1 kg',
    usageInstructions:
    'Rinse briefly, soak in warm water for 10–15 minutes, and use as you would fresh carrot.',
    storageInstructions: 'Store in a cool, dry place away from direct sunlight.',
    shelfLife: 'Best within 9 months of packaging.',
    availability: 'in_stock',
    featured: true,
    createdAt: '2026-05-04',
  },
  {
    id: 'prod-dried-green-peas',
    slug: 'dried-green-peas',
    name: 'Dried Green Peas',
    shortDescription:
    'Whole dried green peas — a versatile base for curries, soups, and snacks.',
    description:
    'Plump, carefully cleaned green peas dried at peak season. They hold their shape when cooked and bring a gentle, natural sweetness to everyday dishes.',
    categoryId: 'cat-dried-vegetables',
    images: [placeholderImage('dried-green-peas')],
    variants: [
      {
        id: 'var-dgp-250g',
        packSize: '250 g',
        price: 160,
        sku: 'IR-DGP-250',
        availability: 'in_stock',
      },
      {
        id: 'var-dgp-500g',
        packSize: '500 g',
        price: 290,
        sku: 'IR-DGP-500',
        availability: 'in_stock',
      },
      {
        id: 'var-dgp-2kg',
        packSize: '2 kg',
        price: 1050,
        sku: 'IR-DGP-2K',
        availability: 'in_stock',
      },
    ],
    ingredients: ['Green peas (100%)'],
    netQuantity: '250 g / 500 g / 2 kg',
    usageInstructions: 'Soak overnight or pressure-cook for 3–4 whistles before use.',
    storageInstructions: 'Store sealed in a cool, dry place.',
    shelfLife: 'Best within 12 months of packaging.',
    availability: 'in_stock',
    featured: true,
    createdAt: '2026-05-04',
  },
  {
    id: 'prod-mixed-dried-vegetables',
    slug: 'mixed-dried-vegetables',
    name: 'Mixed Dried Vegetables',
    shortDescription:
    'A blend of carrot, peas, beans, and corn — a ready base for one-pot meals.',
    description:
    'A balanced blend of dried vegetables for everyday cooking. Soak the mix together and add directly to rice, khichdi, soups, or pasta for a colourful, satisfying meal.',
    categoryId: 'cat-dried-vegetables',
    images: [placeholderImage('mixed-dried-vegetables')],
    variants: [
      {
        id: 'var-mdv-200g',
        packSize: '200 g',
        price: 280,
        sku: 'IR-MDV-200',
        availability: 'in_stock',
      },
      {
        id: 'var-mdv-500g',
        packSize: '500 g',
        price: 640,
        sku: 'IR-MDV-500',
        availability: 'in_stock',
      },
    ],
    ingredients: ['Carrot, Green Peas, French Beans, Sweet Corn (in varying proportions).'],
    netQuantity: '200 g / 500 g',
    usageInstructions: 'Soak 20 minutes in warm water, drain, and cook as desired.',
    storageInstructions: 'Keep sealed in a cool, dry place.',
    shelfLife: 'Best within 9 months of packaging.',
    availability: 'in_stock',
    featured: true,
    createdAt: '2026-05-10',
  },
  {
    id: 'prod-beetroot-powder',
    slug: 'beetroot-powder',
    name: 'Beetroot Powder',
    shortDescription:
    'Fine beetroot powder — natural colour and gentle sweetness for drinks, doughs, and seasonings.',
    description:
    'Stone-ground from dried beetroot, this powder brings a deep, natural colour and earthy sweetness to lassi, smoothies, parathas, and savoury batters. No additives, no fillers.',
    categoryId: 'cat-vegetable-powders',
    images: [placeholderImage('beetroot-powder')],
    variants: [
      {
        id: 'var-brp-100g',
        packSize: '100 g',
        price: 240,
        sku: 'IR-BRP-100',
        availability: 'in_stock',
      },
      {
        id: 'var-brp-250g',
        packSize: '250 g',
        price: 540,
        sku: 'IR-BRP-250',
        availability: 'in_stock',
      },
    ],
    ingredients: ['Beetroot (100%)'],
    netQuantity: '100 g / 250 g',
    usageInstructions: 'Use 1–2 teaspoons per serving. Mix with water or milk before adding to recipes.',
    storageInstructions: 'Store sealed, away from moisture and direct sunlight.',
    shelfLife: 'Best within 9 months of packaging.',
    availability: 'in_stock',
    featured: true,
    createdAt: '2026-05-12',
  },
  {
    id: 'prod-turmeric-powder',
    slug: 'turmeric-powder',
    name: 'Turmeric Powder',
    shortDescription:
    'Stone-ground turmeric — vivid colour, warm aroma, ready for everyday cooking.',
    description:
    'Cleaned, dried, and stone-ground in small batches. Our turmeric brings a warm, slightly bitter aroma and a deep golden colour to dals, vegetables, and rice.',
    categoryId: 'cat-spices-seasonings',
    images: [placeholderImage('turmeric-powder')],
    variants: [
      {
        id: 'var-trp-100g',
        packSize: '100 g',
        price: 150,
        sku: 'IR-TRP-100',
        availability: 'in_stock',
      },
      {
        id: 'var-trp-250g',
        packSize: '250 g',
        price: 340,
        sku: 'IR-TRP-250',
        availability: 'in_stock',
      },
      {
        id: 'var-trp-1kg',
        packSize: '1 kg',
        price: 1180,
        sku: 'IR-TRP-1K',
        availability: 'in_stock',
      },
    ],
    ingredients: ['Turmeric (100%)'],
    netQuantity: '100 g / 250 g / 1 kg',
    usageInstructions: 'Use a pinch to taste; bloom in fat for best aroma.',
    storageInstructions: 'Keep sealed in a cool, dry place.',
    shelfLife: 'Best within 12 months of packaging.',
    availability: 'in_stock',
    featured: true,
    createdAt: '2026-05-12',
  },
  {
    id: 'prod-cumin-seeds',
    slug: 'cumin-seeds',
    name: 'Cumin Seeds',
    shortDescription:
    'Whole cumin seeds — dry-roasted for tempering dals, vegetables, and rice.',
    description:
    'Plump, fragrant cumin seeds, cleaned and sorted by hand. Toast briefly in oil to release their full aroma before adding to a dish.',
    categoryId: 'cat-spices-seasonings',
    images: [placeholderImage('cumin-seeds')],
    variants: [
      {
        id: 'var-cms-100g',
        packSize: '100 g',
        price: 130,
        sku: 'IR-CMS-100',
        availability: 'in_stock',
      },
      {
        id: 'var-cms-500g',
        packSize: '500 g',
        price: 560,
        sku: 'IR-CMS-500',
        availability: 'in_stock',
      },
    ],
    ingredients: ['Cumin seeds (100%)'],
    netQuantity: '100 g / 500 g',
    usageInstructions: 'Dry-roast for 20–30 seconds, then crush or use whole.',
    storageInstructions: 'Store sealed, away from moisture.',
    shelfLife: 'Best within 12 months of packaging.',
    availability: 'in_stock',
    featured: false,
    createdAt: '2026-05-15',
  },
  {
    id: 'prod-mixed-seasoning',
    slug: 'mixed-seasoning',
    name: 'Mixed Seasoning',
    shortDescription:
    'A balanced everyday seasoning — toasted cumin, coriander, fennel, and mild chilli.',
    description:
    'A versatile seasoning blend built around toasted whole spices. Sprinkle over roasted vegetables, eggs, soups, or salads; or stir into rice and doughs for a quiet, warm flavour.',
    categoryId: 'cat-cooking-mixes',
    images: [placeholderImage('mixed-seasoning')],
    variants: [
      {
        id: 'var-mxs-100g',
        packSize: '100 g',
        price: 180,
        sku: 'IR-MXS-100',
        availability: 'in_stock',
      },
      {
        id: 'var-mxs-250g',
        packSize: '250 g',
        price: 410,
        sku: 'IR-MXS-250',
        availability: 'low_stock',
      },
    ],
    ingredients: ['Cumin, Coriander, Fennel, Chilli, Black Pepper, Turmeric, Salt.'],
    netQuantity: '100 g / 250 g',
    usageInstructions: 'Sprinkle 1/2 to 1 teaspoon per portion, or to taste.',
    storageInstructions: 'Store sealed in a cool, dry place.',
    shelfLife: 'Best within 9 months of packaging.',
    availability: 'in_stock',
    featured: true,
    createdAt: '2026-05-18',
  },
  {
    id: 'prod-dal-tadka-mix',
    slug: 'dal-tadka-mix',
    name: 'Dal Tadka Mix',
    shortDescription:
    'A complete tempering mix for dals — toasted spices, garlic, and a hint of asafoetida.',
    description:
    'Everything you need to finish a dal — ready in one spoon. Bloom the mix in ghee or oil and pour over cooked lentils for a fragrant, restaurant-style tadka.',
    categoryId: 'cat-cooking-mixes',
    images: [placeholderImage('dal-tadka-mix')],
    variants: [
      {
        id: 'var-dtm-150g',
        packSize: '150 g',
        price: 220,
        sku: 'IR-DTM-150',
        availability: 'in_stock',
      },
      {
        id: 'var-dtm-400g',
        packSize: '400 g',
        price: 540,
        sku: 'IR-DTM-400',
        availability: 'in_stock',
      },
    ],
    ingredients: ['Cumin, Mustard, Garlic, Asafoetida, Chilli, Curry Leaves, Salt.'],
    netQuantity: '150 g / 400 g',
    usageInstructions: 'Heat 1 tablespoon ghee, add 2 teaspoons of mix, pour over cooked dal.',
    storageInstructions: 'Store sealed in a cool, dry place.',
    shelfLife: 'Best within 9 months of packaging.',
    availability: 'in_stock',
    featured: false,
    createdAt: '2026-05-20',
  },
  {
    id: 'prod-besan',
    slug: 'besan',
    name: 'Besan (Gram Flour)',
    shortDescription:
    'Fine gram flour — smooth texture for pakoras, kadhi, sweets, and batters.',
    description:
    'Stone-milled from cleaned chickpeas, our besan is light in colour and smooth in texture. A staple for everyday Indian cooking.',
    categoryId: 'cat-pantry-essentials',
    images: [placeholderImage('besan')],
    variants: [
      {
        id: 'var-bes-500g',
        packSize: '500 g',
        price: 180,
        sku: 'IR-BES-500',
        availability: 'in_stock',
      },
      {
        id: 'var-bes-1kg',
        packSize: '1 kg',
        price: 320,
        sku: 'IR-BES-1K',
        availability: 'in_stock',
      },
    ],
    ingredients: ['Chickpea flour (100%)'],
    netQuantity: '500 g / 1 kg',
    usageInstructions: 'Use directly in batters, kadhi, sweets, and dry-roasted snacks.',
    storageInstructions: 'Store sealed in a cool, dry place.',
    shelfLife: 'Best within 6 months of packaging.',
    availability: 'in_stock',
    featured: false,
    createdAt: '2026-05-22',
  },
];

export const productBySlug: Record<string, Product> = Object.fromEntries(
  products.map((p) => [p.slug, p]),
);

export const productById: Record<string, Product> = Object.fromEntries(
  products.map((p) => [p.id, p]),
);