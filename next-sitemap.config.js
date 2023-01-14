const dynamicSitemapNames = Array.from({ length: 6 }).map((_, index) => {
  return `server-sitemap-${index + 1}.xml`;
});

const siteUrl = process.env.NEXT_PUBLIC_NEXT_APP_DOMAIN_URL || "http://localhost:3000";

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  exclude: [
    ...dynamicSitemapNames
  ],
  robotsTxtOptions: {
    additionalSitemaps: [
      ...dynamicSitemapNames.map((name) => {
        return `${siteUrl}/${name}`;
      }),
    ],
  },
};
