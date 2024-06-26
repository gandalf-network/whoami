import { useState } from "react";

import {
  getStoryDownloadSelector,
  getStoryLink,
  getStoryShareText,
} from "@/helpers/story";
import {
  dataURLtoFile,
  isMobileOrTablet,
  objectToGetParams,
  openLinkInNewTab,
} from "@/helpers/utils";
import { AllStoryIds, ShareMediumType } from "@/types";

import { useCopyToClipboard } from "./use-clipboard";
import { useImage } from "./use-image";

export const useShare = ({ storyId }: { storyId: AllStoryIds }) => {
  const { convertImageToBase64 } = useImage();

  const [copied, copyToClipboard] = useCopyToClipboard({ timeout: 3000 });

  const [selectedMedium, setSelectedMedium] = useState<
    ShareMediumType | undefined
  >(undefined);

  const [loading, setLoading] = useState(false);

  const storyLink = getStoryLink(storyId);

  const share = async ({
    type,
    info,
  }: {
    type: ShareMediumType;
    info: any;
  }) => {
    const shareText = getStoryShareText(storyId, info);
    try {
      setSelectedMedium(type);
      setLoading(true);

      // if the share medium type is copy then copy to clipboard
      if (type === "copy") {
        copyToClipboard(storyLink);
        return;
      }

      // if the share medium type is download then download story image
      if (type === "download") {
        await convertImageToBase64({
          selector: getStoryDownloadSelector(storyId).selector,
          download: true,
          downloadName: `${storyId.toLowerCase()}.png`,
        });
        return;
      }

      // share link on mobile
      if (type === "share" || type === "tiktok" || type === "instagram") {
        const image = await convertImageToBase64({
          selector: getStoryDownloadSelector(storyId).selector,
        });

        const imageFile = await dataURLtoFile(
          image,
          `${storyId.toLowerCase()}.png`,
        );

        const shareData =
          type === "instagram"
            ? imageFile
              ? { files: [imageFile] }
              : { url: storyLink }
            : {
                ...(imageFile ? { files: [imageFile] } : {}),
                url: storyLink,
              };

        if (navigator?.canShare?.(shareData)) {
          await navigator.share(shareData);
        } else {
          console.error("Web Share API is not supported in your browser");

          if (type === "instagram") {
            openLinkInNewTab("https://instagram.com/");
          }

          if (type === "tiktok") {
            openLinkInNewTab("https://tiktok.com/");
          }
        }
      }

      if (type === "whatsapp") {
        const link =
          "https://" +
          (isMobileOrTablet() ? "api" : "web") +
          ".whatsapp.com/send" +
          objectToGetParams({
            text: `${shareText} - ${storyLink}`,
          });

        openLinkInNewTab(link);
        return;
      }

      if (type === "x") {
        const link =
          "https://twitter.com/intent/tweet" +
          objectToGetParams({
            text: shareText,
            url: storyLink,
          });

        openLinkInNewTab(link);
      }
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return [share, { loading, copied, storyLink, selectedMedium }] as const;
};
