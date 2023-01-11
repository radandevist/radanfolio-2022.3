import qs from "qs";

export {};

const postSlug = "why-vscode-doesnt-load-path-environments";

const singlePostQuery = qs.stringify({
  filters: {
    slug: {
      $eq: postSlug,
    }
  },
  populate: ["author", "cover"],
}, {
  encode: false,
});

const postCommentsQuery = qs.stringify({
  filters: {
    post: {
      slug: {
        $eq: postSlug,
      }
    }
  },
  pagination: {
    page: 1,
    pageSize: 2,
    withCount: true,
  },
  populate: ["user"],
}, {
  encode: false,
});

// console.log(singlePostQuery);
console.log(postCommentsQuery);
