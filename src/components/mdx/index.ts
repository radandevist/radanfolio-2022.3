import { MDXComponents } from "mdx/types";

import { CodeBlock } from "./CodeBlock";
import { CustomLink } from "./CustomLink";
import { ImageBlog } from "./ImageBlog";
import { InlineCode } from "./InlineCode";
import { UnOrderedList, OrderedList } from "./List";

export const mdxComponents: MDXComponents = {
  a: CustomLink,
  pre: CodeBlock,
  ul: UnOrderedList,
  ol: OrderedList,
  code: InlineCode,
  img: ImageBlog,
};
