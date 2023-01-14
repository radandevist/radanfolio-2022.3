import { MDXComponents } from "mdx/types";

import { CodeBlock } from "./CodeBlock";
import { CustomLink } from "./CustomLink";
import { ImageBlog } from "./ImageBlog";
import { InlineCode } from "./InlineCode";

export const mdxComponents: MDXComponents = {
  a: CustomLink,
  pre: CodeBlock,
  code: InlineCode,
  img: ImageBlog,
};
