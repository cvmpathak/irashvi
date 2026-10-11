'use client';

import * as React from 'react';

export function BrandStory() {
  return (
    <section
      aria-labelledby="story-heading"
      className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-forest-700/55">Our story</p>
          <h2
            id="story-heading"
            className="mt-2 font-display text-display-lg text-forest-700 text-balance"
          >
            A small range, made with intention.
          </h2>
          <p className="mt-6 max-w-reading text-base leading-relaxed text-forest-700/80">
            Irashvi began with a simple idea: that the everyday staples in our
            kitchens deserve a quiet kind of care. We work with growers, millers,
            and small processors who respect their ingredients, and we package
            them in plain, well-sealed formats that keep them at their best.
          </p>
          <p className="mt-4 max-w-reading text-base leading-relaxed text-forest-700/80">
            Nothing flashy, nothing hidden — just a short list of dependable
            ingredients, presented clearly and ready to use.
          </p>
          <div className="mt-8 grid gap-6 border-t border-forest-700/15 pt-8 sm:grid-cols-3">
            <Pillar title="Selected" body="A short, intentional list rather than a long catalogue." />
            <Pillar title="Honest" body="Single-ingredient and blend recipes stated plainly on every pack." />
            <Pillar title="Considered" body="Packaging that protects freshness and travels well." />
          </div>
        </div>
        <div className="relative">
          <div className="aspect-[4/5] overflow-hidden rounded-3xl border border-forest-700/10 bg-sand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/categories/pantry-essentials.svg"
              alt="A pantry shelf with labelled jars in soft light."
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 hidden max-w-xs rounded-2xl border border-forest-700/10 bg-cream/95 p-5 shadow-lift sm:block">
            <p className="font-display text-base text-forest-700">"A pantry should feel quiet."</p>
            <p className="mt-2 text-xs text-forest-700/70">
              Irashvi is built on small daily habits — well-stocked shelves, brief
              recipes, and ingredients you trust.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pillar({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <p className="font-display text-lg text-forest-700">{title}</p>
      <p className="mt-1 text-sm text-forest-700/70">{body}</p>
    </div>
  );
}