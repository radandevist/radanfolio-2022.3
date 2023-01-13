import { FC } from "react";
// import Image from "next/image";
// import Link from "next/link";

// import { BlogIndexPost } from "../types/post";
// import { getCloudinaryThumbnail } from "../helpers/cloudinary";
// import { LOCAL_BLUR_PLACEHOLDER_IMAGE } from "../../../constants";
import { FeaturedStarIcon } from "../../icon/FeaturedStarIcon";
import { ContentItem, ContentItemSummary, ContentItemTitle } from "../ContentItem";

// import { Link } from "./Link";

export type PostComponentProps = {
  // post: BlogIndexPost;
  title: string;
  summary: string;
  url: string;
  date: string;
  featured?: boolean;
  cover: { // or thumbnail
    url: string;
    alt: string;
    width: number;
    height: number;
  };
};

export const PostComponent: FC<PostComponentProps> = ({
  title,
  summary,
  url,
  date,
  featured,
  cover,
}) => (
  // <Link href={url}>
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
  //       <figcaption className="py-4">
  //         <div className="flex items-center justify-between">
  //           <p>{date}</p>
  //           {featured && (
  //             <div>
  //               <FeaturedStarIcon />
  //             </div>
  //           )}
  //         </div>
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
        <div className="flex items-center justify-between">
          <p>{date}</p>
          {featured && (
            <div>
              <FeaturedStarIcon />
            </div>
          )}
        </div>
        <ContentItemTitle text={title} />
        <ContentItemSummary text={summary} />
      </>
    )}
  />
);
