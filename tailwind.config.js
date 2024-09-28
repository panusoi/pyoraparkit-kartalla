/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          light: {
            50: '#e5f7df',
            100: '#aceb98',
            200: '#83de6d',
            300: '#5cd145',
            400: '#37c421',
            500: '#14b702',
            600: '#0a9100',
            700: '#046b00',
            800: '#004500',
            900: '#001f01',
          },
          dark: {
            50: '#122111',
            100: '#12330f',
            200: '#14450f',
            300: '#145d0c',
            400: '#147e08',
            500: '#149f05',
            600: '#34b220',
            700: '#58c843',
            800: '#80d86a',
            900: '#a9e795',
          },
        },
      },
    },
  },
  plugins: [],
};
