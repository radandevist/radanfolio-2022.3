import { StrapiEntity } from "./strapi.types";

export type ProjectAttributes = {
  title:       string;
  summary:     string;
  content:     string;
  slug:        string;
  createdAt:   Date;
  updatedAt:   Date;
  publishedAt: Date;
  repoUrl:     string | null;
  liveUrl: string | null;
  featured: boolean;
};

export type StrapiProject = StrapiEntity<ProjectAttributes>;
