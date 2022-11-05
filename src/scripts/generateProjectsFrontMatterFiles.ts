import fs from "fs";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import {
  GENERATED_FOLDER_PATH,
  PROJECTS_FRONT_MATTERS_FOLDER_NAME,
  PROJECTS_FOLDER
} from "../constants";
import { getAllFilesFrontMatterV3 } from "../utils/mdxUtils.generate";
import nextI18nConfig from "../../next-i18next.config.js";
import { formatProjectFrontMatter } from "../functions/projects.functions";
import { ProjectIndex, ZProjectIndex } from "../types/project";

const generateProjectsFrontMatterFiles = async (): Promise<void> => {
  const frontMattersFolderPath = path.join(
    process.cwd(),
    GENERATED_FOLDER_PATH,
    PROJECTS_FRONT_MATTERS_FOLDER_NAME
  );

  if (!fs.existsSync(frontMattersFolderPath)) {
    await mkdir(frontMattersFolderPath, { recursive: true });
  }

  Promise.all(nextI18nConfig.i18n.locales.map(async (locale) => {
    const projects: ProjectIndex[] = (await getAllFilesFrontMatterV3(PROJECTS_FOLDER, locale))
      .filter(Boolean)
      .map(frontMatter => ZProjectIndex.parse(formatProjectFrontMatter(frontMatter!)));

    await writeFile(
      path.join(frontMattersFolderPath, `${locale}.json`),
      JSON.stringify({ projects }, null, 2),
    );
  }));
};

generateProjectsFrontMatterFiles();
