import React from "react";
import { Hero } from "../../components/Hero";
import { Feed } from "../../components/Feed";
import { Featured } from "../../components/Featured";
import { AnimatedPage } from "../../components/AnimatedPage";
import { GetServerSideProps, NextPage } from "next";
// import { Post, /* posts */ } from "../../data/posts";
import { getAllFilesFrontMatter } from "../../utils/mdxUtils";
import { z } from "zod";
import { getRandomElements } from "../../utils/arrayUtils";
import { formatPostFrontmatter } from "../../functions/blog.functions";

const ZBlogIndexPost = z.object({
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

export type BlogProps = {
  posts: BlogIndexPost[];
  heroPost: BlogIndexPost;
  featuredPosts: BlogIndexPost[];
};

const Blog: NextPage<BlogProps> = ({ posts, heroPost, featuredPosts }) => (
  <AnimatedPage>
    <Hero post={heroPost}/>
    <Featured posts={featuredPosts} />
    <Feed posts={posts}/>
  </AnimatedPage>
);

export const getServerSideProps: GetServerSideProps<BlogProps> = async () => {
  const posts = (await getAllFilesFrontMatter("posts"))
    .map(frontMatter => ZBlogIndexPost.parse(formatPostFrontmatter(frontMatter)));

  return {
    props: {
      posts,
      heroPost: getRandomElements(posts)[0],
      featuredPosts: getRandomElements(
        posts.filter(post => post.featured === true),
        2
      )
    }
  };
};

export default Blog;
