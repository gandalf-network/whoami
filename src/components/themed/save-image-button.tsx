"use client";

import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

import { Button as BaseButton } from "@/components/ui/button";
import { getStoryDownloadSelector } from "@/helpers/story";
import { cn } from "@/helpers/utils";
import { useDialog } from "@/hooks/use-dialog";
import { useImage } from "@/hooks/use-image";
import { ShareButtonProps, ShareStoryProps } from "@/types";

import { ThemedImage } from "./image";
import { ShareDialogContent } from "./share-button";
import { DownloadIcon } from "../icon/";
import { LoadingIcon } from "../loader/base";

export const SaveImageDialogContent = ({
  storyProps,
}: {
  storyProps: ShareStoryProps;
}) => {
  const [loading, setLoading] = useState(false);

  const [src, setSrc] = useState("");

  const { convertImageToBase64 } = useImage();

  const { hide, show } = useDialog();

  const onBack = () => {
    show({
      onOverlayClick: hide,
      contentClassName: "max-w-xs md:max-w-lg rounded-2xl",
      children: <ShareDialogContent storyProps={storyProps} />,
    });
  };

  const convertImage = async () => {
    if (!storyProps?.id) return;

    try {
      setLoading(true);

      const base64 = await convertImageToBase64({
        selector: getStoryDownloadSelector(storyProps.id).selector,
      });

      setSrc(base64);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    convertImage();
  }, []);

  return (
    <div className="w-full flex flex-col gap-3 relative bg-background z-[999999]">
      <div className="w-full h-full fixed bg-black/40 top-0 left-0 z-10" />
      <BaseButton
        onClick={onBack}
        className="w-7 h-7 border shadow-[1px_2px] rounded-full flex-center p-0 absolute top-4 left-4 bg-background z-20"
      >
        <ArrowLeft className="w-4 md:w-5" />
      </BaseButton>

      <p className="text-xl font-medium text-center mt-20 mb-10">
        Tap and hold to save image
      </p>

      <div className="flex-col flex-center flex-[0.7]">
        <ThemedImage
          src={src}
          className="shadow-none border-0 relative z-20 w-[225px] h-[400px] object-cover rounded-2xl bg-background"
          disableConvertionToBase64
          isLoading={loading}
        />
      </div>
    </div>
  );
};

export const SaveImageButton = ({
  className,
  loading,
  storyProps,
  ...props
}: ShareButtonProps) => {
  const { hide, show } = useDialog();

  const onClick = () => {
    show({
      onOverlayClick: hide,
      contentClassName: "w-full md:max-w-[420px] h-full rounded-none",
      children: <SaveImageDialogContent storyProps={storyProps} />,
    });
  };

  return (
    <BaseButton
      variant="link"
      className={cn(
        "text-foreground flex-col flex-center text-sm gap-y-1.5 h-auto px-0 font-normal",
        className,
      )}
      onClick={onClick}
    >
      <span className="flex-shrink-0 flex justify-center">
        {!loading ? (
          <DownloadIcon className="w-10" />
        ) : (
          <LoadingIcon className="bg-primary-blue" />
        )}
      </span>
      Save Image
    </BaseButton>
  );
};
