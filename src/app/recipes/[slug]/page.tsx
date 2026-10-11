import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Clock, Users } from 'lucide-react';
import { recipeBySlug, recipes } from '@/data/recipes';
import { productById } from '@/data/products';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ProductCard } from '@/components/products/ProductCard';
import { mediaStorage } from '@/services/media';

interface RecipePageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return recipes.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: RecipePageProps): Promise<Metadata> {
  const recipe = recipeBySlug[params.slug];
  if (!recipe) return { title: 'Recipe not found' };
  return {
    title: recipe.title,
    description: recipe.summary,
    alternates: { canonical: `/recipes/${recipe.slug}` },
    openGraph: {
      title: `${recipe.title} · Irashvi`,
      description: recipe.summary,
    },
  };
}

export default function RecipePage({ params }: RecipePageProps) {
  const recipe = recipeBySlug[params.slug];
  if (!recipe) notFound();
  const relatedProducts = recipe.relatedProductIds
    .map((id) => productById[id])
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: 'Recipes', href: '/recipes' },
          { label: recipe.title, href: `/recipes/${recipe.slug}` },
        ]}
      />
      <header className="mt-8">
        <p className="text-xs uppercase tracking-[0.24em] text-forest-700/55">Recipe</p>
        <h1 className="mt-2 font-display text-display-md text-forest-700 text-balance">
          {recipe.title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-forest-700/70">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4" aria-hidden="true" />
            {recipe.timeMinutes} minutes
          </span>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1.5">
            <Users className="h-4 w-4" aria-hidden="true" />
            {recipe.servings} servings
          </span>
          <span aria-hidden="true">·</span>
          <span className="capitalize">{recipe.difficulty}</span>
        </div>
      </header>
      <div className="mt-8 aspect-[3/2] overflow-hidden rounded-2xl-soft border border-forest-700/10 bg-sand">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={mediaStorage.resolve(recipe.image.src)}
          alt={recipe.image.alt}
          className="h-full w-full object-cover"
        />
      </div>
      <p className="mt-8 max-w-reading text-base leading-relaxed text-forest-700/85">
        {recipe.description}
      </p>
      <section className="mt-12 grid gap-10 lg:grid-cols-[1fr_2fr]">
        <div>
          <h2 className="font-display text-lg text-forest-700">Ingredients</h2>
          <ul className="mt-3 space-y-2 text-sm text-forest-700/85">
            {recipe.ingredients.map((line) => (
              <li key={line} className="border-b border-forest-700/10 pb-2 last:border-b-0">
                {line}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-display text-lg text-forest-700">Method</h2>
          <ol className="mt-3 space-y-4 text-sm leading-relaxed text-forest-700/85">
            {recipe.steps.map((step, index) => (
              <li key={index} className="flex gap-3">
                <span className="grid h-6 w-6 flex-shrink-0 place-items-center rounded-full border border-forest-700/20 text-xs font-medium text-forest-700">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-lg text-forest-700">Featured products</h2>
          <ul className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProducts.map((p) => (
              <li key={p.id} className="h-full">
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
          <Link
            href="/shop"
            className="mt-6 inline-block text-sm text-forest-700/70 underline-offset-4 hover:underline"
          >
            See all products →
          </Link>
        </section>
      )}
    </div>
  );
}