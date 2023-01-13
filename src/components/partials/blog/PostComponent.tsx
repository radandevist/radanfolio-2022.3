import { FC } from "react";

import { FeaturedStarIcon } from "../../icon/FeaturedStarIcon";
import { ContentItem, ContentItemSummary, ContentItemTitle } from "../ContentItem";

export type PostComponentProps = {
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
        <ContentItemTitle text={title} />
        <ContentItemSummary text={summary} />
      </>
    )}
  />
);
