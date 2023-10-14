import { FileIcon, UploadIcon, X } from "lucide-react";
import { ComponentProps, useCallback, useState } from "react";
import { DropzoneState, useDropzone } from "react-dropzone";

interface IFileInputProps extends ComponentProps<"div"> {
  files: File[] | null;
  setFiles: (files: File[]) => void;
}

export const FileInput = ({
  files,
  setFiles,
  className,
  ...props
}: IFileInputProps) => {
  const removeFile = useCallback(
    (name: string) => {
      if (files && files.length) {
        const filteredFiles = files.filter((file) => {
          return file.name !== name;
        });
        setFiles(filteredFiles);
      }
    },
    [files],
  );

  const handleDrop = useCallback(
    (files: File[]) => {
      console.log(files);
      setFiles(files);
    },
    [files],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: {
      "application/pdf": [".pdf"],
      "image/png": [".png"],
      "image/jpeg": [".jpeg", ".jpg"],
      "image/svg+xml": [".svg"],
      "image/webp": [".webp"],
      "application/vnd.ms-excel": [".xls"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
      "application/vnd.ms-powerpoint": [".ppt"],
      "application/vnd.openxmlformats-officedocument.presentationml.presentation":
        [".pptx"],
      "text/plain": [".txt"],
      "text/csv": [".csv"],
    },
  });

  return (
    <>
      {files?.length ? (
        <div className="flex h-full w-full flex-col gap-2 rounded-lg border-4 border-dashed border-gray-600 bg-gray-300 p-4 dark:bg-neutral-700 dark:hover:bg-neutral-600">
          {files.map((file, index) => (
            <div
              className="flex w-full items-center justify-center gap-3 rounded-md bg-white shadow-md"
              key={index}
            >
              <FileIcon className="my-4 ml-4 h-5 w-5" />
              <span className="my-4 text-sm text-gray-500">{file?.name}</span>
              <button
                type="button"
                onClick={() => removeFile(file.name)}
                className="mt-1 place-self-start p-1"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`h-full w-full rounded-lg border-4 border-dashed bg-gray-200 transition-all hover:border-gray-500 hover:bg-gray-300 dark:bg-neutral-700 dark:hover:bg-neutral-600
        ${isDragActive ? "border-blue-500" : "border-gray-600"}`}
        >
          <label
            htmlFor="dropzone-file"
            className="h-full w-full cursor-pointer"
          >
            <div className="flex h-full w-full flex-col items-center justify-center pb-6 pt-5">
              <UploadIcon
                className={`mb-3 h-10 w-10 ${
                  isDragActive
                    ? "text-gray-800 dark:text-gray-50"
                    : "text-gray-900 dark:text-gray-100"
                }`}
              />
              {isDragActive ? (
                <p className="text-lg font-bold text-gray-800 dark:text-gray-50">
                  Drop to add...
                </p>
              ) : (
                <div className="flex flex-col items-center justify-center gap-1">
                  <p className="text-lg text-gray-900 dark:text-gray-100">
                    Drag files here or click to select files
                  </p>
                  <p className="text-center text-xs text-gray-900 dark:text-gray-100">
                    .pdf, .png, .jpeg, .jpg, .svg, .webp, .xls, .xlsx, .doc,
                    .docx, .ppt, .pptx, .txt, .csv
                  </p>
                </div>
              )}
            </div>
          </label>
          <input {...getInputProps()} className="hidden" />
        </div>
      )}
    </>
  );
};
