import React, { FC } from "react";

export const InlineCode: FC = ({ children }) => (
  <code className="bg-brand2-500 text-white
  px-2 py-1 rounded-md
  text-lg md:text-xl">{children}</code>
);
