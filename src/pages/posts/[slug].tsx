// import path from "path";
// import fs from "fs";

// import { z } from "zod";
import Image from "next/image";
import Head from "next/head";
import { GetServerSideProps, NextPage } from "next";
import qs from "qs";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { about } from "../../data/about";
import { mdxComponents } from "../../components/mdx";
// import { getCloudinaryOpenGraphImage, getCloudinaryThumbnail } from "../../helpers/cloudinary";
// import { useMediaQuery } from "../../hooks/useMediaQuery";
// import { POSTS_FOLDER } from "../../constants";
import { AnimatedPage } from "../../components/AnimatedPage";
// import { PostContent } from "../../components/PostContent";
import { BannerAd } from "../../components/ads/ExoClick";
import { client } from "../../axios/client";
import { StrapiPopulate, StraPiResponse } from "../../types/strapi.types";
import { StrapiPost } from "../../types/post.types";
import { StrapiUser } from "../../types/user.types";
import { StrapiMedia } from "../../types/media.types";
import { StrapiTag } from "../../types/tag.types";
import { fullUrl } from "../../utils/strapiUtils";
import { STRAPI_BLUR_PLACEHOLDER_IMAGE } from "../../constants";
import { StrapiPostContent } from "../../components/StrapiPostContent";
import { StrapiFullSeo } from "../../types/seo.types";

// export type Post = z.infer<typeof ZPost>;

// const ZPost = z.object({
//   code: z.string(),
//   topic: z.string(),
//   title: z.string(),
//   excerpt: z.string().optional(),
//   author: z.string(),
//   date: z.string(),
//   cover: z.string(),
// });

type ISinglePost = StrapiPopulate<StrapiPost, {
  author: {
    data: StrapiUser;
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
  // const isLarge = useMediaQuery("(min-width: 1024px)");

  return (
    <AnimatedPage>
      <Head>
        <title>{`${post.attributes.title} | Radanfolio`}</title>
        <meta
          name="description"
          content={post.attributes.summary || `A blog post by ${post.attributes.author}`}
        />

        {/* opengraph */}
        <meta
          property="og:description"
          content={post.attributes.summary || `A blog post by ${post.attributes.author}`}
        />
        <meta
          property="og:image"
          // content={getCloudinaryOpenGraphImage(post.cover)}
          content={fullUrl(
            post.attributes.cover?.data.attributes.formats.medium.url
            || ""
          )}
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
        className="w-full min-h-screen my-12">
        <header
          className="mxw-sm w-full flex items-center flex-col
            justify-center space-y-6 text-center my-12"
        >
          <div>
            {post.attributes.tags?.data.map((tag, index) => {
              return (
                <p
                  key={index}
                  className="animate animate__animated animate__fadeInDown animate__fast
                  font-semibold capitalize"
                >
                  {tag.attributes.name}
                </p>
              );
            })}
          </div>
          <h2
            className="animate animate__animated animate__fadeInDown animate__fast
              text-4xl md:text-6xl font-bold capitalize"
          >{post.attributes.title}</h2>
          <p
            className="animate animate__animated animate__fadeIn animate__slow
              text-xl font-light">
            {post.attributes.summary}
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
              <p>{post.attributes.author?.data.attributes.fullName}</p>
              <p className="italic">{new Date(post.attributes.publishedAt).toDateString()}</p>
            </div>
          </div>
        </header>
        {/* <div className="w-full my-12 max-w-[200px] mx-auto h-3 bg-gray-200" /> */}
        {/* cover image */}
        <figure
          // className="h-[70vh] w-full object-cover object-center"
        >
          <Image
            className="h-[70vh] w-full object-cover object-center"
            // className="w-full h-auto max-w-full"
            src={fullUrl(post.attributes.cover?.data.attributes.url || "")}
            alt={post.attributes.cover?.data.attributes.alternativeText || ""}
            width={post.attributes.cover?.data.attributes.width || 1200}
            height={post.attributes.cover?.data.attributes.height || 630}
            placeholder="blur"
            blurDataURL={STRAPI_BLUR_PLACEHOLDER_IMAGE}
          />
        </figure>
        {/* content */}
        <section className="mxw-sm my-12 grid grid-cols-12 gap-4 max-w-[68rem]">
          {/* TODO: Replace with this line when AdSense is ready */}
          {/* <div className="col-span-12 pr-4"> */}
          <div className="col-span-12 md:col-span-9 pr-4">
            {/* <PostContent components={mdxComponents} code={code} /> */}
            <StrapiPostContent
              components={mdxComponents}
              content={post.attributes.content}
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

type PostPageParams = {
  slug: string;
};

// export const getStaticPaths: GetStaticPaths<PostViewParams> = async ({ locales }) => {
//   const slugs = await getPostsSlugs(POSTS_FOLDER);

//   const paths: { params: PostViewParams; locale: string }[] = [];

//   // TODO: Refactor this function: it is the same as in /projecst/[slug].tsx
//   slugs.forEach(slug => {
//     locales?.forEach(locale => {
//       const fullPath = path.join(
//         process.cwd(),
//         POSTS_FOLDER,
//         slug,
//         `${locale}.mdx`
//       );
//       if (fs.existsSync(fullPath)) {
//         paths.push({ params: { slug }, locale });
//       };
//     });
//   });

//   return {
//     paths,
//     fallback: false
//   };
// };

// export const getStaticProps: GetStaticProps<PostViewProps, PostViewParams> = async ({
//   params, locale, locales
// }) => {
//   const post = ZPost
//     .parse(formatPostFileResult(await getFileV3(POSTS_FOLDER, params?.slug!, locale!)));

//   return {
//     props: {
//       post,
//       ...(await serverSideTranslations(locale!, ["common", "blog"], null, locales)),
//     }
//   };
// };

export const getServerSideProps: GetServerSideProps<SinglePostPageProps, PostPageParams> = async ({
  params,
  // locale,
  // locales,
}) => {
  const singlePostQuery = qs.stringify({
    filters: {
      slug: {
        $eq: params?.slug,
      }
    },
    populate: ["author", "cover", "tags", "seo.sharedImage.media"],
  }, {
    encode: false,
  });

  // const paginatedPostCommentsQuery = qs.stringify({
  //   filters: {
  //     post: {
  //       slug: {
  //         $eq: params?.slug,
  //       }
  //     }
  //   },
  //   pagination: {
  //     page: 1,
  //     pageSize: 2,
  //     withCount: true,
  //   },
  //   populate: ["user"],
  // });

  // find posts by slug (slug is unique in our db model)
  const { data: { 0: post } } = await client
    .get<StraPiResponse<ISinglePost[]>>(`/posts?${singlePostQuery}`);

  // find comments by slug (slug is unique in our db model)
  // const idk = await client
  //   .get<StraPiResponse>(`/comments?${paginatedPostCommentsQuery}`)

  // console.log(post);

  return {
    props: {
      post,
    },
  };
};  

export default SinglePostPage;
