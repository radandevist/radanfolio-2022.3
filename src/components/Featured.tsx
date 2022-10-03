import React, { FC } from "react";
import { BlogIndexPost } from "../types/post";
import { PostComponent } from "./Post";

export type FeaturedProps = {
  posts: BlogIndexPost[];
};

export const Featured: FC<FeaturedProps> = ({ posts }) => {
  const featuredPosts = posts.filter(post => post.featured === true);
  // featuredPosts = getRandomElements(featuredPosts, 2);

  return (
    <div className="w-full">
      <div className="mxw-sm w-full flex justify-start my-24">
        <h2 className="text-4xl md:text-6xl">Featured</h2>
      </div>
      <section className="mxw-sm grid gap-6 grid-cols-1 sm:grid-cols-2">
        {featuredPosts && featuredPosts.map((post) => (
          <PostComponent key={post.id} post={post}/>
        ))}
      </section>
    </div>
  );
};
