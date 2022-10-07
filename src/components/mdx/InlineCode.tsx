import React, { FC, PropsWithChildren } from "react";

export const InlineCode: FC<PropsWithChildren> = ({ children }) => (
  <code className="bg-brand2-500 dark:bg-brand2-400 text-white
  px-2 py-1 rounded-md
  text-lg md:text-xl">
    {children}
  </code>
);
