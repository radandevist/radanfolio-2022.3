const isProd = process.env.NODE_ENV === "production";

/**
 * Manually set up the next defaults as said in the docs if you are
 * planning to use purgeCss
 */
const defaultNextConfig = {
  "postcss-flexbugs-fixes": {},
  "postcss-preset-env": {
    autoprefixer: {
      flexbox: "no-2009"
    },
    stage: 3,
    features: {
      "custom-properties": false
    }
  },
};

/**
 * I intentionnaly added purgeCss because:
 * - in case of using a template which is built upon a different framework,
 *    like bootstrap purging styles is essential for performance load.
 *    For example if we used a dashboard template based on bootstrap for the
 *    admin panel, a lot of styles would be unused. So it makes sense to purge
 *    them.
 */
const purgeCssConfig = {
  "@fullhuman/postcss-purgecss": {
    content: [
      "./src/**/*.{js,ts,jsx,tsx}",
      "./posts/**/*.mdx",
      "./projects/**/*.mdx",
    ],
    // ? this is the extractor you would find in the purgeCss docs
    // * @link https://purgecss.com/guides/next.html
    // defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
    // ? The following is the correct one to get it working with tailwindcss
    // * @see https://stackoverflow.com/a/60552953/15003148
    defaultExtractor: content => content.match(/[\w\-:.\/\[#%\]!]+(?<!:)/g) || [],
    safelist: ["html", "body"]
  },
};

module.exports = {
  plugins: {
    "postcss-import": {},
    tailwindcss: {},
    ...(isProd ? { autoprefixer: {} } : {}),
    ...(isProd ? { cssnano: {} } : {}),
    ...defaultNextConfig,
    ...purgeCssConfig,
  }
};
