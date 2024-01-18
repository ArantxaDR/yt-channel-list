/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Poppins', 'serif'],
    },
    extend: {
      colors: {
        primary: {
          extraLight: '#d8f1fa',
          light: '#c3e8f7',
          DEFAULT: '#00a0dd',
          dark: '#00587e'
        },
        secondary: {
          light: '#FDFCF5',
          DEFAULT: '#fbf9e8',
          dark: '#B3B1A5'
        }
      }
    },
  },
  plugins: [],
};

