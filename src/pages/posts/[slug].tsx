// import path from "path";
// import fs from "fs";

// import { z } from "zod";
import Image from "next/image";
import Head from "next/head";
import { GetServerSideProps, NextPage } from "next";
import qs from "qs";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

// import { about } from "../../data/about";
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
import { StrapiFullSeo } from "../../types/seo.types";
import { bundleStrapiContent } from "../../utils/mdxUtils";
import { SinglePostHeader } from "../../components/partials/blog/SinglePostHeader";
import { MDXContent } from "../../components/MDXContent";

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
        className="w-full min-h-screen my-12">
        <SinglePostHeader
          title={post.attributes.title}
          summary={post.attributes.summary}
          tags={post.attributes.tags?.data.map((tagObject) => {
            return tagObject.attributes.name;
          }) || []}
          publishDate={post.attributes.publishedAt as unknown as string}
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
  locale,
  locales,
}) => {
  const singlePostQuery = qs.stringify({
    filters: {
      slug: {
        $eq: params?.slug,
      }
    },
    populate: ["author.profilePic", "cover", "tags", "seo.sharedImage.media"],
  }, {
    encode: false,
  });

  // ! Important do not eraser 
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

  post.attributes.content = await bundleStrapiContent(post.attributes.content);

  const translations = await serverSideTranslations(locale!, ["common", "blog"], null, locales);

  // ! Important do not erase
  // find comments by slug (slug is unique in our db model)
  // const idk = await client
  //   .get<StraPiResponse>(`/comments?${paginatedPostCommentsQuery}`)

  // console.log(post);

  return {
    props: {
      post,
      ...translations,
    },
  };
};

export default SinglePostPage;
