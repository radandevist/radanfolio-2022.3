"use client";

import { Post } from "@prisma/client";
import { Column } from "react-table";
import truncate from "lodash/truncate";

import { CellWrapper } from "../../../components/admin/table/CellWrapper";
import { Table } from "../../../components/admin/table/Table";

type Props = {
  posts: Post[];
};

export function PostsTable({
  posts,
}: Props) {
  function handleSelectAll() {
    console.log("all");
  }

  const handleSelect = (id: string) => {
    console.log(id);
  };

  function handlePreview(id: string) {
    console.log(id);
  }

  function handleDelete(id: string ) {
    console.log(id);
  }

  function handleEdit(id: string) {
    console.log(id);
  }

  const columns: Column<Post>[] = [
    {
      id: "post-thumbnail-column",
      accessor: "coverImage",
      // accessor: (row) => row.coverImage,
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
  ];

  return (
    <Table
      data={posts}
      columns={columns}
      // selectedItems={selectedPostsIds}
      onSelectAll={handleSelectAll}
      onSelect={handleSelect}
      onPreview={handlePreview}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
}
