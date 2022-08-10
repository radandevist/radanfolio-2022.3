import matter from "gray-matter";
import { join } from "path";
import readingTime from "reading-time";
import { readdirSync, readFileSync } from "fs";
import { bundleMDX } from "mdx-bundler";
import { v4 } from "uuid";

// These plugins are completely dependent on the blog that you
// are planning to build if you're just focused on building one without
// any syntax highlighting of those sorts these all won't be necessary
import rehypeSlug from "rehype-slug";
import rehypeCodeTitles from "rehype-code-titles";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrism from "rehype-prism-plus";
// import { BlogIndexPost } from "../pages/blog";

export async function getFiles(mdxFilesDir: string) {
  return readdirSync(join(process.cwd(), mdxFilesDir));
}

export async function getFileBySlug(mdxFilesDir: string, slug: string) {
  // we will pass in a slug of the page we want like /blogs/blog-1
  // example and we will get the parsed content for that particular
  // blog page.
  const source = readFileSync(join(process.cwd(), mdxFilesDir, `${slug}.mdx`),"utf8");

  const { code, frontmatter } = await bundleMDX({
    source,
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

  const { words, minutes } = readingTime(source);

  return {
    // return the parsed content for our page along with it's metadata
    // we will be using gray-matter for this.
    code,
    frontMatter: {
      ...frontmatter,
      wordCount: words,
      readingTime: minutes,
      slug,
    },
  };
}

export async function getAllFilesFrontMatter(mdxFilesDir: string) {
  const files = readdirSync(join(process.cwd(), mdxFilesDir));

  return files.map((postSlug) => {
    // returns the parsed data for all the files within the posts directory
    const source = readFileSync(join(process.cwd(), mdxFilesDir, postSlug), "utf8");
    const { data } = matter(source);

    return {
      ...data,
      // * the rest is generated
      id: v4(),
      // we will be using the filename by removing the extension
      // as our slug for the file.
      slug: postSlug.replace(".mdx", ""),
      readingTime: readingTime(source),
    };
  });
};
