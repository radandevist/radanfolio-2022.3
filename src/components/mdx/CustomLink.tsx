// import Link from "next/link";
import { FC } from "react";
import { Link } from "../Link";

export type CustomLinkProps = {
  href?: string;
};

export const CustomLink: FC<CustomLinkProps> = (props) => {
  const href = props.href;
  const isInternalLink = href && (href.startsWith("/") || href.startsWith("#"));
  
  if (isInternalLink) {
    return (
      <Link href={href}>
        {props.children}
      </Link>
    );
  }
  
  return <a target="_blank" rel="noopener noreferrer" {...props} />;
};
