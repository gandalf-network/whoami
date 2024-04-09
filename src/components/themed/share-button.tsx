"use client";
import { ShareIcon } from "lucide-react";

import { Button as BaseButton } from "@/components/ui/button";
import { getStoryLink } from "@/helpers/story";
import { useCopyToClipboard } from "@/hooks/use-clipboard";
import { useDialog } from "@/hooks/use-dialog";
import { AllStoryIds, ShareMediumType } from "@/types";

import { Button, ButtonProps } from "./button";
import {
  InstagramIcon,
  TiktokIcon,
  CopyIcon,
  DownloadIcon,
  CopyCheckIcon,
} from "../icon/";

export const ShareDialogContent = ({ storyId }: { storyId: AllStoryIds }) => {
  const [copied, copyToClipboard] = useCopyToClipboard({ timeout: 3000 });

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
      name: "Download",
      icon: <DownloadIcon className="w-10" />,
      type: "telegram",
    },
    {
      name: "Copy link",
      icon: copied ? (
        <CopyCheckIcon className="w-10" />
      ) : (
        <CopyIcon className="w-10" />
      ),
      type: "copy",
    },
  ];

  const onShareClick = (type: ShareMediumType) => {
    if (type === "copy") {
      copyToClipboard(getStoryLink(storyId));
    } else {
      // ...
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <p className="text-center text-xl">Share to:</p>
      <div className="grid grid-cols-3 gap-3 justify-between">
        {shareMediums.map((medium) => (
          <BaseButton
            key={medium.name}
            variant="link"
            onClick={() => onShareClick(medium.type as ShareMediumType)}
            className="text-foreground flex-col flex-center text-sm gap-y-1.5 h-auto px-0"
          >
            <span className="flex-shrink-0 flex justify-center">
              {medium.icon}
            </span>
            {medium.name}
          </BaseButton>
        ))}
      </div>
    </div>
  );
};

export const ShareButton = ({
  storyId,
  ...props
}: ButtonProps & { storyId: AllStoryIds }) => {
  const { hide, show } = useDialog();

  const onClick = () => {
    show({
      onOverlayClick: hide,
      contentClassName: "max-w-xs rounded-2xl",
      children: <ShareDialogContent storyId={storyId} />,
    });
  };

  return (
    <Button
      className="absolute z-[999999999] bottom-8 py-4 bg-transparent hover:bg-transparent text-base uppercase"
      size="sm"
      onClick={onClick}
      {...props}
    >
      Share
      <ShareIcon className="w-4" />
    </Button>
  );
};
