import { StrapiEntity } from "./strapi.types";

type TagAttributes = {
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export type StrapiTag = StrapiEntity<TagAttributes>;
