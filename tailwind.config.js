/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./posts/*.mdx",
    "./projects/*.mdx"
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
      animation: {
        "spin-slow": "spin 4s linear infinite",
        showMenu: "menuIn 0.3s ease-in-out",
        hideMenu: "menuOut 0.3s ease-in-out",
        fadeIn: "twFadeIn 0.3s ease-in-out",
        fadeOut: "twFadeOut 0.3s ease-in-out",
      },
      keyframes: {
        menuIn: {
          from: { right: "-130%" },
          to: { right: "0%" },
        },
        menuOut: {
          from: { right: "0%" },
          to: { right: "-130%" },
        },
        // menuIn: {
        //   from: { "margin-left": "-130%" },
        //   to: { "margin-left": "0%" },
        // },
        // menuOut: {
        //   from: { "margin-left": "0%" },
        //   to: { "margin-left": "-130%" },
        // },
        twFadeIn: {
          from: { opacity: 0 },
          to: { opacity: 0.5 },
        },
        twFadeOut: {
          from: { opacity: 0.5 },
          to: { opacity: 0 },
        },
      },
    },
  },
  plugins: [],
};
