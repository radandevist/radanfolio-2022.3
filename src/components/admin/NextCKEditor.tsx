import { useEffect, useRef } from "react";

type Props = {
  onChange: (data: any) => void;
  editorLoaded: boolean;
  name: string;
  value?: string;
};

export function NextCKEditor({ onChange, editorLoaded, name, value }: Props) {
  const editorRef = useRef<{
    CKEditor: any;
    ClassicEditor: any;
  }>();
  const { CKEditor, ClassicEditor } = editorRef.current || {};

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, 
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
  }, []);

  return (
    <>
      {editorLoaded ? (
        <CKEditor
          type=""
          name={name}
          editor={ClassicEditor}
          data={value}
          onChange={(_event: any, editor: any) => {
            const data = editor.getData();
            onChange(data);
          }}
        />
      ) : (
        <div>Editor loading</div>
      )}
    </>
  );
}
