import { useTranslation } from "next-i18next";
import React, { FC } from "react";

import { BlogIndexPost } from "../types/post";

import { PostComponent } from "./Post";

export type FeedProps = {
  posts: BlogIndexPost[];
};

export const Feed: FC<FeedProps> = ({ posts }) => {
  const { t } = useTranslation();

  return (
    <div className="w-full my-12">
      <div className="mxw-sm w-full flex justify-start my-12">
        <h2 className="text-4xl">{t("common:posts")}</h2>
      </div>
      <section className="mxw-sm grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {posts && posts.map((post) => (
          <PostComponent key={post.id} post={post}/>
        ))}
      </section>
    </div>
  );
};
