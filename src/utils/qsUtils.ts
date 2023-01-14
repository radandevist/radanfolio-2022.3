import qs from "qs";

import { DEFAULT_PAGE_SIZE_QUERY } from "../constants";

export const getPostsPageQuery = (
  page: number,
  pageSize = DEFAULT_PAGE_SIZE_QUERY,
) => qs.stringify({
  sort: ["updatedAt:desc"],
  populate: ["cover"],
  pagination: {
    page,
    pageSize,
  },
});
