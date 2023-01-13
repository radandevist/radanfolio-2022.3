import { StrapiEntity } from "./strapi.types";

export type TechStackAttributes = {
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export type StrapiTechStack = StrapiEntity<TechStackAttributes>;
