import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps, NextPage } from "next/types";
import { useTranslation } from "next-i18next";

import { Hero } from "../components/partials/blog/Hero";
import { AnimatedPage } from "../components/AnimatedPage";
import { getRandomElementsImproved } from "../utils/arrayUtils";
import { getCloudinaryOpenGraphImage } from "../helpers/cloudinary";
import { getFeaturedPosts, getInitialPosts } from "../axios/services/post.services";
import { StrapiPopulate, StraPiResponse } from "../types/strapi.types";
import { StrapiPost } from "../types/post.types";
import { StrapiMedia } from "../types/media.types";
import { fullUrl } from "../utils/strapiUtils";
import { getPostUrl } from "../utils/pathUtils";
import { PostComponentProps } from "../components/partials/blog/PostComponent";
import { ContentGrid } from "../components/partials/ContentGrid";
import { ProjectComponent } from "../components/partials/projects/ProjectComponent";
import { Featured } from "../components/partials/Featured";

type IBlogPost = StrapiPopulate<StrapiPost, {
  cover: {
    data: StrapiMedia;
  };
}>;

type BlogPageProps = {
  heroPost: IBlogPost;
  featuredPosts: IBlogPost[];
  initialPosts: IBlogPost[];
};

const BlogPage: NextPage<BlogPageProps> = ({
  heroPost,
  featuredPosts,
  initialPosts,
}) => {
  const { t } = useTranslation();

  function convertPosts(posts: IBlogPost[]): PostComponentProps[] {
    return posts.map((post) => {
      return {
        title: post.attributes.title,
        summary: post.attributes.summary,
        url: getPostUrl(post.attributes.slug),
        date: new Date(post.attributes.publishedAt).toDateString(),
        featured: post.attributes.featured,
        cover: { // or thumbnail
          url: fullUrl(post.attributes.cover?.data.attributes.url || ""),
          alt:
            post.attributes.cover?.data.attributes.alternativeText || "Blog post thumbnail",
          width: post.attributes.cover?.data.attributes.width || 1200,
          height: post.attributes.cover?.data.attributes.height || 630,
        },
      };
    });
  }

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
      </Head>

      {heroPost && (
        <Hero
          title={heroPost.attributes.title}
          summary={heroPost.attributes.summary}
          url={getPostUrl(heroPost.attributes.slug)}
          date={new Date(heroPost.attributes.publishedAt).toDateString()}
          cover={{
            url: fullUrl(heroPost.attributes.cover?.data.attributes.url || ""),
            alt: heroPost.attributes.cover?.data.attributes.alternativeText || "",
            width: heroPost.attributes.cover?.data.attributes.width || 1200,
            height: heroPost.attributes.cover?.data.attributes.height || 630,
          }}
        />
      )}

      {featuredPosts.length > 0
        && (
          <Featured
            title={t("common:featured")}
            Component={ProjectComponent}
            items={convertPosts(featuredPosts)}
          />
        )}

      {/* <Feed posts={convertPosts(initialPosts)} /> */}
      <ContentGrid
        title={t("common:latestPosts")}
        Component={ProjectComponent}
        items={convertPosts(initialPosts)}
      />
    </AnimatedPage>
  );
};

export const getServerSideProps: GetServerSideProps<BlogPageProps> = async ({
  locale,
  locales,
}) => {
  const [
    featuredPostsResult,
    initialPostsResult,
    translations,
  ] = await Promise.all([
    getFeaturedPosts<StraPiResponse<IBlogPost[]>>(),
    getInitialPosts<StraPiResponse<IBlogPost[]>>(),
    serverSideTranslations(locale!, ["common", "blog"], null, locales)
  ]);

  const featuredPosts = featuredPostsResult.data;
  const initialPosts = initialPostsResult.data;

  const heroPost = getRandomElementsImproved(initialPosts)[0];

  return {
    props: {
      heroPost,
      featuredPosts,
      initialPosts,
      ...translations,
    }
  };
};

export default BlogPage;
