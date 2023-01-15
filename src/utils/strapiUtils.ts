import { STRAPI_BASE_URL } from "../constants";

export function fullUrl(path: string) {
  console.log("====================================");
  console.log(path);
  console.log("====================================");
  return STRAPI_BASE_URL + path;
};
