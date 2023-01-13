import { FC } from "react";

export type ContentGridProps<T> = {
  items: T[];
  title?: string;
  Component: FC<T>;
};

export function ContentGrid<T>({
  items,
  title,
  Component,
}: ContentGridProps<T>) {
  return (
    <div className="w-full my-12">
      {title && (
        <div className="mxw-sm w-full flex justify-start my-12">
          <h2 className="text-4xl">{title}</h2>
        </div>
      )}
      <section className="mxw-sm grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {items.map((item, index) => (
          <Component key={index} {...item} />
        ))}
      </section>
    </div>
  );
};
