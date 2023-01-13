export type StraPiResponse<D = StrapiEntity | StrapiEntity[]> = {
  data: D;
  meta: StrapiMeta;
};

export type StrapiPagination = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number; 
};

export type StrapiMeta = {
  pagination?: StrapiPagination;
};

export type StrapiEntity<A extends AnyObj = AnyObj> = {
  id:         number;
  attributes: A;
};

export type StrapiPopulate<
  E extends StrapiEntity,
  P extends Record<string, { data: StrapiEntity | StrapiEntity[] | null }>
> = E & {
  attributes: {
    [K in keyof P]: P[K] | null;
  };
};
