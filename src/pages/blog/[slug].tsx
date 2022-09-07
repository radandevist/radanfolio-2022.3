/* eslint-disable max-len */
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { getMDXComponent } from "mdx-bundler/client";
import { useMemo } from "react";
import { z } from "zod";
import { about } from "../../data/about";
import { getFileBySlug, getFiles } from "../../utils/mdxUtils";
import { formatPostFileResult } from "../../functions/blog.functions";
import { mdxComponents } from "../../components/mdx";
import Image from "next/image";
import { getCloudinaryOpenGraphImage, getCloudinaryThumbnail } from "../../helpers/cloudinary";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import Head from "next/head";

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
  // code: string;
};

// eslint-disable-next-line arrow-body-style
const PostView: NextPage<PostViewProps> = ({ post: { code, ...post} }) => {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  const isLarge = useMediaQuery("(min-width: 1024px)");

  return (
    <>
      <Head>
        <title>Radanfolio Blog | {post.title}</title>

        {/* opengraph */}
        <meta property="og:title" content={post.title} />
        <meta property="og:site_name" content="radanfolio" />
        <meta property="og:url" content="radanfolio.vercel.app" />
        <meta
          property="og:description"
          content={post.excerpt || `A blog post by ${post.author}`} />
        <meta property="og:type" content=""
        />
        <meta
          property="og:image"
          // eslint-disable-next-line max-len
          content={getCloudinaryOpenGraphImage(post.cover)}
        />
      </Head>
      <div 
        // initial={{ opacity: 0}}
        // animate={{ opacity: 1}}
        // exit={{ opacity: 0}}
        className="w-full min-h-screen my-12">
        <div className="mxw-sm w-full flex items-center flex-col justify-center space-y-6 text-center my-12">
          <p className="animate animate__animated animate__fadeInDown animate__fast font-semibold capitalize">{post.topic}</p>
          <h2 className="animate animate__animated animate__fadeInDown animate__fast  text-4xl md:text-6xl font-bold capitalize">{post.title}</h2>
          <p className="animate animate__animated animate__fadeIn animate__slow text-xl font-light">{post.excerpt}</p>
          <div className="animate animate__animated animate__fadeIn animate__slow flex items-center space-x-3">
            <img className="h-16 w-16 rounded-full object-cover shadow-lg" alt="avatar_pic" src={about.avatar} />
            <div className="text-left">
              <p>{post.author}</p>
              <p className="italic">{post.date}</p>
            </div>
          </div>
        </div>
        {/* <div className="w-full my-12 max-w-[200px] mx-auto h-3 bg-gray-200" /> */}
        {/* cover image */}
        <section className="">
          <div>
            {/* <img className="h-[70vh] w-full object-cover object-center" src={post.cover} alt="cover image" /> */}
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
          </div>
        </section>
        {/* content */}
        <section className="mxw-sm my-12">
          {/* <div className="flex justify-start my-12">
            <h2 className="text-4xl md:text-6xl">Project Overview</h2>
          </div> */}
          <article className="text-2xl md:text-3xl font-light first-letter:text-4xl first-letter:md:text-6xl first-letter:font-semibold space-y-10 prose">
            {/* {post.code} */}
            {/* {code} */}
            <Component components={mdxComponents} />
          </article>
        </section>
        <div className="w-full my-12 max-w-[200px] mx-auto h-3 bg-gray-200 dark:bg-brand2-400" />
      </div>
    </>
  );
};

export type PostViewParams = {
  slug: string;
};

export const getStaticPaths: GetStaticPaths<PostViewParams> = async () => {
  const posts = await getFiles("posts");

  return {
    paths: posts.map((post) => ({
      params: {
        slug: post.replace(/\.mdx/, ""),
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PostViewProps, PostViewParams> = async (context) => {
  const post = ZPost.parse(formatPostFileResult(await getFileBySlug("posts", context.params?.slug!)));

  return {
    props: {
      post,
    }
  };
};

export default PostView;
