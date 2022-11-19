import { join } from "path";
import { existsSync, readFileSync } from "fs";

import matter from "gray-matter";
import readingTime from "reading-time";
import { v4 } from "uuid";

import { getDirectories } from "./fsUtils";

export async function getPostsSlugs(postsDir: string) {
  return getDirectories(join(process.cwd(), postsDir));
}

export async function getAllFilesFrontMatterV3(dir: string, locale: string) {
  const CWD = process.cwd();

  const slugs = await getPostsSlugs(dir);

  return slugs.map((slug) => {
    // returns the parsed data for all the files within the posts directory
    const mdxPost = join(CWD, dir, slug, `${locale}.mdx`);

    if (!existsSync(mdxPost)) return;

    const source = readFileSync(mdxPost, "utf8");
    const { data } = matter(source);

    return {
      ...data,
      // * the rest is generated
      id: v4(),
      // we will be using the filename by removing the extension
      // as our slug for the file.
      slug: slug.replace(".mdx", ""),
      readingTime: readingTime(source),
    };
  });
};
