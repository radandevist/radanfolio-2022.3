import { Post } from "@prisma/client";

export type IPost = Post & Record<string,any>;
