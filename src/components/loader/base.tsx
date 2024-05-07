import { Loader2 } from "lucide-react";

import { cn } from "@/helpers/utils";

export const LoadingIcon = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("flex-center w-10 h-10 border-2 rounded-lg", className)}>
      <Loader2 className="w-4 h-4 animate-spin" />
    </div>
  );
};
