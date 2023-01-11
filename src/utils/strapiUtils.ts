import { STRAPI_BASE_URL } from "../constants";

export function fullUrl(path: string) {
  return STRAPI_BASE_URL + path;
};
