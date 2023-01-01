import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

import { PATH_NAMES } from "./../constants/pathNames";

export const goToCreatePost = (router: AppRouterInstance) =>
  router.push(PATH_NAMES.admin.createPost);
