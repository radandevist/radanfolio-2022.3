import qs from "qs";

import { client } from "../client";

export async function getInitialProjects<T>() {
  const query = qs.stringify({
    sort: ["publishedAt:desc"],
    populate: ["cover"],
    pagination: {
      page: 1,
      pageSize: 6,
    },
  });

  return await client.get<T>(`/projects?${query}`);
}

export async function getFeaturedProjects<T>() {
  const query = qs.stringify({
    sort: ["publishedAt:desc"],
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

  return await client.get<T>(`/projects?${query}`);
}

export async function getSingleProject<T>(slug: string) {
  const query = qs.stringify({
    filters: {
      slug: {
        $eq: slug,
      }
    },
    populate: ["cover", "tech_stacks", "seo.sharedImage.media"],
  });

  return await client.get<T>(`/projects?${query}`);
};


export async function getSitemapProjects<T>(page: number) {
  // we chose 25 items per page because it is the default strapi config
  // const query = getPostsPageQuery(page, 25);
  const query = qs.stringify({
    sort: ["updatedAt:desc"],
    pagination: {
      page,
      pageSize: 25,
    },
  });

  return await client.get<T>(`/projects?${query}`);
}

