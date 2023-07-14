/** @type {import('tailwindcss').Config} */
export const content = [
  './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
  './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  './src/apps/**/*.{js,ts,jsx,tsx,mdx}',
];
export const theme = {
  fill: (theme) => ({
    hover: theme('colors.gray.300'),
    focus: theme('colors.gray.800'),
  }),
  fontFamily: {
    sans: ['Noto Sans', 'sans-serif'],
  },
  extend: {
    backgroundImage: {
      'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      'gradient-conic':
        'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
    },
  },
  colors: {
    white: '#FFFFFF',
    hoverGray: '#F1F4F9',
    mainPurple: '#8075F8',
    mainBlue: '#4830F2',
    lightGray: '#E9ECF0',
    gray: '#C6C6C6',
    darkGray: '#797979',
    dark: '#333333',
  },
};
export const variants = { fill: ['hover', 'focus'] };
export const plugins = [];
