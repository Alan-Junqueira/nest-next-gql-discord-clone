"use client";

import { useModal } from "@/hooks/useModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { useMutation } from "@apollo/client";
import { CREATE_SERVER } from "@/graphql/mutations/server/CreateServer";
import {
  CreateServerMutation,
  CreateServerMutationVariables,
} from "@/graphql/types/graphql";
import { useProfileStore } from "@/store/profileStore";

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
  const [autoFormParsedValues, setAutoFormParsedValues] = useState<any>();
  const [autoFormValues, setAutoFormValues] = useState<any>();

  const [profileId] = useProfileStore((store) => [store.state.profile?.id]);

  const [createServer, { loading, error }] = useMutation<
    CreateServerMutation,
    CreateServerMutationVariables
  >(CREATE_SERVER);

  const handleCreateServer = async () => {
    if (
      JSON.stringify(autoFormParsedValues) !== JSON.stringify(autoFormValues) ||
      !files.length ||
      !profileId
    )
      return;

    createServer({
      variables: {
        input: {
          name: autoFormParsedValues.name,
          profileId,
        },
        file: files[0],
      },
      onCompleted: (_data) => {
        setImagePreview(null);
        setFiles([]);
        closeModal();
      },
      refetchQueries: ["GetServers"],
    });
  };

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
            <div className="relative h-36 w-36 overflow-hidden rounded-full">
              <Image
                src={imagePreview}
                alt="Preview"
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}
        <AutoForm
          formSchema={createServerSchema}
          onValuesChange={(values) => {
            setAutoFormValues(values);
          }}
          onParsedValuesChange={(values) => {
            setAutoFormParsedValues(values);
          }}
          onSubmit={handleCreateServer}
          fieldConfig={{
            name: {
              inputProps: {
                placeholder: "Enter server name",
              },
              // description: "This is the name of your server",
            },
          }}
        >
          {error && (
            <p className="mt-2 text-sm text-red-500">{error?.message}</p>
          )}
          <Button
            type="submit"
            className="w-6/12 bg-gradient-to-r from-sky-700 to-sky-500 text-white disabled:cursor-not-allowed dark:text-white "
            disabled={
              JSON.stringify(autoFormParsedValues) !==
                JSON.stringify(autoFormValues) ||
              !files.length ||
              loading
            }
          >
            Create Server
          </Button>
        </AutoForm>
      </DialogContent>
    </Dialog>
  );
};
