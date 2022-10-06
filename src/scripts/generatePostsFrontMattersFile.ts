import fs from "fs";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { GENERATED_FOLDER_PATH, POSTS_FRONT_MATTERS_FOLDER_NAME } from "../constants";
import { formatPostFrontmatter } from "../functions/blog.functions";
import { BlogIndexPost, ZBlogIndexPost } from "../types/post";
import { getAllFilesFrontMatterV3 } from "../utils/mdxUtils";
import nextI18nConfig from "../../next-i18next.config.js";

const generatePostsFrontMatterFiles = async (): Promise<void> => {
  const frontMattersFolderPath = path.join(
    process.cwd(),
    GENERATED_FOLDER_PATH,
    POSTS_FRONT_MATTERS_FOLDER_NAME
  );

  if (!fs.existsSync(frontMattersFolderPath)) {
    await mkdir(frontMattersFolderPath, { recursive: true });
  }

  Promise.all(nextI18nConfig.i18n.locales.map(async (locale) => {
    const posts: BlogIndexPost[] = ZBlogIndexPost.array().parse(
      (await getAllFilesFrontMatterV3("posts", locale))
        .map(frontMatter => formatPostFrontmatter(frontMatter))
    ).sort((x, y) => +new Date(y.date) - +new Date(x.date));

    await writeFile(
      path.join(frontMattersFolderPath, `${locale}.json`),
      JSON.stringify({ posts }, null, 2),
    );
  }));
};

generatePostsFrontMatterFiles();
