"use client";
import { Check, Copy, ShareIcon, XIcon } from "lucide-react";

import { Button as BaseButton } from "@/components/ui/button";
import { cn } from "@/helpers/utils";
import { useDialog } from "@/hooks/use-dialog";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { useShare } from "@/hooks/use-share";
import { ShareButtonProps, ShareMediumType, ShareStoryProps } from "@/types";

import { Button } from "./button";
import { SaveImageButton } from "./save-image-button";
import {
  InstagramIcon,
  TiktokIcon,
  CopyIcon,
  DownloadIcon,
  XSocialIcon,
  WhatsAppIcon,
} from "../icon/";
import { LoadingIcon } from "../loader/base";
import { AlertDialogCancel } from "../ui/alert-dialog";

export const ShareDialogContent = ({
  storyProps,
}: {
  storyProps: ShareStoryProps;
}) => {
  const isMobile = useIsMobile();

  const storyId = storyProps.id;
  const info = storyProps.info;

  const [share, { loading, copied, storyLink, selectedMedium }] = useShare({
    storyId,
  });

  const shareMediums = [
    {
      name: "Instagram",
      icon: <InstagramIcon className="w-10" />,
      type: "instagram",
    },
    {
      name: "Tiktok",
      type: "tiktok",
      icon: <TiktokIcon className="w-10" />,
    },
    {
      name: "x",
      type: "x",
      icon: <XSocialIcon className="w-10" />,
    },
    {
      name: "WhatsApp",
      type: "whatsapp",
      icon: <WhatsAppIcon className="w-10" />,
    },
    {
      name: "Download",
      icon: <DownloadIcon className="w-10" />,
      loadingIcon: <LoadingIcon className="bg-primary-blue " />,
      type: "download",
    },
    {
      name: "Share link",
      icon: <CopyIcon className="w-10" />,
      loadingIcon: <LoadingIcon className="bg-primary-amber" />,
      type: "share",
      className: "md:hidden",
    },
  ];

  const onShareClick = (type: ShareMediumType) => {
    share({ type, info });
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between mb-3 items-center">
        <p className="text-center text-xl font-medium">Share to:</p>
        <AlertDialogCancel className="w-6 h-6 md:w-7 md:h-7 shadow-[1px_2px] rounded-full flex-center p-0">
          <div>
            <XIcon className="w-4 md:w-6" />
          </div>
        </AlertDialogCancel>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-5 gap-3 justify-between">
        {shareMediums.map((medium) => {
          if (medium.type === "download" && isMobile) {
            return (
              <SaveImageButton
                key={medium.name}
                storyProps={storyProps}
                loading={selectedMedium === medium.type ? loading : undefined}
              />
            );
          }

          return (
            <BaseButton
              key={medium.name}
              variant="link"
              onClick={() => onShareClick(medium.type as ShareMediumType)}
              className={cn(
                "text-foreground flex-col flex-center text-sm gap-y-1.5 h-auto px-0 font-normal",
                medium?.className,
              )}
              disabled={
                selectedMedium === medium.type && !medium.loadingIcon
                  ? loading
                  : undefined
              }
            >
              <span className="flex-shrink-0 flex justify-center">
                {loading &&
                medium?.loadingIcon &&
                selectedMedium === medium.type
                  ? medium.loadingIcon
                  : medium.icon}
              </span>
              {medium.name}
            </BaseButton>
          );
        })}
      </div>

      <div className="hidden md:flex mt-2 border-2 rounded-lg bg-muted-gray h-11 items-center overflow-hidden">
        <p className="mx-4 text-sm text-center flex-1 truncate w-28">
          {storyLink}
        </p>
        <BaseButton
          variant="link"
          onClick={() => onShareClick("copy")}
          className="flex flex-center gap-x-2 border-l-2 h-full rounded-none w-32 flex-shrink-0 bg-primary-amber"
        >
          {!copied ? <Copy /> : <Check />}
          Copy link
        </BaseButton>
      </div>
    </div>
  );
};

export const ShareButton = ({
  storyProps,
  className,
  ...props
}: ShareButtonProps) => {
  const { hide, show } = useDialog();

  const onClick = () => {
    storyProps.action?.("pause");
    show({
      onOverlayClick: hide,
      contentClassName: "max-w-xs md:max-w-lg rounded-2xl",
      children: <ShareDialogContent storyProps={storyProps} />,
    });
  };

  return (
    <Button
      className={cn(
        "absolute z-[9999] bottom-6 py-3.5 bg-transparent hover:bg-transparent text-base uppercase font-semibold",
        className,
      )}
      size="sm"
      {...props}
      onClick={onClick}
    >
      Share
      <ShareIcon className="w-4" />
    </Button>
  );
};
