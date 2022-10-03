import fs from "fs";
import path from "path";

export const getJSONFileData = (filePath: string) =>
  JSON.parse(fs.readFileSync(path.join(filePath)).toString());
