export const PATH_NAMES = {
  admin: {
    home: "/admin",
    posts: "/admin/posts",
    projects: "/admin/projects",
    memes: "/admin/memes",
  },
  user: {
    home: "/",
    blog: "/blog",
    singlePost: (postSlug: string) => `/posts/${postSlug}`
  },
};
