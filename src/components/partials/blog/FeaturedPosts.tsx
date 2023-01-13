import { useTranslation } from "next-i18next";
import { FC } from "react";

// import { BlogIndexPost } from "../../../types/post";

import { PostComponent, PostComponentProps } from "./Post";

export type FeaturedProps = {
  // posts: BlogIndexPost[];
  posts: PostComponentProps[];
};

export const Featured: FC<FeaturedProps> = ({
  posts,
}) => {
  // const featuredPosts = posts.filter(post => post.featured === true);
  const { t } = useTranslation("common:featured"); 

  return (
    <div className="w-full">
      <div className="mxw-sm w-full flex justify-start my-24">
        <h2 className="text-4xl md:text-6xl">{t("common:featured")}</h2>
      </div>
      <section className="mxw-sm grid gap-6 grid-cols-1 sm:grid-cols-2 pb-12">
        {posts.map((post, index) => (
          <PostComponent key={index} {...post} />
        ))}
      </section>
    </div>
  );
};
