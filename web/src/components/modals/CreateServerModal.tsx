"use client";

import { useModal } from "@/hooks/useModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { IconPlus } from "@tabler/icons-react";
import AutoForm from "../ui/auto-form";
import { z } from "zod";
import { useState } from "react";
import { FileInput } from "../FileInput";

const createServerSchema = z.object({
  name: z.string({ required_error: "Please enter a name" }),
});

export const CreateServerModal = () => {
  const { isOpen, closeModal, openModal } = useModal("CreateServer");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);

  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild>
        <Button
          asChild
          className="text-gay-700 h-12 w-12 rounded-full bg-transparent p-2.5 hover:bg-neutral-400 dark:bg-transparent dark:text-neutral-400 dark:hover:bg-neutral-700"
          onClick={openModal}
        >
          <IconPlus className="h-10 w-10 rounded-full" />
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        onEscapeKeyDown={closeModal}
        onInteractOutside={closeModal}
        onClickAtCloseButton={closeModal}
      >
        <DialogHeader>
          <DialogTitle className="mb-4 font-normal text-gray-900 dark:text-gray-100">
            Create a server
          </DialogTitle>
          <DialogDescription>
            Give your server personality with a name and an image. You can
            always change it later
          </DialogDescription>
        </DialogHeader>
        {/* <div className="flex w-full items-center justify-center">
          <label
            htmlFor="dropzone-file"
            className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pb-6 pt-5">
              <svg
                className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input id="dropzone-file" type="file" className="hidden" />
          </label>
        </div> */}
        <FileInput files={files} setFiles={setFiles} />
        <AutoForm
          formSchema={createServerSchema}
          onSubmit={() => {}}
          fieldConfig={{
            name: {
              inputProps: {
                required: true,
                placeholder: "Enter a name",
              },
              renderParent: (props) => (
                <Label className="mb-2 text-red-500" {...props} />
              ),
              description: "This is the name of your server",
            },
          }}
        ></AutoForm>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
