import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { getPostsPageQuery } from "../../utils/qsUtils";
import { READ_ONLY_TOKEN, STRAPI_BASE_URL } from "../../constants";
import { StraPiResponse } from "../../types/strapi.types";
import type { IBlogPost } from "../../pages/index";

export const mainApi = createApi({
  reducerPath: "mainApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${STRAPI_BASE_URL}/api`,
    headers: {
      Authorization: `Bearer ${READ_ONLY_TOKEN}`
    },
  }),
  endpoints: (builder) => ({
    getPostsByPage: builder.query<StraPiResponse<IBlogPost[]>, { page: number }>({
      query: ({ page }) => `/posts?${getPostsPageQuery(page)}`,
    }),
  }),
});

export const { useGetPostsByPageQuery } = mainApi;
