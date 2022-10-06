import fs from "fs";
import path from "path";
import { readdir } from "fs/promises";

export const getJSONFileData = (filePath: string) =>
  JSON.parse(fs.readFileSync(path.join(filePath)).toString());

export const getDirectories = async (source: string) =>
  (await readdir(source, { withFileTypes: true }))
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
