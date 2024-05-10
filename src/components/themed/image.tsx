"use client";

/* eslint-disable @next/next/no-img-element */
import { Loader2 } from "lucide-react";
import { memo, useEffect, useState } from "react";

import { cn, fetchImageBase64Data } from "@/helpers/utils";

import { MovieIcon } from "../icon";

const placeholderClassName =
  "rounded-lg flex-center w-full h-full border-2 shadow-black shadow-[4px_4px] relative bg-background object-cover";

export const ThemedBaseImage = memo(function Image({
  className,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement>) {
  if (!props?.src) {
    return (
      <div className={cn(placeholderClassName, className)}>
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }
  return (
    <img
      className={cn(placeholderClassName, className)}
      alt="image"
      {...props}
    />
  );
});

export const ThemedImage = memo(function Image({
  src,
  className,
  iconClassName,
  disableConvertionToBase64,
  isLoading,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement> & {
  iconClassName?: string;
  disableConvertionToBase64?: boolean;
  isLoading?: boolean;
}) {
  const [imageSrc, setImageSrc] = useState("");

  const [loading, setLoading] = useState(false);

  const fetchImage = async () => {
    // if disableConvertionToBase64 is true, we don't need to convert the image to Base64
    if (disableConvertionToBase64) {
      setImageSrc(src || "");
      return;
    }

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

  if (isLoading) {
    return (
      <div className={cn(placeholderClassName, className)}>
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

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
});
