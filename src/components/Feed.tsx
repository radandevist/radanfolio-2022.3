import React, { FC } from "react";
import { Post } from "../data/posts";
import { PostComponent } from "./Post";

export type FeedProps = {
  posts: Post[];
};

export const Feed: FC<FeedProps> = ({ posts }) => (
  <div className="w-full my-12">
    <div className="mxw-sm w-full flex justify-start my-12">
      <h2 className="text-4xl">Posts</h2>
    </div>
    <section className="mxw-sm grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {posts && posts.map((post) => (
        <PostComponent key={post?.id} post={post}/>
      ))}
    </section>
  </div>
);
