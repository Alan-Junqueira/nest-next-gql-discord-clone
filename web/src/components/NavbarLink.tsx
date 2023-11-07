import { Plus } from "lucide-react";
import {
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
} from "./radix";
import Image from "next/image";
import Link from "next/link";

interface INavbarLinkProps {
  imageUrl: string;
  label: string;
  active?: boolean;
  linkHref: string;
}

export const NavbarLink = ({ imageUrl, label, linkHref }: INavbarLinkProps) => {
  return (
    <TooltipProvider delayDuration={0}>
      <TooltipRoot>
        <TooltipTrigger asChild>
          <Link
            className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-transparent transition-all duration-200 ease-in hover:rounded-2xl hover:border-neutral-200 dark:hover:border-gray-700"
            href={linkHref}
          >
            <Image
              src={imageUrl}
              fill
              alt={label}
              priority
              className="object-cover"
            />
          </Link>
        </TooltipTrigger>
        <TooltipPortal>
          <TooltipContent
            className="select-none rounded-[4px] bg-white px-4 py-2.5 text-base shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity] dark:bg-gray-700 dark:text-neutral-200"
            sideOffset={5}
            side="right"
          >
            {label}
            <TooltipArrow className="fill-white dark:fill-gray-700" />
          </TooltipContent>
        </TooltipPortal>
      </TooltipRoot>
    </TooltipProvider>
  );
};
