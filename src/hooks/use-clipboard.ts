import { useState, useCallback } from "react";

import { isWindowDefined } from "@/helpers/utils";

type UseCopyToClipboardOptionsType = {
  timeout?: number;
} | void;

export const useCopyToClipboard = (
  options: UseCopyToClipboardOptionsType,
): [string, (text: string) => void] => {
  const [copiedText, setCopiedText] = useState<string>("");

  const copyToClipboard = useCallback((text: string) => {
    if (!isWindowDefined()) {
      return;
    }

    try {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
      } else {
        // Create a temporary textarea element to copy the text
        const textarea = document.createElement("textarea");
        textarea.value = text;

        // Make the textarea non-editable to avoid focus and cursor issues
        textarea.setAttribute("readonly", "");

        // Set the position to be off-screen
        textarea.style.position = "absolute";
        textarea.style.left = "-9999px";

        // Append the textarea to the document
        document.body.appendChild(textarea);

        // Select and copy the text
        textarea.select();
        document.execCommand("copy");

        // Remove the textarea from the document
        document.body.removeChild(textarea);
      }

      // Update the copied text state
      setCopiedText(text);

      if (options?.timeout) {
        setTimeout(() => {
          setCopiedText("");
        }, options.timeout);
      }
    } catch (error) {
      console.error("Failed to copy text to clipboard:", error);
    }
  }, []);

  return [copiedText, copyToClipboard];
};
