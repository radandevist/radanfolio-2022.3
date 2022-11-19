import path from "path";

import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";

import { AnimatedPage } from "../../components/AnimatedPage";
import { ProjectComponent } from "../../components/Project";
import { getRandomElementsImproved } from "../../utils/arrayUtils";
import { getCloudinaryOpenGraphImage } from "../../helpers/cloudinary";
import { ProjectIndex } from "../../types/project";
import { GENERATED_FOLDER_PATH, PROJECTS_FRONT_MATTERS_FOLDER_NAME } from "../../constants";
import { getJSONFileData } from "../../utils/fsUtils";


type ProjectsProps = {
  projects: ProjectIndex[];
  // featuredProjects: ProjectIndex[];
};

const Projects: NextPage<ProjectsProps> = ({ projects, /* featuredProjects */ }) => {
  const allProjects = projects;
  const { t } = useTranslation();
  const [featuredProjects, setFeaturedProjects] = useState<ProjectIndex[]>();

  useEffect(() => {
    setFeaturedProjects(
      getRandomElementsImproved(projects.filter(project => project.featured === true), 2)
    );
  }, [projects]);
  

  return (
    <AnimatedPage>
      <Head>
        <title>{`RadanFolio | ${t("common:projects")}`}</title>

        {/* opengraph */}
        <meta property="og:title" content={t("projects:openGraph.title")} />
        <meta property="og:site_name" content="radanfolio" />
        <meta property="og:url" content="radanfolio.vercel.app" />
        <meta
          property="og:description"
          content={t("projects:openGraph.description")}
        />
        <meta property="og:type" content="" />
        <meta
          property="og:image"
          content={getCloudinaryOpenGraphImage(
            // eslint-disable-next-line max-len
            "https://res.cloudinary.com/dhwkzyl32/image/upload/q_65/v1660293920/radanfolio/projects_opengraph_dti1no.jpg"
          )}
        />
      </Head>
      <div className="w-full min-h-screen">
        <div className="mxw-sm w-full my-12 relative">
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold">
            {t("projects:theProjects")}
          </h2>
        </div>
        <section className="mxw-sm grid gap-6 grid-cols-1 sm:grid-cols-2 pb-12">
          {featuredProjects && featuredProjects.slice(0,2).map((project) => (
            <ProjectComponent key={project.id} project={project} />
          ))}
        </section>
        <section
          className="mxw-sm grid gap-2 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3
            pb-12"
        >
          {allProjects && allProjects.map((project) => (
            <ProjectComponent key={project.id} project={project}/>
          ))}
        </section>
      </div>
    </AnimatedPage>
  );
};

export const getStaticProps: GetStaticProps<ProjectsProps> = async ({ locale, locales }) => {
  const { projects }: { projects: ProjectIndex[] } = getJSONFileData(
    path.join(
      process.cwd(),
      GENERATED_FOLDER_PATH,
      PROJECTS_FRONT_MATTERS_FOLDER_NAME,
      `${locale}.json`
    )
  );

  return {
    props: {
      projects,
      // featuredProjects: getRandomElementsImproved(
      //   projects.filter(project => project.featured === true),
      //   2
      // ),
      ...(await serverSideTranslations(locale!, ["common", "projects"], null, locales))
    },
  };
};

export default Projects;
