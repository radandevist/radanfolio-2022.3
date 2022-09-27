/* eslint-disable max-len */
import { GetStaticProps, NextPage } from "next";
import { AnimatedPage } from "../../components/AnimatedPage";
import { ProjectComponent } from "../../components/Project";
import { z } from "zod";
import { getRandomElements } from "../../utils/arrayUtils";
import { getAllFilesFrontMatter } from "../../utils/mdxUtils";
import { formatProjectFrontMatter } from "../../functions/projects.functions";
import Head from "next/head";
import { getCloudinaryOpenGraphImage } from "../../helpers/cloudinary";
// import { projects } from "../../data/projects";

const ZProjectIndex = z.object({
  id: z.string(),
  name: z.string(),
  cover: z.string(),
  // liveUrl: z.string().nullable(),
  summary: z.string(),
  // repoUrl: z.string(),
  stack: z
    .object({ id: z.string(), name: z.string() })
    .array(),
  slug: z.string(),
  featured: z.boolean(),
});

export type ProjectIndex = z.infer<typeof ZProjectIndex>;

export type ProjectsProps = {
  projects: ProjectIndex[];
  featuredProjects: ProjectIndex[];
};

const Projects: NextPage<ProjectsProps> = ({ projects, featuredProjects }) => {
  const allProjects = projects;
  // const featuredProjects = allProjects.filter(project => project.featured === true);

  return (
    <AnimatedPage>
      <Head>
        <title>Radanfolio Projects</title>

        {/* opengraph */}
        <meta property="og:title" content="Radanfolio Projects" />
        <meta property="og:site_name" content="radanfolio" />
        <meta property="og:url" content="radanfolio.vercel.app" />
        <meta
          property="og:description"
          content="A collection of projects I've done." />
        <meta property="og:type" content=""
        />
        <meta
          property="og:image"
          content={getCloudinaryOpenGraphImage(
            // eslint-disable-next-line max-len
            "https://res.cloudinary.com/dhwkzyl32/image/upload/v1660293920/radanfolio/projects_opengraph_dti1no.jpg"
          )}
        />
      </Head>
      <div className="w-full min-h-screen">
        <div className="mxw-sm w-full my-12 relative">
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold">The Projects.</h2>
        </div>
        <section className="mxw-sm grid gap-6 grid-cols-1 sm:grid-cols-2 pb-12">
          {featuredProjects && featuredProjects.slice(0,2).map((project) => (
            <ProjectComponent key={project.id} project={project} />
          ))}
        </section>
        <section className="mxw-sm grid gap-2 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pb-12">
          {allProjects && allProjects.map((project) => (
            <ProjectComponent key={project.id} project={project}/>
          ))}
        </section>
      </div>
    </AnimatedPage>
  );
};

export const getStaticProps: GetStaticProps<ProjectsProps> = async () => {
  const projects = (await getAllFilesFrontMatter("projects"))
    .map(frontMatter => ZProjectIndex.parse(formatProjectFrontMatter(frontMatter)));

  return {
    props: {
      projects,
      featuredProjects: getRandomElements(
        projects.filter(project => project.featured === true),
        2
      )
    },
  };
};

export default Projects;
