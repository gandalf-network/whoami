/* eslint-disable @next/next/no-img-element */

import { ReportsCardMockedData, TVStatsMockedData } from "@/helpers/mocked";
import { OpenGraphImageProps } from "@/types";

import { BaseOGImage } from "./base";
import {
  ReportOverviewOGImage,
  RottenTomatoeOGImage,
  StarSignOGImage,
} from "./reports";
import { CrossOverStarOGImage } from "./star";
import {
  FirstTVShowOGImage,
  MostWatchedOGImage,
  TotalShowOGImage,
  TvBFFOGImage,
} from "./tv";

const OGImage = ({ id, data }: OpenGraphImageProps) => {
  // convert data from string to object
  const parsedData = data ? JSON.parse(decodeURIComponent(data)) : undefined;

  // rotten tomatoe score data
  const scoreData = id === "rottenTomatoesScore" ? parsedData : undefined;
  if (scoreData) {
    return <RottenTomatoeOGImage {...scoreData} />;
  }

  // report overview data
  const reportOverviewData = id === "overview" ? parsedData : undefined;

  if (reportOverviewData) {
    return <ReportOverviewOGImage {...reportOverviewData} />;
  }

  // star sign data
  const starSignData = id === "starSign" ? parsedData : undefined;

  if (starSignData) {
    return <StarSignOGImage {...starSignData} />;
  }

  // tv bff data
  const tvBFFData = id === "tvBff" ? parsedData : undefined;
  if (tvBFFData) {
    return <TvBFFOGImage {...tvBFFData} />;
  }

  // crossover star data
  const crossoverStar = id === "crossoverStar" ? parsedData : undefined;

  if (crossoverStar) {
    return <CrossOverStarOGImage {...crossoverStar} />;
  }

  // total shows data
  const totalShows = id === "totalShows" ? parsedData : undefined;
  if (totalShows) {
    return <TotalShowOGImage {...totalShows} />;
  }

  // most watched tv show data
  const mostWatched = id === "mostWatchedTvShow" ? parsedData : undefined;

  if (mostWatched) {
    return <MostWatchedOGImage {...mostWatched} />;
  }

  // first tv show data
  const firstTVShow = id === "firstTvShow" ? parsedData : undefined;
  if (firstTVShow) {
    return <FirstTVShowOGImage {...firstTVShow} />;
  }

  // default
  return <BaseOGImage />;
};

export default OGImage;
