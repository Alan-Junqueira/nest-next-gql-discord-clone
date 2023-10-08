import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";

import { ReactNode } from "react";

interface IProviders {
  children: ReactNode;
}

export const Providers = ({ children }: IProviders) => {
  return (
    <ClerkProvider>
      {/* <SignedIn> */}
      {children}
      {/* </SignedIn> */}
      {/* <SignedOut> */}
      {/* <RedirectToSignIn /> */}
      {/* </SignedOut> */}
    </ClerkProvider>
  );
};
