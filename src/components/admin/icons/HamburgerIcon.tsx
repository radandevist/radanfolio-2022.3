import React from "react";

type Props = {
  className?: string;
};

function HamburgerIcon({ className }: Props) {
  return (
    <svg
      className={`w-6 h-6 fill-current ${className}`}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="4" y="5" width="16" height="2" />
      <rect x="4" y="11" width="16" height="2" />
      <rect x="4" y="17" width="16" height="2" />
    </svg>
  );
}

export default HamburgerIcon;
