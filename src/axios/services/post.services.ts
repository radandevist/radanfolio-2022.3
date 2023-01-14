import qs from "qs";

import { getPostsPageQuery } from "../../utils/qsUtils";
import { client } from "../client";

export async function getSinglePost<T>(slug: string) {
  const singlePostQuery = qs.stringify({
    filters: {
      slug: {
        $eq: slug,
      }
    },
    populate: ["author.profilePic", "cover", "tags", "seo.sharedImage.media"],
  });

  return await client.get<T>(`/posts?${singlePostQuery}`);
}

export async function getCommentsOnSinglePostPagePost() {
  // ! Important do not eraser 
  // const paginatedPostCommentsQuery = qs.stringify({
  //   filters: {
  //     post: {
  //       slug: {
  //         $eq: params?.slug,
  //       }
  //     }
  //   },
  //   pagination: {
  //     page: 1,
  //     pageSize: 2,
  //     withCount: true,
  //   },
  //   populate: ["user"],
  // });

  // ! Important do not erase
  // find comments by slug (slug is unique in our db model)
  // const idk = await client
  //   .get<StraPiResponse>(`/comments?${paginatedPostCommentsQuery}`)

  // console.log(post);
}

export async function getFeaturedPosts<T>() {
  const query = qs.stringify({
    sort: ["updatedAt:desc"],
    filters: {
      featured: {
        $eq: true,
      },
    },
    populate: ["cover"],
    pagination: {
      page: 1,
      pageSize: 2,
    },
  });

  return await client.get<T>(`/posts?${query}`);
};

export async function getInitialPosts<T>() {
  return await client.get<T>(`/posts?${getPostsPageQuery(1)}`);;
};
