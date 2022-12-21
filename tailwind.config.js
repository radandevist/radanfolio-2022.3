const colors = require("tailwindcss/colors");
const plugin = require("tailwindcss/plugin");
const merge = require("lodash/merge");

/** @type {import('tailwindcss').Config} */
const adminConfig = {
  theme: {
    extend: {
      boxShadow: {
        admin: "0 1px 3px 0 rgba(0, 0, 0, 0.08), 0 1px 2px 0 rgba(0, 0, 0, 0.02)",
        "admin-md": "0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.02)",
        "admin-lg": "0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.01)",
        "admin-xl": "0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.01)",
      },
      fontFamily: {
        inter: ["var(--font-inter)", "sans-serif"],
      },
      colors: {
        bo: {
          gray: colors.slate,
          "light-blue": colors.sky,
          red: colors.rose,
        },
      },
      outlineColor: {
        bo: {
          blue: "2px solid rgba(0, 112, 244, 0.5)",
        },
      },
      fontSize: {
        "bo-xs": ["0.75rem", { lineHeight: "1.5" }],
        "bo-sm": ["0.875rem", { lineHeight: "1.5715" }],
        "bo-base": ["1rem", { lineHeight: "1.5", letterSpacing: "-0.01em" }],
        "bo-lg": ["1.125rem", { lineHeight: "1.5", letterSpacing: "-0.01em" }],
        "bo-xl": ["1.25rem", { lineHeight: "1.5", letterSpacing: "-0.01em" }],
        "bo-2xl": ["1.5rem", { lineHeight: "1.33", letterSpacing: "-0.01em" }],
        "bo-3xl": ["1.88rem", { lineHeight: "1.33", letterSpacing: "-0.01em" }],
        "bo-4xl": ["2.25rem", { lineHeight: "1.25", letterSpacing: "-0.02em" }],
        "bo-5xl": ["3rem", { lineHeight: "1.25", letterSpacing: "-0.02em" }],
        "bo-6xl": ["3.75rem", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
      },
      screens: {
        "bo-xs": "480px",
      },
      borderWidth: {
        3: "3px",
      },
      minWidth: {
        36: "9rem",
        44: "11rem",
        56: "14rem",
        60: "15rem",
        72: "18rem",
        80: "20rem",
      },
      maxWidth: {
        "8xl": "88rem",
        "9xl": "96rem",
      },
      zIndex: {
        60: "60",
      },
    },
  },
  plugins: [
    // add custom variant for expanding sidebar
    plugin(({ addVariant, e }) => {
      addVariant("sidebar-expanded", ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => (
          `.sidebar-expanded .${e(`sidebar-expanded${separator}${className}`)}`
        ));
      });
    }),
  ]
};

/** @type {import('tailwindcss').Config} */
const customConfig = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./posts/**/*.mdx",
    "./projects/**/*.mdx"
  ],
  theme: {
    extend: {
      fontFamily: {
        future : ["var(--font-rubik)"],
      },
      colors: {
        brand1: {
          DEFAULT: "#00a569",
          50: "#5effc4",
          100: "#49ffbd",
          200: "#20ffae",
          300: "#00f79d",
          400: "#00ce83",
          500: "#00a569",
          600: "#006d45",
          700: "#003522",
          800: "#000000",
          900: "#000000",
          contrasted: "#017F51"
        },
        brand2: {
          DEFAULT: "#111d25",
          50: "#4b80a3",
          100: "#447595",
          200: "#385f79",
          300: "#2b495d",
          400: "#1e3341",
          500: "#111d25",
          600: "#000000",
          700: "#000000",
          800: "#000000",
          900: "#000000"
        },
      },
    },
  },
};

module.exports = merge(customConfig, adminConfig);
