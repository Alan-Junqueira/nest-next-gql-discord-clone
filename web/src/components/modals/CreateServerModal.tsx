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

export const CreateServerModal = () => {
  const { isOpen, closeModal, openModal } = useModal("CreateServer");
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
          <DialogTitle className="text-gray-900 dark:text-gray-100 font-normal mb-4">
            Create a server
          </DialogTitle>
          <DialogDescription>
            Give your server personality with a name and an image. You can
            always change it later
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
