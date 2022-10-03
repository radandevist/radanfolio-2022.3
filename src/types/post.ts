import { z } from "zod";

export const ZBlogIndexPost = z.object({
  id: z.string(),
  author: z.string(),
  cover: z.string(),
  date: z.string(),
  excerpt: z.string().optional(),
  featured: z.boolean(),
  slug: z.string(),
  title: z.string()
});

export type BlogIndexPost = z.infer<typeof ZBlogIndexPost>;
