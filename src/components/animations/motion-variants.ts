'use client';

import type { Variants } from 'motion/react';

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export const easeOut = [0.22, 1, 0.36, 1] as const;

// `amount: 0` triggers as soon as the element is at all visible. Combined with
// `once: true`, the entrance animation runs once and the final state is locked.
export const viewportOnce = { once: true, amount: 0 };