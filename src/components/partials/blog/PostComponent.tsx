import Link from "next/link";
import { FC } from "react";

import { FeaturedStarIcon } from "../../icon/FeaturedStarIcon";
import { ContentItem, ContentItemSummary, ContentItemTitle } from "../ContentItem";

export type LoadedPostComponentProps = {
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

export type PostComponentProps =
| LoadedPostComponentProps & { loading?: false }
| Partial<LoadedPostComponentProps> & { loading: true };

export const PostComponent: FC<PostComponentProps> = ({
  title,
  summary,
  url,
  date,
  featured,
  cover,
  loading,
}) => {
  if (!loading) {
    return (
      <ContentItem
        url={url}
        image={cover}
        body={(
          <>
            <div className="flex items-center justify-between">
              <p>{date}</p>
              {featured
                ? (
                  <div>
                    <FeaturedStarIcon />
                  </div>
                )
                : (<div />)}
            </div>
            <Link href={url}>
              <ContentItemTitle text={title} />
            </Link>
            <ContentItemSummary text={summary} />
          </>
        )}
      />
    );
  } else {
    return (
      <ContentItem
        loading
        body={(
          <>
            <ContentItemTitle loading />
            <ContentItemSummary loading />
          </>
        )}
      />
    );
  }
};
