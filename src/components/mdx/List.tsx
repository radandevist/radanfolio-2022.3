import { FC, PropsWithChildren } from "react";

export const UnOrderedList: FC<PropsWithChildren> = ({ children }) => (
  <ul className="ml-6 list-outside list-disc radan-list">{children}</ul>
);

export const OrderedList: FC<PropsWithChildren> = ({ children }) => (
  <ol className="ml-6 list-outside list-decimal radan-list">{children}</ol>
);
