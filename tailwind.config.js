/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{ts,tsx}', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        verde: '#3BBB30',
        roxo: '#1967FB',
        roxoP: '#6448B7',
        azul: {
          50: '#EDEDF7',
          100: '#dddfee',
          200: '#cecde5',
          500: '#9AA5D1',
          600: '#8898CA',
          700: '#495777',
          800: '#31384C',
          900: '#1B2230',
        },
      },
    },
  },
  plugins: [],
};
