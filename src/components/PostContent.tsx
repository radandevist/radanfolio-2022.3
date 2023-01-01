import { getMDXComponent, MDXContentProps } from "mdx-bundler/client";
import { FC, useMemo } from "react";

type Props = MDXContentProps & {
  code: string;
};

export const PostContent: FC<Props> = ({ components, code }) => {
  const Component = useMemo(() => getMDXComponent(code), [code]);

  return (
    <article
      className="
        first-letter:text-4xl first-letter:md:text-6xl first-letter:font-semibold
          dark:!text-slate-100
        prose lg:prose-xl
        prose-p:text-2xl md:prose-p:text-3xl prose-p:font-light
          dark:prose-p:text-slate-200
        prose-code:font-light dark:prose-code:text-slate-400
        prose-pre:!bg-brand2-500 dark:prose-pre:!bg-brand2-400
          prose-pre:!text-xl md:prose-pre:!text-2xl prose-pre:!mt-0
        "
    >
      {/* {post.code} */}
      {/* {code} */}
      <Component components={components} />
    </article>
  );
};
