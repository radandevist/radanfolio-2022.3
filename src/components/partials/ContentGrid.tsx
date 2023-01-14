import { FC, Fragment } from "react";

export type ContentGridProps<T> = {
  items: T[];
  title?: string;
  Component: FC<T>;
  loading?: boolean;
};

export function ContentGrid<T>({
  items,
  title,
  Component,
  loading,
}: ContentGridProps<T>) {
  const remainToFill = (3 - (items.length % 3)) + 3;

  // const IComponent = Component as typeof ContentItem;

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
        {loading && Array.from({ length: remainToFill }).map((_, index) => (
          <Fragment key={index}>
            <Component loading={loading} {...{} as T} />
          </Fragment>
        ))}
      </section>
    </div>
  );
};
