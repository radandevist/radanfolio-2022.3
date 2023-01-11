/** @type {import('eslint').Linter.Config} */
module.exports = {
  plugins: [
    "@typescript-eslint/eslint-plugin"
  ],
  extends: [
    "next/core-web-vitals",
    "plugin:import/recommended"
  ],
  rules: {
    "@typescript-eslint/indent": ["error", 2],
    "@typescript-eslint/semi": "error",
    semi: "off",
    "max-len": ["error", 100],
    "arrow-body-style": ["error", "as-needed"],
    quotes: ["error", "double"],
    "@next/next/no-img-element": ["off"],
    "prefer-template": "error",
    "prefer-const": "error",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/member-delimiter-style": "error",
    "eol-last": "error",
    "import/no-unresolved": "off",
    "import/order": ["error", {
      "newlines-between": "always",
    }],
    "quote-props": ["error", "as-needed"],
    "arrow-body-style": "off",
  }
};
