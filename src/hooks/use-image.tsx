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
      // check if element exists
      if (!element) {
        throw new Error("Element not found");
      }

      /**
       * @note removing hidden class and adding flex class
       * to make sure the element is displayed
       * before converting it to image solves the issue of the image
       * downloaded being blank
       */
      element.classList.remove("hidden");
      element.classList.add("flex");

      // convert element to bas64 three times to make sure the image is not blank
      await Promise.all([
        toPng(element as HTMLElement),
        toPng(element as HTMLElement),
        toPng(element as HTMLElement),
        toPng(element as HTMLElement),
        toPng(element as HTMLElement),
      ]);

      await new Promise((resolve) => setTimeout(resolve, 2000));

      // convert element to base64
      const base64 = await toPng(element as HTMLElement, {
        ...rest,
      });

      // if download is true, download the image
      if (download && base64 !== null && base64 !== "data:,") {
        downloadJS(base64, downloadName, "image/png");
      }

      // return base64
      return base64;
    } catch (error) {
      throw error;
    }
  };

  return {
    convertImageToBase64,
  };
};
