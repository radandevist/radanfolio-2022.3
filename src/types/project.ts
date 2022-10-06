import { z } from "zod";

export const ZProjectIndex = z.object({
  id: z.string(),
  name: z.string(),
  cover: z.string(),
  // liveUrl: z.string().nullable(),
  summary: z.string(),
  // repoUrl: z.string(),
  stack: z
    .object({ id: z.string(), name: z.string() })
    .array(),
  slug: z.string(),
  featured: z.boolean(),
});

export type ProjectIndex = z.infer<typeof ZProjectIndex>;
