import type { Metadata } from "next";

import { AllStoryIds } from "@/types";

import { getEnvDetails, isProduction } from "./utils";

// this is the og image urls for the project
export const ogImageUrls = {
  default: `${getEnvDetails().url}/api/og`,
};

// this is the function to build the og image url
export const buildOgImageUrl = (options?: {
  story: AllStoryIds;
  data: Record<string, any>;
}) => {
  if (!options) return ogImageUrls.default;

  const { story, data } = options;

  return `${getEnvDetails().url}/api/og?id=${story}&data=${encodeURIComponent(JSON.stringify(data))}`;
};

// this is the base metadata for the project
export const baseMetadataInfo = {
  title: "WhoAmI",
  description:
    "A fun, sharable web application that shows users all kinds of cool facts and stats about their TV tastes.",
  url: "https://whoami.tv",
  siteName: "WhoAmI",
};

// this is the metadata for each story
export const storiesMetadata: Record<AllStoryIds, Metadata> = {
  starSign: {
    title: "WhoAmI - Star Sign",
    description: baseMetadataInfo.description,
  },
  tvBff: {
    title: "WhoAmI - TV BFF",
    description: baseMetadataInfo.description,
  },
  firstTvShow: {
    title: "WhoAmI - First TV Show",
    description: baseMetadataInfo.description,
  },
  mostWatchedTvShow: {
    title: "WhoAmI - Most Watched TV Show",
    description: baseMetadataInfo.description,
  },
  totalShows: {
    title: "WhoAmI - Total Shows",
    description: baseMetadataInfo.description,
  },
  tvGenre: {
    title: "WhoAmI - TV Genre",
    description: baseMetadataInfo.description,
  },
  rottenTomatoesScore: {
    title: "WhoAmI - Rotten Tomatoes Score",
    description: baseMetadataInfo.description,
  },
  crossoverStar: {
    title: "WhoAmI - Crossover Star",
    description: baseMetadataInfo.description,
  },
  overview: {
    title: "WhoAmI - Personality",
    description: baseMetadataInfo.description,
  },
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

// @note: this og image urls were only used in the OG image generation
export const ogImageStlyingUrls = {
  grid: "https://res.cloudinary.com/dmsic9qmj/image/upload/v1712581637/gandalf/whoami/og/grid_zgutp3.png",
  gridPlain:
    "https://res.cloudinary.com/dmsic9qmj/image/upload/v1712584185/gandalf/whoami/og/grid-2_mxbl6j.png",
  starBg:
    "https://res.cloudinary.com/dmsic9qmj/image/upload/v1712589312/gandalf/whoami/og/star-bg_x1h6fi.png",
  firstTvBg:
    "https://res.cloudinary.com/dmsic9qmj/image/upload/v1712589513/gandalf/whoami/og/firstTvBg_twr1vk.png",
  mostWatchedBg:
    "https://res.cloudinary.com/dmsic9qmj/image/upload/v1712589516/gandalf/whoami/og/mostWatchBg_l7d76q.png",
  totalShowBg:
    "https://res.cloudinary.com/dmsic9qmj/image/upload/v1712589511/gandalf/whoami/og/totalShowBg_fudjyq.png",
  tvBFFBg:
    "https://res.cloudinary.com/dmsic9qmj/image/upload/v1712589928/gandalf/whoami/og/tvBffBg_bygewg.png",
  scoreBg:
    "https://res.cloudinary.com/dmsic9qmj/image/upload/v1712594091/gandalf/whoami/og/score-bg_i35mqo.png",
  tvGenreBg:
    "https://res.cloudinary.com/dmsic9qmj/image/upload/v1713430911/gandalf/whoami/og/tvgenre_tusfrr.png",
};

// @note: this og image colors were only used in the OG image generation
export const ogImageStlyingColors = {
  white: "#fff",
  gray: "#D9D9D9",
  cyan: "#C4EFF5",
  green: "#A0D394",
  pink: "#FDC1C9",
  yellow: "#FFE581",
  orange: "#FFA17B",
  lavender: "#FFB3EF",
  purple: "#C5A1FF",
  blue: "#88CEEB",
  tomatoe: "#FF541F",
  progress: "#F6D7B2",
};

// --- OG Styles for reusable styling ---
export const ogStyles: Record<string, React.CSSProperties> = {
  flexCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  flexCenterY: {
    display: "flex",
    alignItems: "center",
  },
  flexCenterX: {
    display: "flex",
    justifyContent: "center",
  },
  flexColumn: {
    display: "flex",
    flexDirection: "column",
  },
  imageBox: {
    background: ogImageStlyingColors.white,
    border: "4px solid #000",
    boxShadow: "8px 8px 0px 0px #000",
    width: "380px",
    borderRadius: "1rem",
    height: "80%",
    overflow: "hidden",
  },
  responsiveImage: {
    objectFit: "cover",
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
};
