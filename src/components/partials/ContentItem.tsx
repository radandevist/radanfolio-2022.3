import { FC, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import { LOCAL_BLUR_PLACEHOLDER_IMAGE } from "../../constants";

export type ContentItemProps = {
  url: string;
  body: ReactNode;
  image: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
};

export const ContentItem: FC<ContentItemProps> = ({
  url,
  image,
  body,
}) => (
  // <div className="w-full">
  <Link href={url} /* state={project} */>
    <article className="w-full min-h-64 cursor-pointer">
      <figure>
        <div className="animate animate__animated animate__fadeIn h-full w-full">
          <Image
            className="w-full h-56 object-cover rounded-lg shadow-xl"
            src={image.url}
            alt={image.alt}
            width={image.width}
            height={image.height}
            placeholder="blur"
            blurDataURL={LOCAL_BLUR_PLACEHOLDER_IMAGE}
          />
        </div>
        <figcaption className="py-4 space-y-3">
          {/* <h2 className="text-xl md:text-2xl font-bold capitalize line-clamp-3">{title}</h2> */}
          {/* <p className="text-md md:text-lg line-clamp-2">{summary}</p> */}
          {body}
        </figcaption>
      </figure>
    </article>
  </Link>
  // </div>
);


export type ContentItemTitleProps = { text: string };

export const ContentItemTitle: FC<ContentItemTitleProps> = ({ text }) => (
  <h2 className="text-xl md:text-2xl font-bold capitalize line-clamp-3">{text}</h2>
);

export type ContentItemSummaryProps = { text: string };

export const ContentItemSummary: FC<ContentItemSummaryProps> = ({ text }) => (
  <p className="text-md md:text-lg line-clamp-2">{text}</p>
);
