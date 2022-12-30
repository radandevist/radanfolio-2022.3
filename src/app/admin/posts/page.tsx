import { prismaClient } from "../../../backend/infra/prisma";
import { AddIcon } from "../../../components/admin/icons/AddIcon";
import { PageHeader } from "../../../components/admin/PageHeader";

import { PostsTable } from "./PostsTable";

async function getPosts() {
  return prismaClient.post.findMany({ take: 5 });
};

export default async function PostsAdminPage() {
  // const { setPageTitle, setPageActions } = usePageHeader();
  const posts = await getPosts();

  return (
    <>
      <PageHeader
        title="Posts"
        actions={(
          <>
            {/* Add customer button */}
            <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
              <AddIcon className="opacity-50 shrink-0" />
              <span className="hidden bo-xs:block ml-2">Create new post</span>
            </button>
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
