/* eslint-disable max-len */
import { Link } from "../components/Link";
import { FC } from "react";
import { BlogIndexPost } from "../pages/blog";
import Image from "next/image";

export type HeropProps = {
  post: BlogIndexPost;
};

export const Hero: FC<HeropProps> = ({ post }) => (
  <div className="w-full full">
    <div className="mxw-sm w-full my-12 relative">
      <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold">The Blog.</h2>
      {/* <span className="text-slate-300 absolute -top-10 left-0 -z-10 text-9xl font-bold">Folio</span> */}
    </div>
    <div className="mxw-sm grid gap-6 grid-cols-1 md:grid-cols-6">
      <div className="animate animate__animated animate__fadeIn md:col-span-4">
        <Link href={`/blog/${post.slug}`} /* state={post} */>
          {/* <img className="h-full w-full object-cover rounded-lg shadow-lg" alt="cover_pic" src={post.cover}/> */}
          <Image
            className="h-full w-full object-cover rounded-lg shadow-lg"
            alt="cover_pic"
            height={1688}
            width={3000}
            src={post.cover}
          />
        </Link>
      </div>
      <div className="animate animate__animated animate__fadeIn md:col-span-2 h-full flex flex-col justify-center space-y-3">
        <p>{post.date}</p>
        <Link href={`/blog/${post.slug}`}/*  state={post} */>
          <h2 className="text-2xl md:text-4xl capitalize">{post.title}</h2>
        </Link>
        {post.excerpt && <p className="text-xl font-light">{post.excerpt.slice(0,100)}...</p>}
      </div>
    </div>
  </div>
);
