export const POSTS_FOLDER = "posts";

export const PROJECTS_FOLDER = "projects";

export const GENERATED_FOLDER_PATH = "generated";

export const POSTS_FRONT_MATTERS_FILENAME = "posts-front-matters.json";

export const POSTS_FRONT_MATTERS_FOLDER_NAME = "posts-front-matters";

export const PROJECTS_FRONT_MATTERS_FOLDER_NAME = "projects-front-matters";

export const PATH_NAMES = {
  home: "/", // also the blog
  about: "/about",
  projects: "/projects",
  contact: "/contact",
  posts: "/posts",
  // blog: "/blog",
};

export const STRAPI_BASE_URL = process.env.STRAPI_BASE_URL
  || "http://localhost:1337";

// // dynamise this image
// export const STRAPI_BLUR_PLACEHOLDER_IMAGE =
//   `${STRAPI_BASE_URL}/uploads/blur_image_cbc7fb05ec.jpg?updated_at=2023-01-11T05:04:35.635Z`;

export const LOCAL_BLUR_PLACEHOLDER_IMAGE = "/images/blur_image.jpg";
