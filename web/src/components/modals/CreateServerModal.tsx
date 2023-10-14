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
import { IconPlus, IconX } from "@tabler/icons-react";
import AutoForm from "../ui/auto-form";
import { z } from "zod";
import { useState } from "react";
import { FileInput } from "../FileInput";
import Image from "next/image";

const createServerSchema = z.object({
  name: z
    .string({ required_error: "Please enter a name" })
    .min(3, "Name must be at least 3 characters long")
    .describe("Server name"),
});

export const CreateServerModal = () => {
  const { isOpen, closeModal, openModal } = useModal("CreateServer");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);

  const handleRemovePreviewImage = () => {
    setImagePreview(null);
    setFiles([]);
  };

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
        <FileInput
          files={files}
          setFiles={setFiles}
          setImagePreview={setImagePreview}
        />
        {imagePreview && (
          <div className="relative mt-4 flex h-36 w-full items-center justify-center">
            <Button
              className="absolute right-1/2 top-0 z-10 h-8 w-8 translate-x-16 transform rounded-full bg-red-500 px-0 py-0 dark:bg-red-500"
              onClick={handleRemovePreviewImage}
            >
              <IconX className="h-6 w-6 dark:text-white" />
            </Button>
            <Image
              src={imagePreview}
              alt="Preview"
              width={150}
              height={150}
              className="rounded-full"
            />
          </div>
        )}
        <AutoForm
          formSchema={createServerSchema}
          onSubmit={(e) => {
            console.log(e);
          }}
          fieldConfig={{
            name: {
              inputProps: {
                placeholder: "Enter server name",
              },
              // description: "This is the name of your server",
            },
          }}
        >
          <Button type="submit" className="w-4/12">
            Create Server
          </Button>
        </AutoForm>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
