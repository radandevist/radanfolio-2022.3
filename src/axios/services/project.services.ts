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
