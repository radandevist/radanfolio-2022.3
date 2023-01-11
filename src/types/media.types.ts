import { StrapiEntity } from "./strapi.types";

export type StrapiMedia = StrapiEntity<MediaAttributes>;

export interface MediaAttributes {
  name:              string;
  alternativeText:   null | string;
  caption:           null | string;
  width:             number;
  height:            number;
  formats:           Formats;
  hash:              string;
  ext:               string;
  mime:              string;
  size:              number;
  url:               string;
  previewUrl:        null;
  provider:          string;
  provider_metadata: null;
  createdAt:         Date;
  updatedAt:         Date;
}

export interface Formats {
  large:     MediaFormat;
  small:     MediaFormat;
  medium:    MediaFormat;
  thumbnail: MediaFormat;
}

export interface MediaFormat {
  ext:    string;
  url:    string;
  hash:   string;
  mime:   string;
  name:   string;
  path:   null;
  size:   number;
  width:  number;
  height: number;
}
