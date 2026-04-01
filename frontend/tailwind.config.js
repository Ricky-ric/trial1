/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['"Crimson Pro"', 'Georgia', 'serif'],
      },
      colors: {
        cream: '#F7F3ED',
        parchment: '#F0EAE0',
        gold: '#B8974A',
        'gold-light': '#D4B06A',
        brown: '#6B4C2A',
        'brown-light': '#8B6540',
        ink: '#1C1610',
        muted: '#7A6A55',
      },
    },
  },
  plugins: [],
};
