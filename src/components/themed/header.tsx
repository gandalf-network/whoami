import { cn } from "@/helpers/utils";
import { PageHeaderProps } from "@/types";

import { LogoIcon, LogoMarkIcon } from "../icon";

export const PageHeader = ({ name, className, ...props }: PageHeaderProps) => {
  return (
    <header
      className={cn("w-full flex items-center justify-between", className)}
      {...props}
    >
      <div className="flex items-center gap-x-1">
        <LogoIcon />
        <LogoMarkIcon />
      </div>
      {name && <p className="font-bold text-sm uppercase">{name}</p>}
    </header>
  );
};
