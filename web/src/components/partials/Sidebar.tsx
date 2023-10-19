"use client";
import React, { ComponentProps, useEffect } from "react";
import { Button } from "../ui/button";
import {
  IconArrowsJoin,
  IconMoon,
  IconPlus,
  IconSun,
} from "@tabler/icons-react";
import { useDarkModeStore } from "@/store/darkModeStore";
import { CreateServerModal } from "../modals/CreateServerModal";
import { useProfileStore } from "@/store/profileStore";
import { useMutation } from "@apollo/client";
import {
  CreateProfileMutation,
  CreateProfileMutationVariables,
} from "@/graphql/types/graphql";
import { CREATE_PROFILE } from "@/graphql/mutations/CreateProfile";
import { Session } from "next-auth";
import { cn } from "@/lib/utils";

interface ISidebarProps extends ComponentProps<"nav"> {
  session: Session | null;
}

export const Sidebar = ({ session, className, ...props }: ISidebarProps) => {
  const [darkMode, toggleDarkMode] = useDarkModeStore((store) => [
    store.state.darkMode,
    store.actions.toggleDarkMode,
  ]);

  const [profile, setProfile] = useProfileStore((state) => [
    state.state.profile,
    state.actions.setProfile,
  ]);

  const [createProfile] = useMutation<
    CreateProfileMutation,
    CreateProfileMutationVariables
  >(CREATE_PROFILE, {});

  useEffect(() => {
    const createProfileFn = async () => {
      if (!session?.user) return;
      try {
        await createProfile({
          context: {
            headers: {
              "authorization": `Bearer anyway`,
            }
          },
          variables: {
            input: {
              email: session.user?.email ?? "",
              name: session.user?.name ?? "",
              imageUrl: session.user.image ?? "",
            },
          },
          onCompleted: (data) => {
            setProfile(data.createProfile);
          },
        });
      } catch (error) {
        console.error("Sidebar --> createProfile error", error);
      }
    };

    if (profile?.id) return;
    createProfileFn();
  }, []);

  return (
    <nav
      {...props}
      className={cn(
        "fixed bottom-0 left-0 top-0 flex h-screen w-20 flex-col bg-gray-300 py-4 dark:bg-neutral-800",
        className,
      )}
    >
      <div className="mb-2 flex w-full items-center justify-center">
        <CreateServerModal />
      </div>
      <div className="flex w-full items-center justify-center">
        <Button
          asChild
          className="text-gay-700 h-12 w-12 rounded-full bg-transparent p-2.5 hover:bg-neutral-400 dark:bg-transparent dark:text-neutral-400 dark:hover:bg-neutral-700"
        >
          <IconArrowsJoin className="h-10 w-10 rounded-full" />
        </Button>
      </div>
      <div className="flex flex-col items-center justify-center">
        <Button
          asChild
          className="text-gay-700 h-12 w-12 rounded-full bg-transparent p-2.5 hover:bg-neutral-400 dark:bg-transparent dark:text-neutral-400 dark:hover:bg-neutral-700"
          onClick={toggleDarkMode}
        >
          {darkMode ? (
            <IconMoon className="rounded-full" />
          ) : (
            <IconSun className="rounded-full" />
          )}
        </Button>
      </div>
    </nav>
  );
};
