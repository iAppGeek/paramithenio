const tokens = require('@acme/design-tokens');

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: tokens.colors,
      spacing: tokens.spacing,
      borderRadius: tokens.borderRadius,
      fontFamily: tokens.fontFamily,
      fontSize: tokens.fontSize,
    },
  },
  plugins: [],
};
