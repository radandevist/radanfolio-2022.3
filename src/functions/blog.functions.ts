import { Post } from "../pages/posts/[slug]";
import { BlogIndexPost } from "../types/post";

export const formatPostFrontmatter = (frontMatter: Record<string, any>): BlogIndexPost => {
  const {
    cover, date, title, // * These are required
    author, excerpt, featured, /* topic, */
    slug, id, // * are generated so must be required
  } = frontMatter as Partial<Pick<BlogIndexPost, "author" |"excerpt" | "featured">> &
  Pick<BlogIndexPost, "cover" | "title" | "slug" |"id"> &
  { date: Date | string };

  return {
    cover, title, id, slug,
    date: new Date(date).toDateString(),
    author: author || "Radan Devist",
    excerpt: excerpt,
    featured: featured ?? false,
  };
};

export const formatPostFileResult = (postFile: Record<string, any>): Post => {
  const {
    code,
    frontMatter: {
      // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
      readingTime, slug, wordCount,
      topic, title, excerpt, author, date, cover,
    },
  } = postFile as {
    code: string;
    frontMatter: {
      readingTime: number; wordCount: number; slug: string;
      topic: string;
      title: string;
      excerpt: string;
      author: string;
      date: Date | string;
      cover: string;
    };
  };

  return {
    code, topic, title, excerpt, cover,
    author: author || "Radan Devist",
    date: new Date(date).toDateString(),
  };
};
