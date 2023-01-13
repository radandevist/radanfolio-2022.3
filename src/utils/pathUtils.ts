import { PATH_NAMES } from "../constants";

export function getPostUrl(slug: string) {
  return `${PATH_NAMES.posts}/${slug}`;
}

export function getProjectUrl(slug: string) {
  return `${PATH_NAMES.projects}/${slug}`;
}
