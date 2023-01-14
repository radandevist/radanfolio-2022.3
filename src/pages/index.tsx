import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps, NextPage } from "next/types";
import { useTranslation } from "next-i18next";
import { ArticleJsonLd, NextSeo } from "next-seo";
import { useEffect } from "react";

import { Hero } from "../components/partials/blog/Hero";
import { AnimatedPage } from "../components/AnimatedPage";
import { getRandomElements } from "../utils/arrayUtils";
import { getFeaturedPosts, getInitialPosts } from "../axios/services/post.services";
import { StrapiPopulate, StraPiResponse } from "../types/strapi.types";
import { StrapiPost } from "../types/post.types";
import { StrapiMedia } from "../types/media.types";
import { fullUrl } from "../utils/strapiUtils";
import { getPostUrl } from "../utils/pathUtils";
import { PostComponent, PostComponentProps } from "../components/partials/blog/PostComponent";
import { ContentGrid } from "../components/partials/ContentGrid";
import { Featured } from "../components/partials/Featured";
import { DEFAULT_PAGE_SIZE_QUERY, NEXT_APP_DOMAIN_URL } from "../constants";
import { about } from "../data/about";
import { mainApi } from "../redux/services/mainApi";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  appendLoadedPosts,
  incrementPage,
  selectIsLastPage,
  selectLoadedPosts,
  selectPostPage,
  setIsLastPage,
  setLoadedPosts,
  setPostPage,
} from "../redux/features/post/post.reducer";

export type IBlogPost = StrapiPopulate<StrapiPost, {
  cover: {
    data: StrapiMedia;
  };
}>;

type BlogPageProps = {
  heroPost: IBlogPost;
  featuredPosts: IBlogPost[];
  initialPosts: IBlogPost[];
  initialPage: number;
};

const BlogPage: NextPage<BlogPageProps> = ({
  heroPost,
  featuredPosts,
  initialPosts,
  initialPage,
}) => {
  const { t } = useTranslation();
  const [
    triggerFetchNextPage,
    fetchNexPageResult,
  ] = mainApi.endpoints.getPostsByPage.useLazyQuery();
  const dispatch = useAppDispatch();

  const loadedPosts = useAppSelector(selectLoadedPosts) as IBlogPost[];
  const page = useAppSelector(selectPostPage);
  const isLastPage = useAppSelector(selectIsLastPage);

  useEffect(() => {
    if (loadedPosts.length === 0) {
      dispatch(setPostPage(initialPage));
      dispatch(setLoadedPosts(initialPosts));
    }
  });

  useEffect(() => {
    if (fetchNexPageResult.data) {
      if (fetchNexPageResult.data.data.length > 0) {
        dispatch(appendLoadedPosts(fetchNexPageResult.data.data));
        dispatch(incrementPage(1));

        if (fetchNexPageResult.data.data.length < DEFAULT_PAGE_SIZE_QUERY) {
          dispatch(setIsLastPage(true));
        }
      } else { // if data.length === )
        dispatch(setIsLastPage(true));
      }
    }
  }, [dispatch, fetchNexPageResult.data]);

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

  function handleLoadMorePosts() {
    triggerFetchNextPage({ page: page + 1 });
  }

  return (
    <AnimatedPage>
      <NextSeo
        title={`${t("blog:openGraph.title")}`}
        description={`${t("blog:openGraph.description")}`}
        openGraph={{
          title: `${t("blog:openGraph.title")}`,
          description: `${t("blog:openGraph.description")}`,
          type: "blog",
          images: [
            {
              url: `${NEXT_APP_DOMAIN_URL}/images/meta/blog_og_image.jpg`,
              alt: `${t("blog:openGraph.title")}`,
            }
          ]
        }}
      />

      <ArticleJsonLd
        type="BlogPosting"
        url={`${NEXT_APP_DOMAIN_URL}`}
        title="Radan's Blog"
        images={[
          `${NEXT_APP_DOMAIN_URL}/images/meta/blog_og_image.jpg`
        ]}
        datePublished={new Date("06-26-2022").toString()}
        dateModified={new Date("01-14-2022").toString()}
        authorName={about.name}
        description={t("blog:openGraph.description")}
      />

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
            title={`${t("common:featured")}`}
            Component={PostComponent}
            items={convertPosts(featuredPosts)}
          />
        )}

      <ContentGrid
        title={`${t("common:latestPosts")}`}
        Component={PostComponent}
        items={convertPosts(loadedPosts)}
        loading={fetchNexPageResult.isLoading}
      />

      {/* Load more button */}
      <div className="mxw-sm mb-16">
        <div className="flex justify-center">
          {!isLastPage
            ? (
              <button
                onClick={handleLoadMorePosts}
                className="bg-brand1-contrasted text-white text-lg
              font-semibold px-5 pb-2 pt-3.5"
              >
                Load More
              </button>
            )
            : (
              <p className="text-lg">Congrats! 🎉 You reached the end of all posts.</p>
            )}
        </div>
      </div>
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
  const initialPage = initialPostsResult.meta.pagination?.page || 1;

  const heroPost = getRandomElements(initialPosts)[0];

  return {
    props: {
      heroPost,
      featuredPosts,
      initialPosts,
      initialPage,
      ...translations,
    }
  };
};

export default BlogPage;
