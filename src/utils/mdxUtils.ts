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

export async function getFiles() {
  return readdirSync(join(process.cwd(), "posts"));
}

export async function getFileBySlug(slug: string) {
  // we will pass in a slug of the page we want like /blogs/blog-1
  // example and we will get the parsed content for that particular
  // blog page.
  const source = readFileSync(join(process.cwd(), "posts", `${slug}.mdx`),"utf8");

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

  return {
    // return the parsed content for our page along with it's metadata
    // we will be using gray-matter for this.
    code,
    frontMatter: {
      ...frontmatter,
      wordCount: source.split(/\s+/gu).length,
      readingTime: readingTime(source),
      slug,
    },
  };
}

export async function getAllFilesFrontMatter() {
  const files = readdirSync(join(process.cwd(), "posts"));

  return files.map((postSlug) => {
    // returns the parsed data for all the files within the posts directory
    const source = readFileSync(join(process.cwd(), "posts", postSlug), "utf8");
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
}