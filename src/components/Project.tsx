import React, { FC } from "react";
import { ProjectIndex } from "../types/project";
import { Link } from "./Link";
import Image from "next/image";
import { getCloudinaryThumbnail } from "../helpers/cloudinary";

export type ProjectComponentProps = {
  project: ProjectIndex;
};

export const ProjectComponent: FC<ProjectComponentProps> = ({ project }) => (
  <div className="w-full">
    <Link href={`/projects/${project?.slug}`} /* state={project} */>
      <>
        <div className="animate animate__animated animate__fadeIn">
          <Image
            className="h-56 w-full object-cover rounded-lg"
            width={1640}
            height={924}
            src={project.cover}
            alt="project_cover_image"
            placeholder="blur"
            blurDataURL={getCloudinaryThumbnail(project.cover)}
          />
        </div>
        <div className="py-4 space-y-3">
          <h2 className="text-xl md:text-2xl font-light">{project?.name}</h2>
          <p className="text-md md:text-lg truncate">{project?.summary}</p>
        </div>
      </>
    </Link>
  </div>
);
