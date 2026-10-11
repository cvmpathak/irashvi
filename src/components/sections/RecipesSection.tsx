'use client';

import * as React from 'react';
import Link from 'next/link';
import { Clock, ArrowRight } from 'lucide-react';
import type { Recipe } from '@/data/types';
import { mediaStorage } from '@/services/media';

export interface RecipesSectionProps {
  recipes: Recipe[];
}

export function RecipesSection({ recipes }: RecipesSectionProps) {
  return (
    <section
      aria-labelledby="recipes-heading"
      className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mb-10 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-forest-700/55">Recipes & guides</p>
          <h2
            id="recipes-heading"
            className="mt-2 font-display text-display-md text-forest-700 text-balance"
          >
            Simple, seasonal ideas.
          </h2>
        </div>
        <Link
          href="/recipes"
          className="inline-flex items-center gap-1 text-sm text-forest-700/80 underline-offset-4 hover:underline"
        >
          All recipes
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                  loading="lazy"
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
                <h3 className="mt-2 font-display text-lg text-forest-700">{recipe.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-forest-700/70">
                  {recipe.summary}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}