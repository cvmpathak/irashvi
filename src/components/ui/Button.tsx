'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline';
type Size = 'sm' | 'md' | 'lg';

const baseClasses =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 ease-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-cream focus-visible:ring-forest-700 disabled:opacity-50 disabled:cursor-not-allowed';

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-forest-700 text-cream hover:bg-forest-800 active:bg-forest-900 shadow-soft hover:shadow-lift',
  secondary:
    'bg-terracotta-400 text-cream hover:bg-terracotta-500 active:bg-terracotta-500 shadow-soft',
  ghost: 'bg-transparent text-forest-700 hover:bg-forest-700/10',
  outline:
    'bg-transparent text-forest-700 border border-forest-700/40 hover:border-forest-700 hover:bg-forest-700/5',
};

const sizeClasses: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-sm',
  lg: 'h-12 px-7 text-base',
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', type = 'button', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  },
);
Button.displayName = 'Button';

export interface LinkButtonProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: string;
  variant?: Variant;
  size?: Size;
}

export const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
        {...props}
      >
        {children}
      </a>
    );
  },
);
LinkButton.displayName = 'LinkButton';