import { StrapiEntity } from "./strapi.types";

export interface PostAttributes {
  title:       string;
  content:     string;
  summary:     string;
  createdAt:   Date;
  updatedAt:   Date;
  publishedAt: Date;
  slug:        string;
}

export type StrapiPost = StrapiEntity<PostAttributes>;
