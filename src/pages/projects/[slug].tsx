import Image from "next/image";
import { GetServerSideProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";
import Head from "next/head";

import { mdxComponents } from "../../components/mdx";
import { bundleStrapiContent } from "../../utils/mdxUtils";
import { AnimatedPage } from "../../components/AnimatedPage";
import { StrapiProject } from "../../types/project.types";
import { StrapiMedia } from "../../types/media.types";
import { StrapiFullSeo } from "../../types/seo.types";
import { StrapiTechStack } from "../../types/techStack.types";
import { StrapiPopulate, StraPiResponse } from "../../types/strapi.types";
import { getSingleProject } from "../../axios/services/project.services";
import { fullUrl } from "../../utils/strapiUtils";
import { SingleProjectHeader } from "../../components/partials/singleProject/SingleProjectHeader";
import { BannerAd } from "../../components/ads/ExoClick";
import { LOCAL_BLUR_PLACEHOLDER_IMAGE } from "../../constants";
import { MDXContent } from "../../components/MDXContent";

type ISingleProject = StrapiPopulate<StrapiProject, {
  cover: {
    data: StrapiMedia;
  };
  tags: {
    data: StrapiTechStack[];
  };
}> & {
  attributes: {
    seo: StrapiFullSeo;
  };
};

type SingleProjectPageProps = {
  project: ISingleProject;
};

const SingleProjectPage: NextPage<SingleProjectPageProps> = ({
  project,
}) => {
  return (
    <AnimatedPage>
      <Head>
        <meta name="keywords" content={project.attributes.seo.keywords} />
      </Head>

      <NextSeo
        title={project.attributes.seo.metaTitle}
        description={project.attributes.seo.metaDescription}
        openGraph={{
          type: "article",
          title: project.attributes.seo.metaTitle,
          description: project.attributes.seo.metaDescription,
          images: [
            {
              url: fullUrl(project.attributes.seo.sharedImage.media.data.attributes.url),
              alt: project.attributes.seo.sharedImage.alt,
            },
          ]
        }}
      />

      <div
        // initial={{ width: 0}}
        // animate={{ width: "100%"}}
        // exit={{ x: window.innerWidth}}
        className="w-full min-h-screen my-12"
      >
        {/* header */}
        <SingleProjectHeader
          title={project.attributes.title}
          summary={project.attributes.summary}
          liveUrl={project.attributes.liveUrl}
          repoUrl={project.attributes.repoUrl}
        />

        {/* cover image */}
        <figure>
          <Image
            className="h-[70vh] w-full object-cover object-center"
            src={fullUrl(project.attributes.cover?.data.attributes.url || "")}
            alt={project.attributes.cover?.data.attributes.alternativeText || "project cover image"}
            width={project.attributes.cover?.data.attributes.width || 1200}
            height={project.attributes.cover?.data.attributes.height || 630}
            placeholder="blur"
            blurDataURL={LOCAL_BLUR_PLACEHOLDER_IMAGE}
          />
        </figure>

        {/* content */}
        <section className="mxw-sm my-12 grid grid-cols-12 gap-4 max-w-[68rem]">
          <div className="col-span-12 md:col-span-9 pr-4">
            {/* <div className="flex justify-start my-12">
              <h2 className="text-4xl md:text-6xl">Project Overview</h2>
            </div> */}
            <MDXContent components={mdxComponents} code={project.attributes.content} />
          </div>
          <div className="col-span-3 sticky top-28 self-start hidden md:block">
            <BannerAd dataZoneId={4865004} />
          </div>
        </section>

        {/* separator */}
        <div className="w-full my-12 max-w-[200px] mx-auto h-3 bg-gray-200 dark:bg-brand2-400" />
      </div>
    </AnimatedPage>
  );
};

type SingleProjectPageParams = {
  slug: string;
};

// eslint-disable-next-line max-len
export const getServerSideProps: GetServerSideProps<SingleProjectPageProps, SingleProjectPageParams> = async ({
  params,
  locale,
  locales,
}) => {
  const [
    translations,
    project,
  ] = await Promise.all([
    serverSideTranslations(locale!, ["common", "projects"], null, locales),
    (async () => {
      const { data: { 0: project }} = 
        await getSingleProject<StraPiResponse<ISingleProject[]>>(params?.slug || "");

      project.attributes.content = await bundleStrapiContent(project.attributes.content);

      return project;
    })()
  ]);

  return {
    props: {
      project,
      ...translations,
    },
  };
};

export default SingleProjectPage;
