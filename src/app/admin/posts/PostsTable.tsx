"use client";

import { Post } from "@prisma/client";
import { useMemo, useState } from "react";
import truncate from "lodash/truncate";

import { CellWrapper } from "../../../components/admin/table/CellWrapper";
import { getTableColumns } from "../../../components/admin/table/getTableColumns";
import { Table } from "../../../components/admin/table/Table";

type Props = {
  posts: Post[];
};

export function PostsTable({
  posts: iPosts,
}: Props) {
  const posts = useMemo(() => iPosts, [iPosts]);

  const [postsIds, _] = useState<string[]>(posts.map((post) => post.id));
  const [selectedPostsIds, setSelectedPostsIds] = useState<string[]>([]);

  const columns = useMemo(() => getTableColumns<Post>({
    items: postsIds,
    selectedItems: selectedPostsIds,
    onToggleSelectOne(id: string) {
      console.log(id);
      if (selectedPostsIds.includes(id)) {
        const newState = selectedPostsIds.filter((postId) => postId !==  id);
        setSelectedPostsIds(newState);
      } else {
        const newState = [...selectedPostsIds, id];
        setSelectedPostsIds(newState);
      }
    },
    onToggleSelectAll() {
      console.log("toggle all");
      if (selectedPostsIds.length >= postsIds.length) {
        setSelectedPostsIds([]);
      } else {
        setSelectedPostsIds(postsIds);
      }
    },
    handlePreview(id) {
      console.log(id);
    },
    handleDelete(id) {
      console.log(id);
    },
    handleEdit(id) {
      console.log(id);
    },
    columns: [
      {
        id: "post-thumbnail-column",
        accessor: "coverImage",
        Header: () => <div className="font-semibold text-left">Thumbnail</div>,
        Cell: ({ value: coverImage }) => (
          <div className="shrink-0">
            <img
              className="rounded-md"
              src={coverImage}
              width="60"
              height="45"
              alt={"post_thumbnail"}
            />
          </div>
        ),
      },
      {
        id: "post-title-column",
        accessor: "title",
        Header: () => <div className="font-semibold text-left">Title</div>,
        Cell: ({ value: title }) => (
          <CellWrapper>
            <div className="text-left font-medium text-slate-800">
              {truncate(title, { length: 30 })}
            </div>
          </CellWrapper>
        ),
      },
    ],
  }), [postsIds, selectedPostsIds]);

  return (
    <Table columns={columns} data={posts}/>
  );
}
