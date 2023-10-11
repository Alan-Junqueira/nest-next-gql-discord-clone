import { getServerSession } from "next-auth";
import { ReactNode } from "react";
import { SignIn } from "@/components/auth/SignIn";
import { authOptions } from "@/lib/next-auth";
import { Sidebar } from "@/components/partials/Sidebar";
import { Container } from "@/components/layout/Container";

interface LayoutProps {
  children: ReactNode;
}

// Done after the video and optional: add page metadata
export const metadata = {
  title: "Chat | Dashboard",
  description: "Your dashboard",
};

const HomeLayout = async ({ children }: LayoutProps) => {
  const session = await getServerSession(authOptions);
  return (
    <>
      {session ? (
        <Container>
          <Sidebar />
          {children}
        </Container>
      ) : (
        <SignIn />
      )}
    </>
  );
};

export default HomeLayout;
