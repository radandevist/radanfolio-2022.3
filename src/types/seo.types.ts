import { StrapiMedia } from "./media.types";

export type StrapiSeoComponent = {
  id: number;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  preventIndexing: boolean;
};

export type StrapiShareImageComponent = {
  id: number;
  alt: string;
};

export type StrapiSeoWithImage = StrapiSeoComponent & {
  sharedImage: StrapiShareImageComponent;
};

export type StrapiFullSeo = StrapiSeoWithImage & {
  sharedImage: {
    media: {
      data: StrapiMedia;
    };
  };
};
