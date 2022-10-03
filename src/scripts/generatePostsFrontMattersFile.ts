import fs from "fs";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { GENERATED_FOLDER_PATH, POSTS_FRONT_MATTERS_FILENAME } from "../constants";
import { formatPostFrontmatter } from "../functions/blog.functions";
import { BlogIndexPost, ZBlogIndexPost } from "../types/post";
import { getAllFilesFrontMatter } from "../utils/mdxUtils";

const generatePostsFrontMattersFile = async (): Promise<void> => {
  const posts: BlogIndexPost[] = (await getAllFilesFrontMatter("posts"))
    .map(frontMatter => ZBlogIndexPost.parse(formatPostFrontmatter(frontMatter)))
    .sort((x, y) => +new Date(y.date) - +new Date(x.date));

  const generatedFolderPath = path.join(process.cwd(), GENERATED_FOLDER_PATH);

  if (!fs.existsSync(generatedFolderPath)) {
    await mkdir(generatedFolderPath, { recursive: true });
  }

  await writeFile(
    path.join(generatedFolderPath, POSTS_FRONT_MATTERS_FILENAME),
    JSON.stringify({ posts }, null, 2),
  );
};

generatePostsFrontMattersFile();
