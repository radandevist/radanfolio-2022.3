import { FC } from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import Link from "next/link";

// import { Link } from "../components/Link";
// import { BlogIndexPost } from "../../../types/post";
// import { getCloudinaryThumbnail } from "../../../helpers/cloudinary";
import { LOCAL_BLUR_PLACEHOLDER_IMAGE } from "../../../constants";

export type HeroProps = {
  // post: BlogIndexPost;
  title: string;
  summary: string;
  url: string;
  date: string;
  cover: { // or thumbnail
    url: string;
    width: number;
    height: number;
    alt: string;
  };
};

export const Hero: FC<HeroProps> = ({
  title,
  summary,
  url,
  date,
  cover,
}) => {
  const { t } = useTranslation();

  return (
    <div className="w-full full">
      <div className="mxw-sm w-full my-12 relative">
        <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold">{t("blog:theBlog")}</h2>
      </div>
      <div className="mxw-sm grid gap-6 grid-cols-1 md:grid-cols-6">
        <div className="animate animate__animated animate__fadeIn md:col-span-4">
          <Link href={url}>
            <Image
              className="h-full w-full object-cover rounded-lg shadow-lg"
              alt={cover.alt}
              width={cover.width}
              height={cover.height}
              src={cover.url}
              placeholder="blur"
              blurDataURL={LOCAL_BLUR_PLACEHOLDER_IMAGE}
            />
          </Link>
        </div>
        <div
          className="animate animate__animated animate__fadeIn
            md:col-span-2 h-full flex flex-col justify-center space-y-3"
        >
          <p>{date}</p>
          <Link href={url}>
            <h2 className="text-2xl md:text-4xl capitalize line-clamp-6">{title}</h2>
          </Link>
          <p className="text-xl font-light line-clamp-5">{summary}</p>
        </div>
      </div>
    </div>
  );
};
