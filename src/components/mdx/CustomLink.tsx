// import Link from "next/link";
import { FC, PropsWithChildren } from "react";

import { Link } from "../Link";

export type CustomLinkProps = PropsWithChildren<{
  href?: string;
}>;

export const CustomLink: FC<CustomLinkProps> = (props) => {
  const href = props.href;
  const isInternalLink = href && (href.startsWith("/") || href.startsWith("#"));
  
  if (isInternalLink) {
    return (
      <Link href={href}>
        <span className="text-brand1">
          {props.children}
        </span>
      </Link>
    );
  }
  
  return <a className="text-brand1" target="_blank" rel="noopener noreferrer" {...props} />;
};
