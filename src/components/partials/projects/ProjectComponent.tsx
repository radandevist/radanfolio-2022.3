import Link from "next/link";
import { FC } from "react";

import { ContentItem, ContentItemSummary, ContentItemTitle } from "../ContentItem";

export type LoadedProjectComponentProps = {
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

export type ProjectComponentProps =
| LoadedProjectComponentProps & { loading?: false }
| Partial<LoadedProjectComponentProps> & { loading: true }; 

export const ProjectComponent: FC<ProjectComponentProps> = ({
  title,
  summary,
  url,
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
