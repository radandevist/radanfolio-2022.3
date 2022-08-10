/* eslint-disable max-len */
import { GetServerSideProps, NextPage } from "next";
import { AnimatedPage } from "../../components/AnimatedPage";
import { ProjectComponent } from "../../components/Project";
import { z } from "zod";
import { getRandomElements } from "../../utils/arrayUtils";
import { getAllFilesFrontMatter } from "../../utils/mdxUtils";
import { formatProjectFrontMatter } from "../../functions/projects.functions";
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
      <div className="w-full min-h-screen">
        <div className="mxw-sm w-full my-12 relative">
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold">The Projects.</h2>
        </div>
        <section className="mxw-sm grid gap-6 grid-cols-1 sm:grid-cols-2 pb-12">
          {featuredProjects && featuredProjects.slice(0,2).map((project) => (
            <ProjectComponent key={project?.id} project={project} />
          ))}
        </section>
        <section className="mxw-sm grid gap-2 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pb-12">
          {allProjects && allProjects.map((project) => (
            <ProjectComponent key={project?.id} project={project}/>
          ))}
        </section>
      </div>
    </AnimatedPage>
  );
};

export const getServerSideProps: GetServerSideProps<ProjectsProps> = async () => {
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
