import { Link } from "lucide-react";

import { cn } from "@/helpers/utils";

import { LogoIcon, LogoMarkIcon } from "../icon";

export interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string;
}

export const StoryFooter = ({ name, className, ...props }: HeaderProps) => {
  return (
    <header
      className={cn("w-full flex items-center justify-between", className)}
      {...props}
    >
      <div className="flex items-center gap-x-1">
        <LogoIcon />
        <LogoMarkIcon strokeWidth={1.2} />
      </div>
      <p className="flex-center-y underline gap-x-0.5">
        <Link className="w-4" />
        whoami.tv
      </p>
    </header>
  );
};
