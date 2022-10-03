import path from "path";
import React from "react";
import Head from "next/head";
import { Hero } from "../../components/Hero";
import { Feed } from "../../components/Feed";
import { Featured } from "../../components/Featured";
import { AnimatedPage } from "../../components/AnimatedPage";
import { GetServerSideProps, NextPage } from "next";
import { getRandomElements } from "../../utils/arrayUtils";
import { getCloudinaryOpenGraphImage } from "../../helpers/cloudinary";
import { BlogIndexPost, ZBlogIndexPost } from "../../types/post";
import { getJSONFileData } from "../../utils/fsUtils";
import { GENERATED_PATH, POSTS_FRONTMATTERS_FILENAME } from "../../constants";

export type BlogProps = {
  posts: BlogIndexPost[];
  heroPost: BlogIndexPost;
  featuredPosts: BlogIndexPost[];
};

const Blog: NextPage<BlogProps> = ({ posts, heroPost, featuredPosts }) => (
  <AnimatedPage>
    <Head>
      <title>Radanfolio Blog</title>

      {/* opengraph */}
      <meta property="og:title" content="Radanfolio Blog" />
      <meta property="og:site_name" content="radanfolio" />
      <meta property="og:url" content="radanfolio.vercel.app" />
      <meta
        property="og:description"
        content="A place where I share what I learned through my journey." />
      <meta property="og:type" content=""
      />
      <meta
        property="og:image"
        content={getCloudinaryOpenGraphImage(
          // eslint-disable-next-line max-len
          "https://res.cloudinary.com/dhwkzyl32/image/upload/v1660293920/radanfolio/blog_opengraph_zpxk7b.jpg"
        )}
      />
    </Head>
    <Hero post={heroPost}/>
    <Featured posts={featuredPosts} />
    <Feed posts={posts}/>
  </AnimatedPage>
);

export const getServerSideProps: GetServerSideProps<BlogProps> = async () => {
  const posts: BlogIndexPost[] = ZBlogIndexPost.array().parse(
    getJSONFileData(path.join(GENERATED_PATH, POSTS_FRONTMATTERS_FILENAME)).posts
  );

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
