import { ClerkProvider } from "@clerk/nextjs";
import { ReactNode } from "react";

interface IProviders {
  children: ReactNode;
}

export const Providers = ({ children }: IProviders) => {
  return <ClerkProvider>{children}</ClerkProvider>;
};
