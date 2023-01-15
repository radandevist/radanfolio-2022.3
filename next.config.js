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
      "localhost",
      "radanfolio-strapi.devist.xyz", // otherwise images won't load
      "radanfolio-preview.devist.xyz", // vercel preview url
      "devist.xyz", // vercel production urls
    ],
  },
  async rewrites() {
    return [
      {
        source: "/server-sitemap-:page.xml",
        destination: "/sitemap/:page"
      }
    ];
  }
};

module.exports = nextConfig;
