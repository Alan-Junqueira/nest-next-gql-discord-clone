import { ComponentProps, ReactNode } from "react";

interface IContainer extends ComponentProps<"div"> {
  children: ReactNode;
}

export const Container = ({ children }: IContainer) => {
  return <div className="ml-20">{children}</div>;
};
