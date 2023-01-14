import { NextPage, GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { NextSeo } from "next-seo";

import { AnimatedPage } from "../../components/AnimatedPage";
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
import { NEXT_APP_DOMAIN_URL } from "../../constants";

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
  const { t } = useTranslation();

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
      <NextSeo
        title={`${t("projects:openGraph.title")}`}
        description={`${t("projects:openGraph.description")}`}
        openGraph={{
          title: `${t("projects:openGraph.title")}`,
          description: `${t("projects:openGraph.description")}`,
          images: [
            {
              url: `${NEXT_APP_DOMAIN_URL}/images/meta/projects_og_image.jpg`,
              alt: `${t("projects:openGraph.title")}`,
            },
          ],
        }}
      />

      <div className="w-full min-h-screen">
        <div className="mxw-sm w-full my-12 relative">
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold">
            {t("projects:theProjects")}
          </h2>
        </div>
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
      </div>
    </AnimatedPage>
  );
};

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
