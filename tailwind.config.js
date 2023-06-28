/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fill: (theme) => ({
      hover: theme('colors.gray.300'),
      focus: theme('colors.gray.800'),
    }),
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
      lightGray: '#E9ECF0',
      gray: '#C6C6C6',
      darkGray: '#797979',
      dark: '#333333',
    },
  },
  variants: { fill: ['hover', 'focus'] },
  plugins: [],
};
