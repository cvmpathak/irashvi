import type { Recipe } from './types';

export const recipes: Recipe[] = [
  {
    id: 'recipe-mixed-veg-khichdi',
    slug: 'mixed-vegetable-khichdi',
    title: 'Mixed Vegetable Khichdi',
    summary:
    'A one-pot khichdi made with dried vegetables, rice, and a warm tempering.',
    'description':
    'Khichdi is a humble, nourishing one-pot meal. Soaking our mixed dried vegetables briefly brings them back to life, and a quick tadka finishes the dish.',
    timeMinutes: 35,
    servings: 4,
    difficulty: 'easy',
    ingredients: [
      '1 cup Mixed Dried Vegetables (IR-MDV-200)',
      '1 cup rice',
      '1/2 cup yellow moong dal',
      '1 teaspoon Turmeric Powder (IR-TRP-100)',
      '1 teaspoon Cumin Seeds (IR-CMS-100)',
      '1 tablespoon ghee',
      'Salt to taste',
    ],
    steps: [
      'Soak the dried vegetables in warm water for 15 minutes. Drain.',
      'Pressure-cook rice, dal, vegetables, salt and turmeric with 5 cups of water for 4 whistles.',
      'Heat ghee in a small ladle, add the cumin seeds, and pour over the khichdi. Stir and serve.',
    ],
    relatedProductIds: ['prod-mixed-dried-vegetables', 'prod-turmeric-powder', 'prod-cumin-seeds'],
    image: {
      src: '/images/products/mixed-dried-vegetables.svg',
      alt: 'Bowl of mixed vegetable khichdi with a spoon',
      width: 1200,
      height: 800,
    },
    createdAt: '2026-05-30',
  },
  {
    id: 'recipe-beetroot-paratha',
    slug: 'beetroot-paratha',
    title: 'Beetroot Paratha',
    summary:
    'A colourful flatbread made with whole wheat flour and fine beetroot powder.',
    description:
    'Beetroot powder gives the dough a beautiful colour without any artificial colouring. Pair with yogurt and a simple pickle.',
    timeMinutes: 30,
    servings: 4,
    difficulty: 'easy',
    ingredients: [
      '2 cups whole wheat flour',
      '2 tablespoons Beetroot Powder (IR-BRP-100)',
      '1 teaspoon salt',
      '1 tablespoon oil, plus more for cooking',
      'Warm water as needed',
    ],
    steps: [
      'Mix the flour, beetroot powder, salt, and oil. Add warm water gradually and knead to a soft dough.',
      'Rest the dough for 15 minutes.',
      'Divide, roll, and cook on a hot tawa with a little oil until both sides are golden.',
    ],
    relatedProductIds: ['prod-beetroot-powder'],
    image: {
      src: '/images/products/beetroot-powder.svg',
      alt: 'Stack of pink beetroot parathas on a wooden plate',
      width: 1200,
      height: 800,
    },
    createdAt: '2026-06-02',
  },
  {
    id: 'recipe-seasoned-roast-vegetables',
    slug: 'seasoned-roast-vegetables',
    title: 'Seasoned Roast Vegetables',
    summary:
    'Tray of seasonal vegetables tossed with our Mixed Seasoning and roasted until golden.',
    description:
    'A simple weeknight tray that works with whatever vegetables you have. The seasoning blend carries warm, toasted notes without overpowering the vegetables.',
    timeMinutes: 40,
    servings: 4,
    difficulty: 'easy',
    ingredients: [
      '500 g mixed vegetables (potato, cauliflower, carrot, beans)',
      '2 teaspoons Mixed Seasoning (IR-MXS-100)',
      '2 tablespoons oil',
      'Salt to taste',
    ],
    steps: [
      'Preheat oven to 200°C.',
      'Cut vegetables into bite-sized pieces, toss with oil, salt, and the seasoning.',
      'Spread on a tray and cook for 25–30 minutes, turning once, until tender and golden.',
    ],
    relatedProductIds: ['prod-mixed-seasoning'],
    image: {
      src: '/images/products/mixed-seasoning.svg',
      alt: 'Tray of golden roast vegetables on a stone counter',
      width: 1200,
      height: 800,
    },
    createdAt: '2026-06-04',
  },
];

export const recipeBySlug: Record<string, Recipe> = Object.fromEntries(
  recipes.map((r) => [r.slug, r]),
);