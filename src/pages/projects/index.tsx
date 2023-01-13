import { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
// import { useEffect, useState } from "react";

import { AnimatedPage } from "../../components/AnimatedPage";
// import { ProjectComponent } from "../../components/partials/projects/Project";
// import { getRandomElementsImproved } from "../../utils/arrayUtils";
import { getCloudinaryOpenGraphImage } from "../../helpers/cloudinary";
// import { FeaturedProjects } from "../../components/partials/projects/FeaturedProjects";
import { Featured } from "../../components/partials/Featured";
import { ContentGrid } from "../../components/partials/ContentGrid";
import { getFeaturedProjects, getInitialProjects } from "../../axios/services/project.services";
import { StrapiPopulate, StraPiResponse } from "../../types/strapi.types";
import { StrapiProject } from "../../types/project.types";
import { StrapiMedia } from "../../types/media.types";
import {
  ProjectComponent,
  ProjectComponentProps,
} from "../../components/partials/projects/ProjectComponent";
import { fullUrl } from "../../utils/strapiUtils";
import { getProjectUrl } from "../../utils/pathUtils";

type IProject =  StrapiPopulate<StrapiProject, {
  cover: {
    data: StrapiMedia;
  };
}>;

type ProjectsPageProps = {
  featuredProjects: IProject[];
  initialProjects: IProject[];
};

const ProjectsPage: NextPage<ProjectsPageProps> = ({
  initialProjects,
  featuredProjects,
}) => {
  // const allProjects = projects;
  const { t } = useTranslation();
  // const [featuredProjects, setFeaturedProjects] = useState<ProjectIndex[]>();

  // useEffect(() => {
  //   setFeaturedProjects(
  //     getRandomElementsImproved(projects.filter(project => project.featured === true), 2)
  //   );
  // }, [projects]);

  function convertProjects(projects: IProject[]): ProjectComponentProps[] {
    return projects.map((project) => {
      return {
        title: project.attributes.title,
        summary: project.attributes.summary,
        url: getProjectUrl(project.attributes.slug),
        cover: {
          url: fullUrl(project.attributes.cover?.data.attributes.url || ""),
          alt: project.attributes.cover?.data.attributes.alternativeText || "project thumbnail",
          width: project.attributes.cover?.data.attributes.width || 1200,
          height: project.attributes.cover?.data.attributes.height || 630,
        }
      };
    });
  }

  return (
    <AnimatedPage>
      <Head>
        <title>{`RadanFolio | ${t("common:projects")}`}</title>
        <meta
          property="og:description"
          content={t("projects:openGraph.description")}
        />

        {/* opengraph */}
        <meta
          property="og:description"
          content={t("projects:openGraph.description")}
        />
        <meta
          property="og:image"
          content={getCloudinaryOpenGraphImage(
            // eslint-disable-next-line max-len
            "https://res.cloudinary.com/dhwkzyl32/image/upload/q_65/v1660293920/radanfolio/projects_opengraph_dti1no.jpg"
          )}
        />
        <meta property="og:title" content={t("projects:openGraph.title")} />
        {/* <meta property="og:site_name" content="radanfolio" />
        <meta property="og:url" content="radanfolio.vercel.app" />
        <meta property="og:type" content="" /> */}
      </Head>

      <div className="w-full min-h-screen">
        <div className="mxw-sm w-full my-12 relative">
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold">
            {t("projects:theProjects")}
          </h2>
        </div>
        {/* <section className="mxw-sm grid gap-6 grid-cols-1 sm:grid-cols-2 pb-12">
          {featuredProjects && featuredProjects.slice(0,2).map((project) => (
            <ProjectComponent key={project.id} project={project} />
          ))}
        </section> */}
        {featuredProjects.length > 0 && (
          <Featured
            // title={t("common:featured")}
            Component={ProjectComponent}
            items={convertProjects(featuredProjects)}
          />
        )}
        <ContentGrid
          // title={t("common:latestPosts")}
          Component={ProjectComponent}
          items={convertProjects(initialProjects)}
        />
        {/* <section
          className="mxw-sm grid gap-2 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3
            pb-12"
        >
          {allProjects && allProjects.map((project) => (
            <ProjectComponent key={project.id} project={project}/>
          ))}
        </section> */}
      </div>
    </AnimatedPage>
  );
};

// export const getStaticProps: GetStaticProps<ProjectsProps> = async ({ locale, locales }) => {
//   const { projects }: { projects: ProjectIndex[] } = getJSONFileData(
//     path.join(
//       process.cwd(),
//       GENERATED_FOLDER_PATH,
//       PROJECTS_FRONT_MATTERS_FOLDER_NAME,
//       `${locale}.json`
//     )
//   );

//   return {
//     props: {
//       projects,
//       // featuredProjects: getRandomElementsImproved(
//       //   projects.filter(project => project.featured === true),
//       //   2
//       // ),
//       ...(await serverSideTranslations(locale!, ["common", "projects"], null, locales))
//     },
//   };
// };

export const getServerSideProps: GetServerSideProps<ProjectsPageProps> = async ({
  locale,
  locales,
}) => {
  const [
    featuredProjectsResult,
    initialProjectsResult,
    translations,
  ] = await Promise.all([
    getFeaturedProjects<StraPiResponse<IProject[]>>(),
    getInitialProjects<StraPiResponse<IProject[]>>(),
    serverSideTranslations(locale!, ["common", "projects"], null, locales),
  ]);

  const initialProjects = initialProjectsResult.data;
  const featuredProjects = featuredProjectsResult.data;

  return {
    props: {
      featuredProjects,
      initialProjects,
      ...translations,
    }
  };
};

export default ProjectsPage;
