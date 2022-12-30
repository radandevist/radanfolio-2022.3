import { prismaClient } from "../../src/backend/infra/prisma";

import { run } from "./main.seeder";

run(prismaClient)
  .then(() => {
    prismaClient.$disconnect();
  })
  .catch((error: any) => {
    console.log("====================================");
    console.log(error);
    console.log("====================================");

    prismaClient.$disconnect();
  });

