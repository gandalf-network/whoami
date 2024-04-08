import type { Metadata } from "next";

import { getEnvDetails, isProduction } from "./utils";

// this is the og image urls for the project
export const ogImageUrls = {
  default: `${getEnvDetails().url}/api/og`,
};

export const ogImageStlyingUrls = {
  grid: "https://res.cloudinary.com/dmsic9qmj/image/upload/v1712581637/gandalf/whoami/og/grid_zgutp3.png",
};

// this is the base metadata for the project
export const baseMetadataInfo = {
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
