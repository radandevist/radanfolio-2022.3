import { v4 } from "uuid";

import { ProjectIndex } from "../types/project";
import { Project } from "../pages/projects/[slug]";

export const formatProjectFrontMatter = (frontMatter: Record<string, any>): ProjectIndex => {
  const { id, cover, name, summary, stack: strStack, featured, slug } =
    frontMatter as Omit<ProjectIndex, "stack"> & {
      stack: string[];
    };

  const stack = strStack.map(element => ({ id: v4(), name: element }));

  return { id, cover, name, summary, stack , featured, slug };
};

export const formatProjectFileResult = (projectFile: Record<string, any>): Project => {
  const {
    code,
    frontMatter: {
      // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
      readingTime, slug, wordCount,
      category, cover, name, stack: strStack, summary, liveUrl, repoUrl
    }
  } = projectFile as {
    code: string;
    frontMatter: {
      readingTime: number; wordCount: number; slug: string;
      category: string;
      name: string;
      summary: string;
      cover: string;
      stack: string[];
      repoUrl: string;
      liveUrl?: string;
    };
  };

  const stack = strStack.map(element => ({ id: v4(), name: element }));

  return {
    code, category, name, cover, repoUrl, stack, summary,
    liveUrl: liveUrl ?? null,
  };
};
