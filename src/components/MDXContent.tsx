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
        space-y-10 prose"
    >
      <Component components={components} />
    </article>
  );
};
