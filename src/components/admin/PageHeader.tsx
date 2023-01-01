import { ReactNode } from "react";

type Props = {
  title: string;
  actions?: ReactNode;
};

export function PageHeader({ title, actions }: Props) {
  return (
    <div className="sm:flex sm:justify-between sm:items-center mb-8">

      {/* Left: Title */}
      <div className="mb-4 sm:mb-0">
        <h1 className="text-bo-2xl md:text-bo-3xl text-slate-800 font-bold">{title}</h1>
      </div>

      {/* Right: Actions */}
      <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
        {actions}
      </div>

    </div>
  );
}
