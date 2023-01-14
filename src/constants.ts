export const PATH_NAMES = {
  home: "/", // also the blog
  about: "/about",
  projects: "/projects",
  contact: "/contact",
  posts: "/posts",
  // blog: "/blog",
};

export const STRAPI_BASE_URL =
  process.env.NEXT_PUBLIC_STRAPI_BASE_URL || "http://localhost:1337";

export const READ_ONLY_TOKEN =
  process.env.NEXT_PUBLIC_STRAPI_READ_ONLY_API_TOKEN || "undefined-token";

export const LOCAL_BLUR_PLACEHOLDER_IMAGE = "/images/blur_image.jpg";

const defaultDomain = process.env.NODE_ENV === "production"
  ? "https://devist.xyz"
  : "http://localhost:3000";

export const NEXT_APP_DOMAIN_URL =
  process.env.NEXT_PUBLIC_NEXT_APP_DOMAIN_URL || defaultDomain;

export const DEFAULT_PAGE_SIZE_QUERY = 3;
