// import { getMDXComponent, MDXContentProps } from "mdx-bundler/client";
// import { FC, useMemo } from "react";

// type Props = MDXContentProps & {
//   code: string;
// };

// export const PostContent: FC<Props> = ({ components, code }) => {
//   const Component = useMemo(() => getMDXComponent(code), [code]);

//   return (
//     <article
//       className="text-2xl md:text-3xl font-light
//         first-letter:text-4xl first-letter:md:text-6xl first-letter:font-semibold
//         space-y-10 prose"
//     >
//       {/* {post.code} */}
//       {/* {code} */}
//       <Component components={components} />
//     </article>
//   );
// };
