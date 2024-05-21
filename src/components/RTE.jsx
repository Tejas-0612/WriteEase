import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

const API_KEY = import.meta.env.VITE_TINYMYCE_API_KEY;

export default function RTE({ name, control, label, defaultValue = " " }) {
  return (
    <>
      {label && (
        <label className="inline-block mb-1 pl-1 font-semibold">{label}</label>
      )}
      <div className="w-full border-2 border-gray-300 rounded-md">
        <Controller
          name={name || "content"}
          control={control}
          render={({ field: { onChange } }) => (
            <Editor
              apiKey={API_KEY}
              initialValue={defaultValue}
              init={{
                initialValue: defaultValue,
                height: 500,
                menubar: true,
                plugins: [
                  "image",
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                  "anchor",
                ],
                toolbar:
                  "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
              onEditorChange={onChange}
            />
          )}
        />
      </div>
    </>
  );
}
