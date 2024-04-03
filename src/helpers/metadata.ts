import type { Metadata } from "next";

import { getEnvDetails, isProduction } from "./utils";

// this is the og image urls for the project
const ogImageUrls = {
  default: `${getEnvDetails().url}/api/og`,
};

// this is the base metadata for the project
const baseMetadataInfo = {
  title: "WhoAmI",
  description:
    "A fun, sharable web application that shows users all kinds of cool facts and stats about their TV tastes.",
  url: "https://whoami.tv",
  siteName: "WhoAmI",
};

// shared metadata for all pages
export const sharedMetadata: Metadata = {
  ...(isProduction() ? {} : { metadataBase: new URL(getEnvDetails().url) }),
  title: baseMetadataInfo.title,
  description: baseMetadataInfo.description,
  openGraph: {
    title: baseMetadataInfo.title,
    description: baseMetadataInfo.description,
    url: baseMetadataInfo.url,
    type: "website",
    locale: "en_US",
    siteName: baseMetadataInfo.siteName,
    images: [ogImageUrls.default],
  },
  twitter: {
    title: baseMetadataInfo.title,
    description: baseMetadataInfo.description,
    creator: "@whoami",
    card: "summary_large_image",
    images: [ogImageUrls.default],
  },
};
