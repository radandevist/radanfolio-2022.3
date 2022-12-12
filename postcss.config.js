module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    // "@fullhuman/postcss-purgecss": {
    //   content: [
    //     "./src/**/*.{js,ts,jsx,tsx}",
    //     "./posts/**/*.mdx",
    //     "./projects/**/*.mdx"
    //   ],
    //   defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
    //   safelist: ["html", "body"]
    // },
  }
};

// module.exports = {
//   plugins: [
//     "tailwindcss",
//     "autoprefixer",
//     "postcss-flexbugs-fixes",
//     [
//       "postcss-preset-env",
//       {
//         autoprefixer: {
//           flexbox: "no-2009"
//         },
//         stage: 3,
//         features: {
//           "custom-properties": false
//         }
//       }
//     ],
//     [
//       "@fullhuman/postcss-purgecss",
//       {
//         content: [
//           "./src/**/*.{js,ts,jsx,tsx}",
//           "./posts/**/*.mdx",
//           "./projects/**/*.mdx"
//         ],
//         defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
//         safelist: ["html", "body"]
//       }
//     ]
//   ],
// };
