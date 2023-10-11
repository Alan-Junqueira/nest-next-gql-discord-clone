"use client";

import { Inter } from "next/font/google";
import { useDarkModeStore } from "@/store/darkModeStore";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [darkMode] = useDarkModeStore((store) => [store.state.darkMode]);

  return (
    <html lang="en" className={darkMode ? "dark" : ""}>
      <body
        className={`${inter.className} h-screen w-screen bg-gray-100 dark:bg-neutral-900`}
      >
        <div>{children}</div>
      </body>
    </html>
  );
}
