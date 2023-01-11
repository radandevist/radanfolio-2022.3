const { nextI18n } = require("./next-i18next.config");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: nextI18n,
  images: {
    domains: [
      "images.pexels.com",
      "res.cloudinary.com",
      "media.giphy.com",
      "localhost"
    ],
  }
};

module.exports = nextConfig;
