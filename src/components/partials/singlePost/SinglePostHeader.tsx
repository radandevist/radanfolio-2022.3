import Image from "next/image";
import { FC, Fragment } from "react";

type Props = {
  tags: string[];
  title: string;
  summary: string;
  publishDate: string;
  author: {
    profilePic: {
      url: string;
      width: number;
      height: number;
      alt: string;
    };
    fullName: string;
  };
};

export const SinglePostHeader: FC<Props> = ({
  tags,
  title,
  summary,
  publishDate,
  author,
}) => {
  return (
    <header
      className="mxw-sm w-full flex items-center flex-col
        justify-center space-y-6 text-center my-12"
    >
      <div>
        {tags.map((tag, index, data) => {
          return (
            <Fragment key={index}>
              <p
                className="animate animate__animated animate__fadeInDown animate__fast
                  font-semibold capitalize inline-block"
              >
                {tag}
              </p>
              {index + 1 < data.length && ", "}
            </Fragment>
          );
        })}
      </div>

      <h2
        className="animate animate__animated animate__fadeInDown animate__fast
          text-4xl md:text-6xl font-bold capitalize"
      >
        {title}
      </h2>

      <p className="animate animate__animated animate__fadeIn animate__slow text-xl font-light">
        {summary}
      </p>

      <div
        className="animate animate__animated animate__fadeIn animate__slow
          flex items-center space-x-3"
      >
        <Image
          className="h-16 w-16 rounded-full object-cover shadow-lg"
          alt={author.profilePic.alt}
          src={author.profilePic.url}
          width={author.profilePic.width}
          height={author.profilePic.height}
        />
        <div className="text-left">
          <p>{author.fullName}</p>
          <p className="italic">{publishDate}</p>
        </div>
      </div>
    </header>
  );
};
