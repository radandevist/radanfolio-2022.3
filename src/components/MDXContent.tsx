import { getMDXComponent, MDXContentProps } from "mdx-bundler/client";
import { FC, useMemo } from "react";

type Props = MDXContentProps & {
  code: string; // pre-bundled content with bundleMDX on server side 
};

export const MDXContent: FC<Props> = ({
  code,
  components,
}) => {
  const Component = useMemo(() => getMDXComponent(code), [code]);

  return (
    <article
      className="text-2xl md:text-3xl font-light
        first-letter:text-4xl first-letter:md:text-6xl first-letter:font-semibold
        space-y-10"
      // className="
      //   space-y-10
      //   first-letter:text-4xl first-letter:md:text-6xl first-letter:font-semibold
      //   text-2xl md:text-3xl
      //   font-light
      //   prose
      //   prose-p:text-2xl md:prose-p:text-3xl
      //   prose-code:after:sr-only prose-code:before:sr-only
          
      //   prose-pre:bg-red-500 prose-pre:p-0 prose-pre:m-0
      //   "
      // className="prose"
    >
      <Component components={components} />
    </article>
  );
};
