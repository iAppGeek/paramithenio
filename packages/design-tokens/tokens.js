// Design tokens for Paramithenio — warm, story-book palette.
// All values are consumed via the Tailwind preset in @acme/config;
// never use these raw values in component code.

/** @type {Record<string, Record<string, string>>} */
const colors = {
  // Warm amber / golden — primary brand colour
  amber: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
    950: '#451a03',
  },
  // Warm terracotta / clay — secondary accent
  clay: {
    50: '#fdf4f0',
    100: '#fae5db',
    200: '#f5ccb9',
    300: '#edaa8d',
    400: '#e48063',
    500: '#d95e3d',
    600: '#c2452b',
    700: '#a03524',
    800: '#842e22',
    900: '#6d2a22',
    950: '#3b130f',
  },
  // Parchment / cream — background tones
  parchment: {
    50: '#fefdf7',
    100: '#fdf9e9',
    200: '#f9f0cc',
    300: '#f3e3a2',
    400: '#eacf6e',
    500: '#dfbb43',
    600: '#cca230',
    700: '#aa8226',
    800: '#896824',
    900: '#705521',
    950: '#3d2d0d',
  },
  // Forest green — tags, badges
  forest: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
    950: '#052e16',
  },
  // Neutral greys — text, borders, backgrounds
  stone: {
    50: '#fafaf9',
    100: '#f5f5f4',
    200: '#e7e5e4',
    300: '#d6d3d1',
    400: '#a8a29e',
    500: '#78716c',
    600: '#57534e',
    700: '#44403c',
    800: '#292524',
    900: '#1c1917',
    950: '#0c0a09',
  },
};

/** @type {Record<string, string>} */
const spacing = {
  px: '1px',
  0: '0',
  0.5: '0.125rem',
  1: '0.25rem',
  1.5: '0.375rem',
  2: '0.5rem',
  2.5: '0.625rem',
  3: '0.75rem',
  3.5: '0.875rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  7: '1.75rem',
  8: '2rem',
  9: '2.25rem',
  10: '2.5rem',
  11: '2.75rem',
  12: '3rem',
  14: '3.5rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  28: '7rem',
  32: '8rem',
  36: '9rem',
  40: '10rem',
  44: '11rem',
  48: '12rem',
  52: '13rem',
  56: '14rem',
  60: '15rem',
  64: '16rem',
  72: '18rem',
  80: '20rem',
  96: '24rem',
};

/** @type {Record<string, string>} */
const borderRadius = {
  none: '0',
  sm: '0.125rem',
  DEFAULT: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  full: '9999px',
};

/** @type {Record<string, string | string[]>} */
const fontFamily = {
  sans: ['Inter', 'system-ui', 'sans-serif'],
  serif: ['Georgia', 'Cambria', 'serif'],
  mono: ['JetBrains Mono', 'Menlo', 'monospace'],
};

/** @type {Record<string, [string, { lineHeight: string }]>} */
const fontSize = {
  xs: ['0.75rem', { lineHeight: '1rem' }],
  sm: ['0.875rem', { lineHeight: '1.25rem' }],
  base: ['1rem', { lineHeight: '1.5rem' }],
  lg: ['1.125rem', { lineHeight: '1.75rem' }],
  xl: ['1.25rem', { lineHeight: '1.75rem' }],
  '2xl': ['1.5rem', { lineHeight: '2rem' }],
  '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
  '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
  '5xl': ['3rem', { lineHeight: '1' }],
};

module.exports = { colors, spacing, borderRadius, fontFamily, fontSize };
