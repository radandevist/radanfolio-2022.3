import { StrapiEntity } from "./strapi.types";

export type UserAttributes = {
  username:  string;
  email:     string;
  provider:  string;
  confirmed: boolean;
  blocked:   boolean;
  createdAt: Date;
  updatedAt: Date;
  fullName:  string;
};

export type StrapiUser = StrapiEntity<UserAttributes>;
