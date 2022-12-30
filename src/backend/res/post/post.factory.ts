import { Post } from "@prisma/client";
import { Faker } from "@faker-js/faker";

export const postFactory = (faker: Faker) => {
  const post = {} as Post;

  post.title = faker.lorem.sentence();
  post.content = faker.lorem.text();
  post.coverImage = faker.image.image();

  return post;
};
