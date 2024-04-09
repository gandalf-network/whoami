import downloadJS from "downloadjs";
import { toPng } from "html-to-image";
import { Options } from "html-to-image/lib/types";

interface ConvertOptionType extends Options {
  selector?: string;
  node?: HTMLElement;
  download?: boolean;
  downloadName?: string;
}

export const useImage = () => {
  const convertImageToBase64 = async ({
    selector,
    node,
    download,
    downloadName = "story.png",
    ...rest
  }: ConvertOptionType) => {
    const element = node || document.querySelector(selector || "");

    try {
      if (!element) {
        throw new Error("Element not found");
      }

      // Remove hidden class
      element.classList.remove("hidden");
      element.classList.add("flex");

      const base64 = await toPng(element as HTMLElement, {
        ...rest,
      });

      if (download && base64 !== null && base64 !== "data:,") {
        downloadJS(base64, downloadName, "image/png");
      }

      return base64;
    } catch (error) {
      throw error;
    }
  };

  return {
    convertImageToBase64,
  };
};
