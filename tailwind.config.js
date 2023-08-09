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
    sans: ['Pretendard-Regular', 'sans-serif'],
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
    hoverGray: '#FAFAFA',
    mainPurple: '#8075F8',
    mainBlue: '#3E66FB',
    lightGray: '#E9ECF0',
    gray: '#999999',
    darkGray: '#797979',
    dark: '#212121',
    red: '#DA291C',
  },
};
export const variants = { fill: ['hover', 'focus'] };
export const plugins = [];
