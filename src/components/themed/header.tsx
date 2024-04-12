import { cn } from "@/helpers/utils";
import { PageHeaderProps } from "@/types";

import { Button } from "./button";
import { LogoIcon, LogoMarkIcon, PauseIcon, PlayIcon } from "../icon";

export const PageHeader = ({
  name,
  className,
  storyProps,
  ...props
}: PageHeaderProps) => {
  return (
    <header
      className={cn("w-full flex items-center justify-between", className)}
      {...props}
    >
      <div className="flex items-center gap-x-1">
        <LogoIcon />
        <LogoMarkIcon />
      </div>

      <div className="flex-center-y gap-x-2.5">
        {name && <p className="font-bold text-sm uppercase">{name}</p>}
        {storyProps && (
          <Button
            variant="link"
            className="p-0 w-6 h-6 rounded-full border shadow-[1px_2px]"
          >
            {storyProps.isPaused ? <PlayIcon /> : <PauseIcon />}
          </Button>
        )}
      </div>
    </header>
  );
};
