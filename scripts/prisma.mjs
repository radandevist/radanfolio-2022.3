import { spawn } from "child_process";

import chalk from "chalk";

import { getEnvFile } from "./utils/dotenvUtils.mjs";
import { binPath } from "./utils/binUtils.mjs";

const env = process.env.NODE_ENV || "development";

const [,, ...cliArguments] = process.argv;

const envFile = getEnvFile(env).split("/").splice(-1)[0];

const binary = "dotenv";
const execCommand = binPath(binary);
const execOptions = ["-e", envFile, "--", "prisma", ...cliArguments];

// process.exit();
console.log(chalk.gray("$", binary, ...execOptions));
spawn(execCommand, execOptions, {
  stdio: "inherit",
  env: { ...process.env },
});
