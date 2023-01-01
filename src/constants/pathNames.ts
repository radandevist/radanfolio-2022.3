export const PATH_NAMES = {
  admin: {
    home: "/admin",
    posts: "/admin/posts",
    createPost: "/admin/posts/new",
    projects: "/admin/projects",
    memes: "/admin/memes",
  },
  user: {
    home: "/",
    blog: "/blog",
    singlePost: (postSlug: string) => `/posts/${postSlug}`,
  },
};
