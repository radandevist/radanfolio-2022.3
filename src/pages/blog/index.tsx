import React from "react";
import { Hero } from "../../components/Hero";
import { Feed } from "../../components/Feed";
import { Featured } from "../../components/Featured";
import { AnimatedPage } from "../../components/AnimatedPage";
import { GetStaticProps, NextPage } from "next";
import { Post, posts } from "../../data/posts";

export type BlogProps = {
  posts: Post[];
  heroPost: Post;
};

const Blog: NextPage<BlogProps> = ({ posts, heroPost }) => (
  <AnimatedPage>
    <Hero post={heroPost}/>
    <Featured posts={posts} />
    <Feed posts={posts}/>
  </AnimatedPage>
);

export const getStaticProps: GetStaticProps<BlogProps> = () => ({
  props: {
    posts,
    heroPost: posts[Math.floor(Math.random() * posts.length)],
  }
});

export default Blog;
