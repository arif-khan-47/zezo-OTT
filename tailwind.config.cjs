/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    ripple: theme => ({
      colors: theme('colors')
  }),
    extend: {
      screens: {
        '3xl': '1800px',
      },
    },
  },
  plugins: [

    require('tailwindcss-ripple')(),
  ],
}