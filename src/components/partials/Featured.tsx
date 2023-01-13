import { FC } from "react";

export type FeaturedProps<T> = {
  items: T[];
  title?: string;
  Component: FC<T>;
};

export function Featured<T>({
  items,
  title,
  Component,
}: FeaturedProps<T>) {
  return (
    <div className="w-full">
      {title && (
        <div className="mxw-sm w-full flex justify-start my-24 mb-12">
          <h2 className="text-4xl md:text-6xl">{title}</h2>
        </div>
      )}
      <section className="mxw-sm grid gap-6 grid-cols-1 sm:grid-cols-2 pb-12">
        {items.map((item, index) => (
          <Component key={index} {...item} />
        ))}
      </section>
    </div>
  );
};
