import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// this is a utility function that merges the tailwind classes with the clsx classes
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

// this is a utility function that checks if the current environment is production
export const isProduction = () => process.env.NODE_ENV === "production";

// this is a utility function that appends the protocol to the url
export const appendProtocolToUrl = (url: string) => {
  return url.startsWith("https:") ? url : `https://${url}`;
};

// this is a utility function that gets the environment details
export const getEnvDetails = () => {
  const url = isProduction()
    ? process.env.NEXT_PUBLIC_VERCEL_URL || ""
    : process.env.NEXT_PUBLIC_VERCEL_URL ||
      process.env.NEXT_PUBLIC_APP_URL ||
      "";

  const sterilizeUrl = url ? new URL(appendProtocolToUrl(url)) : undefined;

  const host = sterilizeUrl?.host;

  const protocol = host?.includes("localhost") ? "http" : "https";

  return {
    host,
    protocol,
    url: `${protocol}://${host}`,
  };
};
