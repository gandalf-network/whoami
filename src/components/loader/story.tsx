import { Loader2 } from "lucide-react";

import { cn } from "@/helpers/utils";
import { StoryLoaderProps } from "@/types";

import { Text } from "../themed";

export const StoryLoader = (props: StoryLoaderProps) => {
  const { title, className, ...rest } = props;

  return (
    <div className={cn("gap-y-10 story-content", className)} {...rest}>
      {title && (
        <Text className="text-2xl uppercase" font="heading">
          {title}
        </Text>
      )}
      <div className="flex-1 flex-center max-h-56">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    </div>
  );
};
