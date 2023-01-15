import { FC, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import { LOCAL_BLUR_PLACEHOLDER_IMAGE } from "../../constants";

export type LoadedContentItemProps = {
  url: string;
  body: ReactNode;
  image: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
};
export type ContentItemProps =
| LoadedContentItemProps & { loading?: false }
| Partial<LoadedContentItemProps> & { loading: true };

export const ContentItem: FC<ContentItemProps> = ({
  url,
  image,
  body,
  loading,
}) => (
  // <Link href={url} >
  <article
    className={`w-full min-h-64 cursor-pointer ${loading && "animate-pulse"}`}
  >
    <figure>
      {!loading
        ? (
          <div className="animate animate__animated animate__fadeIn h-full w-full">
            <Link href={url} >
              <Image
                className="w-full h-56 object-cover rounded-lg shadow-xl"
                src={image.url}
                alt={image.alt}
                width={image.width}
                height={image.height}
                placeholder="blur"
                blurDataURL={LOCAL_BLUR_PLACEHOLDER_IMAGE}
              />
            </Link>
          </div>
        )
        : (
          <div
            className="w-full h-56 object-cover rounded-lg shadow-xl dark:bg-gray-200 bg-gray-700"
          />
        )}
      <figcaption className="py-4 space-y-3">
        {body}
      </figcaption>
    </figure>
  </article>
  // </Link>
);


export type ContentItemTitleProps =
| {
  text: string;
  loading?: false;
}
| {
  text?: string;
  loading: true;
};

export const ContentItemTitle: FC<ContentItemTitleProps> = ({ text, loading }) => {
  if (!loading) {
    return (
      <h2 className="text-xl md:text-2xl font-bold capitalize line-clamp-3">{text}</h2>
    );
  } else {
    return (
      <div
        className={`h-3 dark:bg-gray-200 rounded-full bg-gray-700 w-[45%] mb-4
          ${loading && "animate-pulse"}`}
      />
    );
  }
};

export type ContentItemSummaryProps =
| {
  text: string;
  loading?: false;
}
| {
  text?: string;
  loading: true;
};

export const ContentItemSummary: FC<ContentItemSummaryProps> = ({ text, loading }) => {
  if (!loading) {
    return (
      <p className="text-md md:text-lg line-clamp-2">{text}</p>
    );
  } else {
    return (
      <>
        <div
          className={`h-2 dark:bg-gray-200 rounded-full bg-gray-700 mb-2.5 w-10/12
            ${loading && "animate-pulse"}`}
        />
        <div
          className={`h-2 dark:bg-gray-200 rounded-full bg-gray-700 mb-2.5 w-9/12
            ${loading && "animate-pulse"}`}
        />
      </>
    );
  }
};
