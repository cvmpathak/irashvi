'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion as m } from 'motion/react';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';
import { LinkButton } from '@/components/ui/Button';
import { fadeUp, staggerContainer, viewportOnce } from '@/components/animations/motion-variants';

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-cream"
    >
      <div className="absolute inset-0 -z-10 bg-grain" aria-hidden="true" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-20 pt-12 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:px-8 lg:pt-32">
        <m.div
          className="flex flex-col justify-center"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <m.span
            variants={fadeUp}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-forest-700/20 bg-cream/70 px-3 py-1.5 text-[11px] uppercase tracking-[0.22em] text-forest-700/80"
          >
            <Sparkles className="h-3 w-3 text-terracotta-400" aria-hidden="true" />
            Irashvi — packed with intention
          </m.span>
          <m.h1
            id="hero-heading"
            variants={fadeUp}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-display-xl text-forest-700 text-balance"
          >
            Goodness,
            <br />
            thoughtfully packed.
          </m.h1>
          <m.p
            variants={fadeUp}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-xl text-base leading-relaxed text-forest-700/80 sm:text-lg"
          >
            Irashvi offers a small, carefully curated range of dried vegetables,
            vegetable powders, spices, and cooking mixes — packaged with care for
            everyday kitchens and the businesses that feed many.
          </m.p>
          <m.div
            variants={fadeUp}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <LinkButton href="/shop" size="lg" variant="primary">
              Explore products
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </LinkButton>
            <LinkButton href="/wholesale" size="lg" variant="outline">
              Wholesale enquiries
            </LinkButton>
          </m.div>
          <m.dl
            variants={fadeUp}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 grid grid-cols-3 gap-6 border-t border-forest-700/15 pt-8 text-sm"
          >
            <Stat label="Categories" value="6" />
            <Stat label="Products" value="9+" />
            <Stat label="Pack sizes" value="3+" />
          </m.dl>
        </m.div>
        <m.div
          className="relative"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[560px] overflow-hidden rounded-3xl border border-forest-700/10 bg-sand shadow-lift">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/brand/hero.svg"
              alt="An arrangement of Irashven jars on a wooden shelf with botanical details."
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-forest-700/20 to-transparent" aria-hidden="true" />
            <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-cream/30 bg-cream/85 p-4 backdrop-blur">
              <p className="font-display text-base text-forest-700">A small range, made well.</p>
              <p className="mt-1 text-xs text-forest-700/70">
                Six categories · careful sourcing · straightforward packaging.
              </p>
            </div>
          </div>
        </m.div>
      </div>
      <Link
        href="#featured"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-xs uppercase tracking-[0.24em] text-forest-700/60 hover:text-forest-700 lg:inline-flex"
      >
        Scroll
        <ChevronDown className="h-3 w-3 animate-bounce" aria-hidden="true" />
      </Link>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-[0.2em] text-forest-700/55">{label}</dt>
      <dd className="mt-1 font-display text-2xl text-forest-700">{value}</dd>
    </div>
  );
}