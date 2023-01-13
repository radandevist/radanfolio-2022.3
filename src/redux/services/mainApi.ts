import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { getPostsPageQuery } from "../../query/post.query";
import { StrapiPost } from "../../types/post.types";
import { STRAPI_BASE_URL } from "../../constants";

export const mainApi = createApi({
  reducerPath: "mainApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${STRAPI_BASE_URL}/api` }),
  endpoints: (builder) => ({
    getPostsByPage: builder.query<StrapiPost[], { page: number }>({
      query: ({ page }) => `/posts?${getPostsPageQuery(page)}`,
    }),
  }),
});

export const { useGetPostsByPageQuery } = mainApi;
