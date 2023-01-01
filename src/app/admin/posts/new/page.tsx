import React from "react";

import { PageHeader } from "../../../../components/admin/PageHeader";

import { PostEditor } from "./PostEditor";

type Props = {};

export default function CreatePostPage({}: Props) {
  return (
    <>
      <PageHeader title="New Post ✨" />

      <PostEditor />
    </>
  );
};
