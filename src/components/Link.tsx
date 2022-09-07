/* eslint-disable max-len */
import NextLink, { LinkProps as InternalLinkProps } from "next/link";
import { FC } from "react";

export const Link: FC<
Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>,keyof InternalLinkProps> & InternalLinkProps & {
  children?: React.ReactNode;
} & React.RefAttributes<HTMLAnchorElement>
> = ({ children, className, ...props }) => (
  <NextLink {...props}>
    <a className={className}>{children}</a>
  </NextLink>
);
