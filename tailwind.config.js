/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "future" : ["Rubik Glitch"]
      },
      colors: {
        brand2: "#111d25",
      },
    },
  },
  plugins: [],
};
