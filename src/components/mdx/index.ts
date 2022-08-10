import { MDXComponents } from "mdx/types";
import { CodeBlock } from "./CodeBlock";
import { CustomLink } from "./CustomLink";
import { InlineCode } from "./InlineCode";
import { List } from "./List";

export const mdxComponents: MDXComponents = {
  a: CustomLink,
  pre: CodeBlock,
  ul: List,
  code: InlineCode
};
