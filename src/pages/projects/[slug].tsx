import path from "path";
import fs from "fs";

import { z } from "zod";
import Image from "next/image";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { mdxComponents } from "../../components/mdx";
import { formatProjectFileResult } from "../../functions/projects.functions";
import { getCloudinaryOpenGraphImage, getCloudinaryThumbnail } from "../../helpers/cloudinary";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { getFileV3, getPostsSlugs } from "../../utils/mdxUtils";
import { PROJECTS_FOLDER } from "../../constants";
import { AnimatedPage } from "../../components/AnimatedPage";
import { PostContent } from "../../components/PostContent";


const ZProject = z.object({
  // id: z.string(),
  name: z.string(),
  cover: z.string(),
  summary: z.string(),
  stack: z
    .object({ id: z.string(), name: z.string() })
    .array(),
  // slug: z.string(),
  // featured: z.boolean(),
  // * these fields make it different from ZProjectIndex
  repoUrl: z.string(),
  liveUrl: z.string().nullable(),
  category: z.string(),
  code: z.string(),
});

export type Project = z.infer<typeof ZProject>;

export type ProjectViewProps = {
  project: Project;
};

const ProjectView: NextPage<ProjectViewProps> = ({ project: { code, ...project } }) => {
  const isLarge = useMediaQuery("(min-width: 1024px)");
  const { t } = useTranslation();

  return (
    <AnimatedPage>
      <Head>
        <title>{`Radanfolio | ${project.name}`}</title>

        {/* opengraph */}
        <meta property="og:title" content={project.name} />
        <meta property="og:site_name" content="radanfolio" />
        <meta property="og:url" content="radanfolio.vercel.app" />
        <meta
          property="og:description"
          content={project.summary} />
        <meta property="og:type" content=""
        />
        <meta
          property="og:image"
          
          content={getCloudinaryOpenGraphImage(project.cover)}
        />
      </Head>
      <div 
        // initial={{ width: 0}}
        // animate={{ width: "100%"}}
        // exit={{ x: window.innerWidth}}
        className="w-full min-h-screen my-12">
        <header
          className="mxw-sm w-full flex items-center flex-col justify-center
            space-y-6 text-left sm:text-center my-12"
        >
          <p
            className={project.category === "web3"
              ? "animate animate__animated animate__fadeInDown animate__fast font-future uppercase"
              : "animate animate__animated animate__fadeInDown animate__fast font-bold uppercase"}
          >
            {project.category}
          </p>
          <h2
            className="animate animate__animated animate__fadeInDown animate__fast
              text-4xl md:text-6xl font-bold capitalize">
            {project.name}
          </h2>
          <p className="animate animate__animated animate__fadeIn animate__slow text-xl font-light">
            {project.summary}
          </p>
          <div className="flex items-center space-x-2">
            {project.liveUrl && (
              <a
                target="_blank"
                rel="noreferrer"
                href={project.liveUrl}
                className="first-letter:text-2xl text-sm md:text-md first-letter:font-bold p-1
                  border-2 border-transparent hover:border-b-brand1-500 duration-200"
              >
                {t("projects:visitProject")}
              </a>
            )}
            <a
              target="_blank"
              rel="noreferrer"
              href={project.repoUrl}
              className="first-letter:text-2xl text-sm md:text-md first-letter:font-bold p-1
                border-2 border-transparent hover:border-b-brand1-500 duration-200"
            >
              Github
            </a>
          </div>
        </header>
        {/* <div className="w-full my-12 max-w-[200px] mx-auto h-3 bg-gray-200" /> */}
        {/* cover image */}
        <figure>
          <Image
            className="w-full object-cover object-center"
            src={project.cover}
            alt="cover_image"
            width={1640}
            // height={924}
            height={isLarge ? 528 : 924}
            placeholder="blur"
            blurDataURL={getCloudinaryThumbnail(project.cover)}
            // layout="fill"
          />
        </figure>
        {/* content */}
        <section className="mxw-sm my-12 grid grid-cols-12 gap-4 max-w-[68rem]">
          {/* TODO: Replace with this line when AdSense is ready */}
          {/* <div className="col-span-12 md:col-span-9 pr-4"> */}
          <div className="col-span-12 pr-4">
            {/* <div className="flex justify-start my-12">
              <h2 className="text-4xl md:text-6xl">Project Overview</h2>
            </div> */}
            <PostContent components={mdxComponents} code={code} />
          </div>
          <div className="col-span-3 sticky top-28 self-start hidden md:block">
            {/* <div className="bg-red-500 h-96">AD HERE</div> */}
          </div>
        </section>
        <div className="w-full my-12 max-w-[200px] mx-auto h-3 bg-gray-200 dark:bg-brand2-400" />
      </div>
    </AnimatedPage>
  );
};

export type ProjectViewParams = {
  slug: string;
};

export const getStaticPaths: GetStaticPaths<ProjectViewParams> = async ({ locales }) => {
  const slugs = await getPostsSlugs(PROJECTS_FOLDER);

  const paths: { params: ProjectViewParams; locale: string }[] = [];

  slugs.forEach(slug => {
    locales?.forEach(locale => {
      const fullPath = path.join(process.cwd(), PROJECTS_FOLDER, slug, `${locale}.mdx`);
      if (fs.existsSync(fullPath)) paths.push({ params: { slug }, locale });
    });
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<ProjectViewProps, ProjectViewParams> = async ({
  params, locale, locales
}) => {
  const project = ZProject
    .parse(formatProjectFileResult(await getFileV3(PROJECTS_FOLDER, params?.slug!, locale!)));

  return {
    props: {
      project,
      ...(await serverSideTranslations(locale!, ["common", "projects"], null, locales)),
    },
  };
};

export default ProjectView;
