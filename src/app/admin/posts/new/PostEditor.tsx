"use client";

import { useEffect, useState } from "react";

import { NextCKEditor } from "../../../../components/admin/NextCKEditor";

type Props = {};

export function PostEditor({}: Props) {
  const [editorLoaded, setEditorLoaded] = useState<boolean>(false);
  const [data, setData] = useState<string>("");

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  return (
    <>
      <NextCKEditor
        name="description"
        // value={data}
        onChange={(value: string) => {
          setData(value);
        }}
        editorLoaded={editorLoaded}
      />
      {JSON.stringify(data)}
    </>
  );
}
