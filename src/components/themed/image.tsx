/* eslint-disable @next/next/no-img-element */
import { cn } from "@/helpers/utils";

import { MovieIcon } from "../icon";

export const PlaceholderImage = ({
  src,
  className,
  iconClassName,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement> & { iconClassName?: string }) => {
  if (src) {
    return (
      <img
        src={src}
        alt="image"
        className={cn(
          "rounded-lg flex-center w-full h-full border-2 shadow-black shadow-[4px_4px] relative bg-background object-cover",
          className,
        )}
        {...props}
      />
    );
  }

  return (
    <div
      className={cn(
        "rounded-lg flex-center w-full h-full border-2 shadow-black shadow-[4px_4px] relative bg-background object-cover;",
        className,
      )}
    >
      <MovieIcon className={cn("w-20", iconClassName)} />
    </div>
  );
};