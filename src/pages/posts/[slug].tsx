import Image from "next/image";
import Head from "next/head";
import { GetServerSideProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { mdxComponents } from "../../components/mdx";
import { AnimatedPage } from "../../components/AnimatedPage";
import { BannerAd } from "../../components/ads/ExoClick";
import { StrapiPopulate, StraPiResponse } from "../../types/strapi.types";
import { StrapiPost } from "../../types/post.types";
import { StrapiUser } from "../../types/user.types";
import { StrapiMedia } from "../../types/media.types";
import { StrapiTag } from "../../types/tag.types";
import { fullUrl } from "../../utils/strapiUtils";
import { LOCAL_BLUR_PLACEHOLDER_IMAGE } from "../../constants";
import { StrapiFullSeo } from "../../types/seo.types";
import { bundleStrapiContent } from "../../utils/mdxUtils";
import { MDXContent } from "../../components/MDXContent";
import {
  getSinglePost,
} from "../../axios/services/post.services";
import { SinglePostHeader } from "../../components/partials/singlePost/SinglePostHeader";

type ISinglePost = StrapiPopulate<StrapiPost, {
  author: {
    data: StrapiPopulate<StrapiUser, {
      profilePic: {
        data: StrapiMedia;
      };
    }>;
  };
  cover: {
    data: StrapiMedia;
  };
  tags: {
    data: StrapiTag[];
  };
}> & {
  attributes: {
    seo: StrapiFullSeo;
  };
};

type SinglePostPageProps = {
  post: ISinglePost;
};

const SinglePostPage: NextPage<SinglePostPageProps> = ({
  post
}) => {
  return (
    <AnimatedPage>
      <Head>
        <title>{`${post.attributes.title} | Radanfolio`}</title>
        <meta
          name="description"
          content={post.attributes.summary
            || `A blog post by ${post.attributes.author?.data.attributes.fullName}`}
        />

        {/* opengraph */}
        <meta
          property="og:description"
          content={post.attributes.summary
            || `A blog post by ${post.attributes.author?.data.attributes.fullName}`}
        />
        <meta
          property="og:image"
          content={fullUrl(post.attributes.cover?.data.attributes.formats.medium.url || "")}
        />
        <meta property="og:title" content={post.attributes.title} />
        {/* <meta property="og:site_name" content="radanfolio" />
        <meta property="og:url" content="radanfolio.vercel.app" />
        <meta property="og:type" content="" /> */}
      </Head>

      <div
        // initial={{ opacity: 0}}
        // animate={{ opacity: 1}}
        // exit={{ opacity: 0}}
        className="w-full min-h-screen my-12"
      >
        {/* header */}
        <SinglePostHeader
          title={post.attributes.title}
          summary={post.attributes.summary}
          tags={post.attributes.tags?.data.map((tagObject) => {
            return tagObject.attributes.name;
          }) || []}
          publishDate={new Date(post.attributes.publishedAt).toDateString()}
          author={{
            fullName: post.attributes.author?.data.attributes.fullName || "",
            profilePic: {
              url: fullUrl(
                post.attributes.author?.data.attributes.profilePic?.data.attributes.url || ""
              ),
              width:
                post.attributes.author?.data.attributes.profilePic?.data.attributes.width || 100,
              height:
                post.attributes.author?.data.attributes.profilePic?.data.attributes.height || 100,
              alt:
                post.attributes.author?.data.attributes.profilePic?.data.attributes.alternativeText
                || "User's profile picture", 
            },
          }}
        />

        {/* cover image */}
        <figure>
          <Image
            className="h-[70vh] w-full object-cover object-center"
            src={fullUrl(post.attributes.cover?.data.attributes.url || "")}
            alt={post.attributes.cover?.data.attributes.alternativeText || ""}
            width={post.attributes.cover?.data.attributes.width || 1200}
            height={post.attributes.cover?.data.attributes.height || 630}
            placeholder="blur"
            blurDataURL={LOCAL_BLUR_PLACEHOLDER_IMAGE}
          />
        </figure>

        {/* content */}
        <section className="mxw-sm my-12 grid grid-cols-12 gap-4 max-w-[68rem]">
          <div className="col-span-12 md:col-span-9 pr-4">
            <MDXContent
              components={mdxComponents}
              code={post.attributes.content}
            />
          </div>
          <div className="col-span-3 sticky top-28 self-start hidden md:flex justify-center">
            <BannerAd dataZoneId={4865004} />
          </div>
        </section>
        <div className="w-full my-12 max-w-[200px] mx-auto h-3 bg-gray-200 dark:bg-brand2-400" />
      </div>
    </AnimatedPage>
  );
};

type SinglePostPageParams = {
  slug: string;
};

// eslint-disable-next-line max-len
export const getServerSideProps: GetServerSideProps<SinglePostPageProps, SinglePostPageParams> = async ({
  params,
  locale,
  locales,
}) => {
  const [
    post,
    translations,
  ] = await Promise.all([
    (async () => {
      const { data: { 0: post }} = 
        await getSinglePost<StraPiResponse<ISinglePost[]>>(params?.slug || "");

      post.attributes.content = await bundleStrapiContent(post.attributes.content);

      return post;
    })(),
    serverSideTranslations(locale!, ["common", "blog"], null, locales),
  ]);

  return {
    props: {
      post,
      ...translations,
    },
  };
};

export default SinglePostPage;
