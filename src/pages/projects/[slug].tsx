/* eslint-disable max-len */
import { getMDXComponent } from "mdx-bundler/client";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useMemo } from "react";
import { z } from "zod";
import { formatProjectFileResult } from "../../functions/projects.functions";
import { getFileBySlug, getFiles } from "../../utils/mdxUtils";
// import { projects } from "../../data/projects";
// import { Project } from "../../data/projects/projects.types";

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
  const Component = useMemo(() => getMDXComponent(code), [code]);

  return (
    <div 
      // initial={{ width: 0}}
      // animate={{ width: "100%"}}
      // exit={{ x: window.innerWidth}}
      className="w-full min-h-screen my-12">
      <div className="mxw-sm w-full flex items-center flex-col justify-center space-y-6 text-left sm:text-center my-12">
        <p className={project?.category === "web3" ? "animate animate__animated animate__fadeInDown animate__fast font-future uppercase" : "animate animate__animated animate__fadeInDown animate__fast font-bold uppercase"}>{project?.category}</p>
        <h2 className="animate animate__animated animate__fadeInDown animate__fast text-4xl md:text-6xl font-bold capitalize">{project?.name}</h2>
        <p className="animate animate__animated animate__fadeIn animate__slow text-xl font-light">{project?.summary}</p>
        <div className="flex items-center space-x-2">
          {project.liveUrl && <a target="_blank" rel="noreferrer" href={project.liveUrl} className="first-letter:text-2xl text-sm md:text-md first-letter:font-bold p-1 border-2 border-transparent hover:border-b-rose-600 duration-200">Visit Project</a>}
          <a target="_blank" rel="noreferrer" href={project?.repoUrl} className="first-letter:text-2xl text-sm md:text-md first-letter:font-bold p-1 border-2 border-transparent hover:border-b-rose-600 duration-200">Github</a>
        </div>
      </div>
      {/* <div className="w-full my-12 max-w-[200px] mx-auto h-3 bg-gray-200" /> */}
      {/* cover image */}
      <section className="">
        <div>
          <img className="h-[70vh] w-full object-cover object-center" src={project?.cover} alt="cover image" />
        </div>
      </section>
      {/* content */}
      <section className="mxw-sm my-12">
        {/* <div className="flex justify-start my-12">
          <h2 className="text-4xl md:text-6xl">Overview</h2>
        </div> */}
        <p className="text-2xl md:text-3xl font-light first-letter:text-4xl first-letter:md:text-6xl first-letter:font-semibold space-y-10 prose">
          <Component />
        </p>
      </section>
      <div className="w-full my-12 max-w-[200px] mx-auto h-3 bg-gray-200" />
    </div>
  );
};

export type ProjectViewParams = {
  slug: string;
};

export const getStaticPaths: GetStaticPaths<ProjectViewParams> = async () => {
  const projects = await getFiles("projects");

  return {
    paths: projects.map((project) => ({
      params: {
        slug: project.replace(/\.mdx/, ""),
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<ProjectViewProps, ProjectViewParams> = async (context) => {
  // const project = projects.find((project) => project.slug === context.params?.slug);
  const project = ZProject.parse(formatProjectFileResult(await getFileBySlug("projects", context.params?.slug!)));

  return {
    props: {
      project,
    },
  };
};

export default ProjectView;
