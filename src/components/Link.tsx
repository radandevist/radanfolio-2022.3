/* eslint-disable max-len */
import NextLink, { LinkProps as InternalLinkProps } from "next/link";
import { FC, PropsWithChildren } from "react";

export const Link: FC<
Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>,keyof InternalLinkProps> & InternalLinkProps & {
  children?: React.ReactNode;
} & React.RefAttributes<HTMLAnchorElement>
> = ({ children, ...props }) => (
  <NextLink {...props}>
    <a>
      {children}
    </a>
  </NextLink>
);
