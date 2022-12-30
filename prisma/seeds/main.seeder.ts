import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

import { postFactory } from "../../src/backend/res/post/post.factory";
import { userFactory } from "../../src/backend/res/user/user.factory";

export async function run(prismaClient: PrismaClient) {
  const madeUsers = Array.from({ length: 5 }).map(() => userFactory(faker));
  await prismaClient.user.createMany({ data: madeUsers });
  const users = await prismaClient.user.findMany();

  const userIds = users.map((user) => user.id);

  const madePosts = Array.from({ length: 17 }).map(() => {
    const post = postFactory(faker);
    post.userId = faker.helpers.arrayElement(userIds);

    return post;
  });
  await prismaClient.post.createMany({ data: madePosts });
  const posts = await prismaClient.post.findMany();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const postsIds = posts.map((post) => post.id);
}
