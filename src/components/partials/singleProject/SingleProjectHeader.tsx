import { useTranslation } from "next-i18next";
import { FC } from "react";

type Props = {
  title: string;
  summary: string;
  liveUrl: string | null;
  repoUrl: string | null;
};

export const SingleProjectHeader: FC<Props> = ({
  title,
  summary,
  liveUrl,
  repoUrl,
}) => {
  const { t } = useTranslation();

  return (
    <header
      className="mxw-sm w-full flex items-center flex-col justify-center
        space-y-6 text-left sm:text-center my-12"
    >
      <h2
        className="animate animate__animated animate__fadeInDown animate__fast
          text-4xl md:text-6xl font-bold capitalize"
      >
        {title}
      </h2>

      <p className="animate animate__animated animate__fadeIn animate__slow text-xl font-light">
        {summary}
      </p>

      <div className="flex items-center space-x-2">
        {liveUrl && (
          <a
            target="_blank"
            rel="noreferrer"
            href={liveUrl}
            className="first-letter:text-2xl text-sm md:text-md first-letter:font-bold p-1
              border-2 border-transparent hover:border-b-brand1-500 duration-200"
          >
            {t("projects:visitProject")}
          </a>
        )}

        {repoUrl && (
          <a
            target="_blank"
            rel="noreferrer"
            href={repoUrl}
            className="first-letter:text-2xl text-sm md:text-md first-letter:font-bold p-1
              border-2 border-transparent hover:border-b-brand1-500 duration-200"
          >
            Github
          </a>
        )}
      </div>
    </header>
  );
};
