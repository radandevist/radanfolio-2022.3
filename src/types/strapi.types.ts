export type StraPiResponse<D = StrapiEntity | StrapiEntity[]> = {
  data: D;
  meta: StrapiMeta;
};

type StrapiMeta = {
  pagination?: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number; 
  };
};

export type StrapiEntity<A extends AnyObj = AnyObj> = {
  id:         number;
  attributes: A;
};

export type StrapiPopulate<
  E extends StrapiEntity,
  P extends Record<string, { data: StrapiEntity | StrapiEntity[] }>
> = E & {
  attributes: {
    [K in keyof P]: P[K] | null;
  };
};
