/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'], 
  theme: {
    extend: {
      maxWidth: {
        '9xl': '1920px', 
      },
      fontFamily: {
        serif: ['Lora', 'Georgia', 'serif'], 
        sans: ['Roboto', 'Arial', 'sans-serif'], 
      },
    },
  },
  plugins: [],
};
