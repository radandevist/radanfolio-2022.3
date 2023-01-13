import { bundleMDX } from "mdx-bundler";
// These plugins are completely dependent on the blog that you
// are planning to build if you're just focused on building one without
// any syntax highlighting of those sorts these all won't be necessary
import rehypeSlug from "rehype-slug";
import rehypeCodeTitles from "rehype-code-titles";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrism from "rehype-prism-plus";

export async function bundleStrapiContent(content: string) {
  const { code } = await bundleMDX({
    source: content,
    mdxOptions(options) {
      // you can add your plugins right here if you'd rather use
      // remark plugins then you can add them similary just replace
      // the occurances of rehype with remark.
      options.rehypePlugins = [
        ...(options?.rehypePlugins ?? []),
        rehypeSlug,
        rehypeCodeTitles,
        rehypePrism,
        [
          rehypeAutolinkHeadings,
          {
            properties: {
              className: ["anchor"],
            },
          },
        ],
      ];
      return options;
    },
  });

  return code;
};
