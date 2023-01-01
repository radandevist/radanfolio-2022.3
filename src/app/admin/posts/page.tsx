import Link from "next/link";

import { prismaClient } from "../../../backend/infra/prisma";
import { AddIcon } from "../../../components/admin/icons/AddIcon";
import { PageHeader } from "../../../components/admin/PageHeader";
import { PATH_NAMES } from "../../../constants/pathNames";

import { PostsTable } from "./PostsTable";

async function getPosts() {
  return prismaClient.post.findMany({ take: 5 });
};

export default async function PostsAdminPage() {
  const posts = await getPosts();

  return (
    <>
      {/* Header */}
      <PageHeader
        title="Posts ✨"
        actions={(
          <>
            {/* Add customer button */}
            <Link
              href={PATH_NAMES.admin.createPost}
              className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
              // onClick={handleCreatePost}
            >
              <AddIcon className="opacity-50 shrink-0" />
              <span className="hidden bo-xs:block ml-2">Create new post</span>
            </Link>
          </>
        )}
      />

      {/* Table */}
      <PostsTable posts={posts} />

      {/* Pagination */}
      {/* <div className="mt-8">
        <PaginationClassic />
      </div> */}
    </>
  );
}
