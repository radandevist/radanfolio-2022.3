import { FC } from "react";

export const List: FC = ({ children }) => (
  <ul
    className="ml-6 list-outside"
    style={{
      listStyleImage: "url('/dash-icon.svg')"
    }}
  >{children}</ul>
);
