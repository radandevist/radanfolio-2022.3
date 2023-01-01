import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const mainApi = createApi({
  reducerPath: "mainApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:3300/api" }),
  endpoints: (_builder) => ({
    // getFeedPostsByPage: builder.query<IPost[], string>({
    //   query: (pageNum: string) => `/posts?page=${pageNum}`,
    // }),
  }),
});

export const {
  // useGetFeedPostsByPageQuery,
} = mainApi;
