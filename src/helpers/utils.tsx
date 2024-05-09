import { type ClassValue, clsx } from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

import { getEnvDetails, isProduction } from "./base";

export { getEnvDetails, isProduction };

// this is a utility function that merges the tailwind classes with the clsx classes
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

// this is a utility function that gets the app info
export const appInfo = {
  repoUrl: "https://github.com/gandalf-network/whoami",
  deployUrl:
    "https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fgandalf-network%2Fwhoami&env=NEXT_PUBLIC_GANDALF_PUBLIC_KEY,GANDALF_PRIVATE_KEY&envDescription=Environment%20variables%20for%20the%20Gandalf%20API&envLink=https%3A%2F%2Fgandalf-api.com%2Fdashboard&project-name=whoami&repository-name=whoami",
  connectUrl: `https://auth.gandalf.network/?services={%22netflix%22:true}&redirectUrl=${process.env.NEXT_PUBLIC_VERCEL_URL}&publicKey=${process.env.NEXT_PUBLIC_GANDALF_PUBLIC_KEY}`,
};

/**
 * this method format an array of string to sentence
 * @param strings e.g. ["alex", "brain", "charles"]
 * @returns "alex, brain, and charles"
 */
export const formatStringArrayToJSX = ({
  strings,
  className,
}: {
  strings: string[];
  className?: string;
}) => {
  // Check if the array is empty
  if (!strings || strings.length === 0) {
    return null;
  } else if (strings.length === 1) {
    return <span className={className}>{strings[0]}</span>;
  } else if (strings.length === 2) {
    return (
      <>
        <span className={className}>{strings[0]}</span> and{" "}
        <span className={className}>{strings[1]}</span>
      </>
    );
  } else {
    return strings.map((str, index) => {
      const isLastItem = index === strings.length - 1;
      return (
        <React.Fragment key={`index-${index}`}>
          {isLastItem && <>and </>}
          <span className={className}>
            “{str}”{isLastItem ? "" : ", "}
          </span>
        </React.Fragment>
      );
    });
  }
};

// this is a utility function that checks if the window is defined
export const isWindowDefined = () => typeof window !== "undefined";

// this is a utility function that converts a data url to a file
export const dataURLtoFile = async (
  dataUrl: string,
  fileName: string,
): Promise<File> => {
  const res: Response = await fetch(dataUrl);
  const blob: Blob = await res.blob();
  return new File([blob], fileName, { type: "image/png" });
};

export const objectToGetParams = (object: {
  [key: string]: string | number | undefined | null;
}) => {
  const params = Object.entries(object)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`,
    );

  return params.length > 0 ? `?${params.join("&")}` : "";
};

export const isMobileOrTablet = () => {
  return /(android|iphone|ipad|mobile)/i.test(navigator.userAgent);
};

export const openLinkInNewTab = (url: string) => {
  // note: i'm using the timeout to fix window not opening on SAFARI browsers
  setTimeout(() => {
    window.open(url, "_blank", "noopener,noreferrer");
  }, 100);
};

export const generateUUID = () => {
  return crypto.randomUUID();
};

export const fetchImageBase64Data = async (url?: string) => {
  if (!url) {
    return "";
  }

  try {
    const req = await fetch("/api/image", {
      method: "POST",
      body: JSON.stringify({
        url,
      }),
    });
    const base64 = await req.text();
    return base64;
  } catch (err) {
    throw err;
  }
};

export const removeNonAlphanumericLastChar = (str: string) => {
  return str.replace(/[\W_]$/, "");
};

// Function to detect mobile using user agent and screen size
export const checkIfMobile = () => {
  if (!isWindowDefined()) {
    return false;
  }

  const mobileUserAgents = [
    "Android",
    "iPhone",
    "iPad",
    "iPod",
    "BlackBerry",
    "Windows Phone",
  ];

  const isMobileUserAgent = mobileUserAgents.some((ua) =>
    navigator.userAgent.includes(ua),
  );

  // Additionally, check if screen width is below a threshold (like 768px for common mobile breakpoint)
  const isMobileScreenSize = window.innerWidth <= 768;

  return isMobileUserAgent || isMobileScreenSize;
};

export function standardizeName(name: string): string {
  return name
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(" ")
    .sort()
    .join(" ")
    .toLowerCase();
}

export function handleShowTitleEdgeCases(title: string): string {
  const regex = /\s*\([A-Z]\.[A-Z]\.\)$/;
  title = title.replace(regex, "");
  switch (true) {
    case title.toLowerCase() === "top boy":
      return "Top Boy 2019";
    default:
      return title;
  }
}

export const replaceAmpersandWithAnd = (text: string) => {
  return text.replace(/&/g, "and");
};
