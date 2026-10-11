import type { JournalEntry } from './types';

export const journalEntries: JournalEntry[] = [
  {
    id: 'journal-drying-tradition',
    slug: 'a-quiet-tradition-of-drying',
    title: 'A Quiet Tradition of Drying',
    summary:
    'Drying food is one of the oldest ways of looking after a harvest. Here is how we think about it.',
    body:
    'Drying food is one of the oldest ways of looking after a harvest. Long before refrigeration, communities relied on sun, wind, and patience to keep food for leaner weeks. We treat drying as a slow, deliberate craft — a way of preserving colour, aroma, and a sense of season.',
    readingMinutes: 4,
    tag: 'Craft',
    image: {
      src: '/images/categories/dried-vegetables.svg',
      alt: 'Sun-dried vegetables on a tray',
      width: 1200,
      height: 800,
    },
    createdAt: '2026-04-12',
  },
  {
    id: 'journal-pantry-as-care',
    slug: 'the-pantry-as-a-form-of-care',
    title: 'The Pantry as a Form of Care',
    summary:
    'A well-kept pantry is a quiet form of hospitality — for yourself and the people you cook for.',
    body:
    'A well-kept pantry is a quiet form of hospitality. When you know what is on your shelf, you cook with confidence. This short note shares a few of the rhythms that keep our pantry steady.',
    readingMinutes: 3,
    tag: 'Pantry',
    image: {
      src: '/images/categories/pantry-essentials.svg',
      alt: 'A tidy pantry shelf with labelled jars',
      width: 1200,
      height: 800,
    },
    createdAt: '2026-04-22',
  },
  {
    id: 'journal-business-kitchens',
    slug: 'kitchens-that-feed-many',
    title: 'Kitchens That Feed Many',
    summary:
    'How restaurants and small kitchens plan around quality, consistency, and predictable cost.',
    body:
    'For kitchens that feed many, planning around quality and consistency is everything. Here is what we have learned from talking to chefs, caterers, and small business owners who choose our bulk formats.',
    readingMinutes: 5,
    tag: 'Business',
    image: {
      src: '/images/categories/bulk-ingredients.svg',
      alt: 'A busy restaurant kitchen in the morning',
      width: 1200,
      height: 800,
    },
    createdAt: '2026-05-02',
  },
];

export const journalBySlug: Record<string, JournalEntry> = Object.fromEntries(
  journalEntries.map((j) => [j.slug, j]),
);