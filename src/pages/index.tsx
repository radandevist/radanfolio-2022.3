import path from "path";

import { useEffect, useState } from "react";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { /* GetServerSideProps, */ GetStaticProps, NextPage } from "next/types";
import { useTranslation } from "next-i18next";

import { Hero } from "../components/Hero";
import { Feed } from "../components/Feed";
import { Featured } from "../components/Featured";
import { AnimatedPage } from "../components/AnimatedPage";
import { getRandomElementsImproved } from "../utils/arrayUtils";
import { getCloudinaryOpenGraphImage } from "../helpers/cloudinary";
import { BlogIndexPost } from "../types/post";
import { getJSONFileData } from "../utils/fsUtils";
import { GENERATED_FOLDER_PATH, POSTS_FRONT_MATTERS_FOLDER_NAME } from "../constants";


export type BlogProps = {
  posts: BlogIndexPost[];
  // heroPost: BlogIndexPost;
  // featuredPosts: BlogIndexPost[];
};

const Blog: NextPage<BlogProps> = ({ posts,/*  heroPost, featuredPosts */ }) => {
  const { t } = useTranslation();
  const [heroPost, setHeroPost] = useState<BlogIndexPost>();
  const [featuredPosts, setFeaturedPosts] = useState<BlogIndexPost[]>();

  useEffect(() => {
    setHeroPost(getRandomElementsImproved(posts)[0]);
    setFeaturedPosts(getRandomElementsImproved(posts.filter(post => post.featured === true), 2));
  }, [posts]);

  return (
    <AnimatedPage>
      <Head>
        <title>{`Radanfolio | ${t("common:posts")}`}</title>
        <meta name="description" content={t("blog:openGraph.description")} />

        {/* opengraph */}
        <meta property="og:description" content={t("blog:openGraph.description")} />
        <meta
          property="og:image"
          content={getCloudinaryOpenGraphImage(
            // eslint-disable-next-line max-len
            "https://res.cloudinary.com/dhwkzyl32/image/upload/q_65/v1660293920/radanfolio/blog_opengraph_zpxk7b.jpg"
          )}
        />
        <meta property="og:title" content={t("blog:openGraph.title")} />
        {/* <meta property="og:site_name" content="radanfolio" />
        <meta property="og:url" content="radanfolio.vercel.app" />
        <meta property="og:type" content="" /> */}
      </Head>
      {heroPost && <Hero post={heroPost}/>}
      {featuredPosts && <Featured posts={featuredPosts} />}
      <Feed posts={posts}/>
    </AnimatedPage>
  );
};

export const getStaticProps: GetStaticProps<BlogProps> = async ({ locale, locales }) => {
  const { posts }: { posts: BlogIndexPost[] } = getJSONFileData(
    path.join(
      process.cwd(),
      GENERATED_FOLDER_PATH,
      POSTS_FRONT_MATTERS_FOLDER_NAME,
      `${locale}.json`
    )
  );

  return {
    props: {
      posts,
      // heroPost: getRandomElementsImproved(posts)[0],
      // featuredPosts: getRandomElementsImproved(
      //   posts.filter(post => post.featured === true),
      //   2
      // ),
      ...(await serverSideTranslations(locale!, ["common", "blog"], null, locales))
    }
  };
};

export default Blog;
