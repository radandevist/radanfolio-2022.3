/* eslint-disable max-len */
import { Link } from "../components/Link";
import { FC } from "react";
import { BlogIndexPost } from "../types/post";
import Image from "next/image";
import { getCloudinaryThumbnail } from "../helpers/cloudinary";
import { useTranslation } from "next-i18next";

export type HeropProps = {
  post: BlogIndexPost;
};

export const Hero: FC<HeropProps> = ({ post }) => {
  const { t } = useTranslation();

  return (
    <div className="w-full full">
      <div className="mxw-sm w-full my-12 relative">
        <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold">{t("blog:theBlog")}</h2>
      </div>
      <div className="mxw-sm grid gap-6 grid-cols-1 md:grid-cols-6">
        <div className="animate animate__animated animate__fadeIn md:col-span-4">
          <Link href={`/posts/${post.slug}`} /* state={post} */>
            {/* <img className="h-full w-full object-cover rounded-lg shadow-lg" alt="cover_pic" src={post.cover}/> */}
            <Image
              className="h-full w-full object-cover rounded-lg shadow-lg"
              alt="cover_pic"
              height={1688}
              width={3000}
              src={post.cover}
              placeholder="blur"
              blurDataURL={getCloudinaryThumbnail(post.cover)}
            />
          </Link>
        </div>
        <div className="animate animate__animated animate__fadeIn md:col-span-2 h-full flex flex-col justify-center space-y-3">
          <p>{post.date}</p>
          <Link href={`/posts/${post.slug}`}/*  state={post} */>
            <h2 className="text-2xl md:text-4xl capitalize">{post.title}</h2>
          </Link>
          {post.excerpt && <p className="text-xl font-light">{post.excerpt.slice(0,100)}...</p>}
        </div>
      </div>
    </div>
  );
};
