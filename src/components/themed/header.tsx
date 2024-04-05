import { cn } from "@/helpers/utils";

import { LogoIcon, LogoMarkIcon } from "../icon";

export interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string;
}

export const PageHeader = ({ name, className, ...props }: HeaderProps) => {
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
