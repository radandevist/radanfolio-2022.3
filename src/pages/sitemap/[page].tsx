import { getServerSideSitemap, ISitemapField } from "next-sitemap";
import { GetServerSideProps } from "next";

import { StraPiResponse } from "../../types/strapi.types";
import { StrapiPost } from "../../types/post.types";
import { getSitemapPosts } from "../../axios/services/post.services";
import { NEXT_APP_DOMAIN_URL } from "../../constants";
import { getPostUrl, getProjectUrl } from "../../utils/pathUtils";
import { StrapiProject } from "../../types/project.types";
import { getSitemapProjects } from "../../axios/services/project.services";

export const getServerSideProps: GetServerSideProps<{}, { page: string }> = async (ctx) => {
  // Method to source urls from cms
  // const urls = await fetch('https//example.com/api')
  const page = Number(ctx.params?.page);

  const [
    postsFields,
    projectFields,
  ] = await Promise.all([
    (async () => {
      const result = await getSitemapPosts<StraPiResponse<StrapiPost[]>>(page);

      return result.data.map<ISitemapField>((post) => {
        return {
          loc: `${NEXT_APP_DOMAIN_URL}${getPostUrl(post.attributes.slug)}`,
          lastmod: new Date(post.attributes.updatedAt).toISOString(),
        };
      });
    })(),
    (async () => {
      const result = await getSitemapProjects<StraPiResponse<StrapiProject[]>>(page);

      return result.data.map<ISitemapField>((project) => {
        return {
          loc: `${NEXT_APP_DOMAIN_URL}${getProjectUrl(project.attributes.slug)}`,
          lastmod: new Date(project.attributes.updatedAt).toISOString(),
        };
      });
    })(),
  ]);

  return getServerSideSitemap(ctx, [...postsFields, ...projectFields]);
};

// Default export to prevent next.js errors
export default function Sitemap() {}
