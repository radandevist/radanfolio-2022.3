import { FC } from "react";

export const UnOrderedList: FC = ({ children }) => (
  <ul
    className="ml-6 list-outside list-disc"
    // style={{
    //   listStyleImage: "url('/dash-icon.svg')"
    // }}
  >{children}</ul>
);

export const OrderedList: FC = ({ children }) => (
  <ol
    className="ml-6 list-outside list-decimal"
  >{children}</ol>
);
