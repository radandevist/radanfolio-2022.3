import { MDXComponents } from "mdx/types";

import { CustomLink } from "./CustomLink";
import { ImageBlog } from "./ImageBlog";
// import { InlineCode } from "./InlineCode";
import { CodeBlock } from "./CodeBlock";
// import { UnOrderedList, OrderedList } from "./List";

export const mdxComponents: MDXComponents = {
  a: CustomLink,
  // code: InlineCode,
  pre: CodeBlock,
  // ul: UnOrderedList,
  // ol: OrderedList,
  img: ImageBlog,
};
