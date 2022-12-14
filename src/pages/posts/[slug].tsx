import path from "path";
import fs from "fs";

import { z } from "zod";
import Image from "next/image";
import Head from "next/head";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { about } from "../../data/about";
import { getFileV3, getPostsSlugs } from "../../utils/mdxUtils";
import { formatPostFileResult } from "../../functions/blog.functions";
import { mdxComponents } from "../../components/mdx";
import { getCloudinaryOpenGraphImage, getCloudinaryThumbnail } from "../../helpers/cloudinary";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { POSTS_FOLDER } from "../../constants";
import { AnimatedPage } from "../../components/AnimatedPage";
import { PostContent } from "../../components/PostContent";
import { BannerAd } from "../../components/ads/ExoClick";

export type Post = z.infer<typeof ZPost>;

const ZPost = z.object({
  code: z.string(),
  topic: z.string(),
  title: z.string(),
  excerpt: z.string().optional(),
  author: z.string(),
  date: z.string(),
  cover: z.string(),
});

export type PostViewProps = {
  post: Post;
};

const PostView: NextPage<PostViewProps> = ({ post: { code, ...post} }) => {
  const isLarge = useMediaQuery("(min-width: 1024px)");

  return (
    <AnimatedPage>
      <Head>
        <title>{`Radanfolio | ${post.title}`}</title>
        <meta name="description" content={post.excerpt || `A blog post by ${post.author}`} />

        {/* opengraph */}
        <meta property="og:description" content={post.excerpt || `A blog post by ${post.author}`} />
        <meta
          property="og:image"
          content={getCloudinaryOpenGraphImage(post.cover)}
        />
        <meta property="og:title" content={post.title} />
        {/* <meta property="og:site_name" content="radanfolio" />
        <meta property="og:url" content="radanfolio.vercel.app" />
        <meta property="og:type" content="" /> */}
      </Head>
      <div
        // initial={{ opacity: 0}}
        // animate={{ opacity: 1}}
        // exit={{ opacity: 0}}
        className="w-full min-h-screen my-12">
        <header
          className="mxw-sm w-full flex items-center flex-col
            justify-center space-y-6 text-center my-12"
        >
          <p
            className="animate animate__animated animate__fadeInDown animate__fast
              font-semibold capitalize"
          >
            {post.topic}
          </p>
          <h2
            className="animate animate__animated animate__fadeInDown animate__fast
              text-4xl md:text-6xl font-bold capitalize"
          >{post.title}</h2>
          <p
            className="animate animate__animated animate__fadeIn animate__slow
              text-xl font-light">
            {post.excerpt}
          </p>
          <div
            className="animate animate__animated animate__fadeIn animate__slow
              flex items-center space-x-3"
          >
            <img
              className="h-16 w-16 rounded-full object-cover shadow-lg"
              alt="avatar_pic"
              src={about.avatar}
            />
            <div className="text-left">
              <p>{post.author}</p>
              <p className="italic">{post.date}</p>
            </div>
          </div>
        </header>
        {/* <div className="w-full my-12 max-w-[200px] mx-auto h-3 bg-gray-200" /> */}
        {/* cover image */}
        <figure>
          <Image
            className="h-[70vh] w-full object-cover object-center"
            src={post.cover}
            alt="cover_image"
            // height={1688}
            height={isLarge ? 924 : 1688}
            width={3000}
            placeholder="blur"
            blurDataURL={getCloudinaryThumbnail(post.cover)}
          />
        </figure>
        {/* content */}
        <section className="mxw-sm my-12 grid grid-cols-12 gap-4 max-w-[68rem]">
          {/* TODO: Replace with this line when AdSense is ready */}
          {/* <div className="col-span-12 pr-4"> */}
          <div className="col-span-12 md:col-span-9 pr-4">
            <PostContent components={mdxComponents} code={code} />
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

export type PostViewParams = {
  slug: string;
};

export const getStaticPaths: GetStaticPaths<PostViewParams> = async ({ locales }) => {
  const slugs = await getPostsSlugs(POSTS_FOLDER);

  const paths: { params: PostViewParams; locale: string }[] = [];

  // TODO: Refactor this function: it is the same as in /projecst/[slug].tsx
  slugs.forEach(slug => {
    locales?.forEach(locale => {
      const fullPath = path.join(
        process.cwd(),
        POSTS_FOLDER,
        slug,
        `${locale}.mdx`
      );
      if (fs.existsSync(fullPath)) {
        paths.push({ params: { slug }, locale });
      };
    });
  });

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps<PostViewProps, PostViewParams> = async ({
  params,locale, locales
}) => {
  const post = ZPost
    .parse(formatPostFileResult(await getFileV3(POSTS_FOLDER, params?.slug!, locale!)));

  return {
    props: {
      post,
      ...(await serverSideTranslations(locale!, ["common", "blog"], null, locales)),
    }
  };
};

export default PostView;
