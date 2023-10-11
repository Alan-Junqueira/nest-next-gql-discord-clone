"use client";
import React from "react";
import { Button } from "../ui/button";
import {
  IconArrowsJoin,
  IconMoon,
  IconPlus,
  IconSun,
} from "@tabler/icons-react";
import { useDarkModeStore } from "@/store/darkModeStore";

export const Sidebar = () => {
  const [darkMode, toggleDarkMode] = useDarkModeStore((store) => [
    store.state.darkMode,
    store.actions.toggleDarkMode,
  ]);
  return (
    <nav className="fixed bottom-0 left-0 top-0 flex h-screen w-20 flex-col bg-gray-300 py-4 dark:bg-neutral-800">
      <div className="mb-2 flex w-full items-center justify-center">
        <Button
          asChild
          className="text-gay-700 h-12 w-12 rounded-full bg-transparent p-2.5 hover:bg-neutral-400 dark:bg-transparent dark:text-neutral-400 dark:hover:bg-neutral-700"
        >
          <IconPlus className="h-10 w-10 rounded-full" />
        </Button>
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
