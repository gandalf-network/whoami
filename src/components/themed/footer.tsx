import { Link } from "lucide-react";

import { cn } from "@/helpers/utils";

import { LogoIcon, LogoMarkIcon } from "../icon";

export const StoryFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <header
      className={cn("w-full flex items-center justify-between", className)}
      {...props}
    >
      <div className="flex items-center gap-x-1">
        <LogoIcon className="w-8" />
        <LogoMarkIcon className="w-28" strokeWidth={1} />
      </div>
      <p className="flex-center-y underline gap-x-0.5 font-medium">
        <Link className="w-4" />
        whoami.tv
      </p>
    </header>
  );
};
