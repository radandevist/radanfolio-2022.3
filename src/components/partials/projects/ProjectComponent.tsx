import { FC } from "react";
// import Image from "next/image";
// import Link from "next/link";

// import { ProjectIndex } from "../../../types/project";
// import { getCloudinaryThumbnail } from "../../../helpers/cloudinary";
// import { LOCAL_BLUR_PLACEHOLDER_IMAGE } from "../../../constants";
import { ContentItem, ContentItemSummary, ContentItemTitle } from "../ContentItem";

// import { Link } from "./Link";

export type ProjectComponentProps = {
  // project: ProjectIndex;
  title: string;
  summary: string;
  url: string;
  cover: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
};

export const ProjectComponent: FC<ProjectComponentProps> = ({
  title,
  summary,
  url,
  cover,
}) => (
  // <div className="w-full">
  // <Link href={url} /* state={project} */>
  //   <article className="w-full min-h-64 cursor-pointer">
  //     <figure>
  //       <div className="animate animate__animated animate__fadeIn h-full w-full">
  //         <Image
  //           className="w-full h-56 object-cover rounded-lg shadow-xl"
  //           src={cover.url}
  //           alt={cover.alt}
  //           width={cover.width}
  //           height={cover.height}
  //           placeholder="blur"
  //           blurDataURL={LOCAL_BLUR_PLACEHOLDER_IMAGE}
  //         />
  //       </div>
  //       <figcaption className="py-4 space-y-3">
  //         <h2 className="text-xl md:text-2xl font-bold capitalize line-clamp-3">{title}</h2>
  //         <p className="text-md md:text-lg line-clamp-2">{summary}</p>
  //       </figcaption>
  //     </figure>
  //   </article>
  // </Link>

  <ContentItem
    url={url}
    image={cover}
    body={(
      <>
        <ContentItemTitle text={title} />
        <ContentItemSummary text={summary} />
      </>
    )}
  />
  // </div>
);
