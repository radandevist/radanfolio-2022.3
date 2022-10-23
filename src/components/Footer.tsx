import React, { FC, PropsWithChildren } from "react";
import { Trans } from "next-i18next";

const HeartIcon = () => (
  <span className="mx-1">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5
          0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </svg>
  </span>
);

const Link1: FC<PropsWithChildren> = ({ children }) => (
  <a target="_blank" rel="noreferrer" href="https://www.hyggedev.com">{children}</a>
);
const Link2: FC<PropsWithChildren> = ({ children }) => (
  <a
    className="text-underline"
    target="_blank"
    rel="noreferrer"
    href="https://github.com/chansen17/react-blogfolio"
  >
    {children}
  </a>
);

export const Footer = () => (
  <div className="w-full">
    <div
      className="mxw-lg grid gap-6 grid-cols-1
        text-center border-t-slate-200 dark:border-t-brand2-400 border-t-2
        py-12"
    >
      <p><Trans i18nKey="builtFrom" components={{ 1: <Link1 />, 2: <Link2 /> }} /></p>

      <p>Customization and addition of new features done by Radan Devist ( Me )</p>

      <p className="flex justify-center items-center space-x-4">
        <Trans
          i18nKey="craftedWithLove"
          components={{ heartIcon: <HeartIcon /> }}
        />
      </p>

    </div>
  </div>
);
