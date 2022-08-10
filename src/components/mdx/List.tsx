import { FC } from "react";

export const List: FC = ({ children }) => (
  <ul className="ml-6 [list-style-image:url('dash-icon.svg')] list-outside">{children}</ul>
);
