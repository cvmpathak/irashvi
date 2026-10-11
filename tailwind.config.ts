import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#F1F4F2',
          100: '#DDE4DF',
          200: '#B9C6BC',
          300: '#8FA394',
          400: '#5C7A66',
          500: '#3F5A47',
          600: '#2F4636',
          700: '#263C2B',
          800: '#1B2A1F',
          900: '#101A14',
        },
        cream: {
          DEFAULT: '#F5F0E5',
          50: '#FBF8F1',
          100: '#F5F0E5',
          200: '#EDE6D4',
          300: '#E3D9C2',
          400: '#D6C8A9',
        },
        sage: {
          DEFAULT: '#B7B98A',
          100: '#E7E8D2',
          200: '#D2D4AE',
          300: '#B7B98A',
          400: '#9CA070',
          500: '#7F8458',
        },
        terracotta: {
          DEFAULT: '#B96945',
          100: '#F1D5C5',
          200: '#E0A98A',
          300: '#C98567',
          400: '#B96945',
          500: '#9A5436',
        },
        charcoal: {
          DEFAULT: '#2B2D28',
          100: '#42443E',
          200: '#2B2D28',
          300: '#1E201C',
        },
        sand: {
          DEFAULT: '#E7DFCF',
          100: '#F2EBDC',
          200: '#E7DFCF',
          300: '#D6CBB1',
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Cormorant Garamond', 'ui-serif', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(2.75rem, 5.4vw, 5rem)', { lineHeight: '1.02', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.25rem, 4vw, 3.5rem)', { lineHeight: '1.05', letterSpacing: '-0.015em' }],
        'display-md': ['clamp(1.75rem, 3vw, 2.5rem)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
      },
      maxWidth: {
        'reading': '68ch',
      },
      borderRadius: {
        'xl-soft': '1.25rem',
        '2xl-soft': '1.75rem',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(15, 26, 20, 0.04), 0 8px 24px -12px rgba(15, 26, 20, 0.08)',
        lift: '0 4px 12px rgba(15, 26, 20, 0.05), 0 24px 48px -16px rgba(15, 26, 20, 0.14)',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
};

export default config;