/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "future" : ["Rubik Glitch"]
      },
      colors: {
        // brand1: "#00a569",
        // brand2: "#111d25",
        brand1: {
          DEFAULT: "#00a569",
          "50": "#5effc4",
          "100": "#49ffbd",
          "200": "#20ffae",
          "300": "#00f79d",
          "400": "#00ce83",
          "500": "#00a569",
          "600": "#006d45",
          "700": "#003522",
          "800": "#000000",
          "900": "#000000"
        },
        brand2: {
          DEFAULT: "#111d25",
          "50": "#4b80a3",
          "100": "#447595",
          "200": "#385f79",
          "300": "#2b495d",
          "400": "#1e3341",
          "500": "#111d25",
          "600": "#000000",
          "700": "#000000",
          "800": "#000000",
          "900": "#000000"
        },
      },
    },
  },
  plugins: [],
};
