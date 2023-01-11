import { getMDXComponent, MDXContentProps } from "mdx-bundler/client";
import { FC, useMemo } from "react";

type Props = MDXContentProps & {
  content: string; // The content from strapi
};

export const StrapiPostContent: FC<Props> = ({
  content,
  components,
}) => {
  const Component = useMemo(() => getMDXComponent(content), [content]);

  return (
    <article
      className="text-2xl md:text-3xl font-light
        first-letter:text-4xl first-letter:md:text-6xl first-letter:font-semibold
        space-y-10 prose"
      // dangerouslySetInnerHTML={{
      //   __html: content,
      // }}
    >
      {/* {post.content} */}
      {/* {content} */}
      <Component components={components} />
    </article>
  );
};
