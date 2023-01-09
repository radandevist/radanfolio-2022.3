const path = require("path");

const nextI18n = {
  defaultLocale: "en",
  locales: [
    "en",
    "fr",
    "mg",
  ],
};

const i18n = {
  ...nextI18n,
  localePath: path.resolve("./public/locales")
};

module.exports = { i18n, nextI18n };
