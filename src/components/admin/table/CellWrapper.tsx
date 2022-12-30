import React, { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  className?: string;
}>;

export function CellWrapper({ children, className }: Props) {
  return (
    <div className={`flex items-center ${className || ""}`}>{children}</div>
  );
}

