const { i18n } = require("./next-i18next.config");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n,
  images: {
    domains: [
      "images.pexels.com",
      "res.cloudinary.com",
      "media.giphy.com"
    ],
  }
};

module.exports = nextConfig;
