"use client";

/* eslint-disable @next/next/no-img-element */
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

import { cn, fetchImageBase64Data } from "@/helpers/utils";

import { MovieIcon } from "../icon";

export const PlaceholderImage = ({
  src,
  className,
  iconClassName,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement> & { iconClassName?: string }) => {
  const placeholderClassName =
    "rounded-lg flex-center w-full h-full border-2 shadow-black shadow-[4px_4px] relative bg-background object-cover";

  const [imageSrc, setImageSrc] = useState("");

  const [loading, setLoading] = useState(false);

  const fetchImage = async () => {
    try {
      setLoading(true);

      /**
       * Note: We converted the image to Base64 to enable downloading and sharing functionality.
       * This approach addresses the issue where some images are subject to Cross-Origin Resource Sharing (CORS) restrictions,
       * which can prevent the download functionality from working on the client side.
       */
      const base64 = await fetchImageBase64Data(src || "");

      setImageSrc(base64);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (src) {
      fetchImage();
    }
  }, [src]);

  if (imageSrc || src) {
    if (loading) {
      return (
        <div className={cn(placeholderClassName, className)}>
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      );
    }

    return (
      <img
        src={imageSrc}
        alt="image"
        className={cn(placeholderClassName, className)}
        {...props}
      />
    );
  }

  return (
    <div className={cn(placeholderClassName, className)}>
      <MovieIcon className={cn("w-20", iconClassName)} />
    </div>
  );
};
