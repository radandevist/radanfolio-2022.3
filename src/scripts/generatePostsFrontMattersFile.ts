import fs from "fs";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { GENERATED_PATH, POSTS_FRONTMATTERS_FILENAME } from "../constants";
import { formatPostFrontmatter } from "../functions/blog.functions";
import { BlogIndexPost, ZBlogIndexPost } from "../types/post";
import { getAllFilesFrontMatter } from "../utils/mdxUtils";

const generatePostsFrontMattersFile = async (): Promise<void> => {
  const posts: BlogIndexPost[] = (await getAllFilesFrontMatter("posts"))
    .map(frontMatter => ZBlogIndexPost.parse(formatPostFrontmatter(frontMatter)))
    .sort((x, y) => +new Date(y.date) - +new Date(x.date));

  if (!fs.existsSync(GENERATED_PATH)) await mkdir(GENERATED_PATH, { recursive: true });

  await writeFile(
    path.join(process.cwd(), GENERATED_PATH, POSTS_FRONTMATTERS_FILENAME),
    JSON.stringify({ posts }, null, 2),
  );
};

generatePostsFrontMattersFile();
