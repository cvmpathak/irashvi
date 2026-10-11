import type { Metadata } from 'next';
import Link from 'next/link';
import { Clock } from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { recipes } from '@/data/recipes';
import { mediaStorage } from '@/services/media';

export const metadata: Metadata = {
  title: 'Recipes',
  description:
    'Simple, seasonal recipes using Irashvi ingredients — dried vegetables, powders, spices, and cooking mixes.',
  alternates: { canonical: '/recipes' },
};

export default function RecipesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: 'Recipes', href: '/recipes' }]} />
      <header className="mt-6 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.24em] text-forest-700/55">Recipes</p>
        <h1 className="mt-2 font-display text-display-lg text-forest-700 text-balance">
          Simple, seasonal ideas.
        </h1>
        <p className="mt-3 text-base text-forest-700/75">
          A small library of recipes that show off our ingredients in everyday
          cooking — weeknight-friendly, with the occasional slow Sunday dish.
        </p>
      </header>
      <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <Link
              href={`/recipes/${recipe.slug}`}
              className="group block h-full overflow-hidden rounded-2xl-soft border border-forest-700/10 bg-white shadow-soft transition-shadow hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700 focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
            >
              <div className="relative aspect-[3/2] overflow-hidden bg-sand">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={mediaStorage.resolve(recipe.image.src)}
                  alt={recipe.image.alt}
                  className="h-full w-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-[1.04]"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 text-xs text-forest-700/60">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" aria-hidden="true" />
                    {recipe.timeMinutes} min
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{recipe.servings} servings</span>
                  <span aria-hidden="true">·</span>
                  <span className="capitalize">{recipe.difficulty}</span>
                </div>
                <h2 className="mt-2 font-display text-lg text-forest-700">{recipe.title}</h2>
                <p className="mt-1 line-clamp-2 text-sm text-forest-700/70">
                  {recipe.summary}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}