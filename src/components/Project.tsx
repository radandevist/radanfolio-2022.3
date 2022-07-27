/* eslint-disable max-len */
import React, { FC } from "react";
import { Project } from "../data/projects";
import { Link } from "./Link";

export type ProjectComponentProps = {
  project: Project;
};

export const ProjectComponent: FC<ProjectComponentProps> = ({ project }) => (
  <div className="w-full">
    <Link href={`/projects/${project?.slug}`} /* state={project} */>
      <>
        <div className="animate animate__animated animate__fadeIn">
          <img className="h-56 w-full object-cover rounded-lg" src={project?.cover} alt="project cover image" />
        </div>
        <div className="py-4 space-y-3">
          <h2 className="text-xl md:text-2xl font-light">{project?.name}</h2>
          <p className="text-md md:text-lg truncate">{project?.overview}</p>
        </div>
      </>
    </Link>
  </div>
);
