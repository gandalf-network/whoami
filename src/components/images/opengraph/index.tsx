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
  const parsedData = data ? JSON.parse(data) : undefined;

  // rotten tomatoe score data
  const scoreData =
    id === "rottenTomatoesScore"
      ? parsedData
      : {
          score: ReportsCardMockedData.rottenTomatoeScore.score,
        };
  if (scoreData) {
    return <RottenTomatoeOGImage {...scoreData} />;
  }

  // report overview data
  const reportOverviewData =
    id === "overview"
      ? parsedData
      : {
          score: ReportsCardMockedData.rottenTomatoeScore.score,
          tvBff: ReportsCardMockedData.tvBFF.name,
          star: ReportsCardMockedData.realStarSign.name,
          title: ReportsCardMockedData.overview.title,
        };

  if (reportOverviewData) {
    return <ReportOverviewOGImage {...reportOverviewData} />;
  }

  // star sign data
  const starSignData =
    id === "starSign"
      ? parsedData
      : {
          name: ReportsCardMockedData.realStarSign.name,
        };

  if (starSignData) {
    return <StarSignOGImage {...starSignData} />;
  }

  // tv bff data
  const tvBFFData =
    id === "tvBff"
      ? parsedData
      : {
          name: ReportsCardMockedData.tvBFF.name,
          imageUrl: ReportsCardMockedData.tvBFF.imageURL,
          show: ReportsCardMockedData.tvBFF.show,
        };
  if (tvBFFData) {
    return <TvBFFOGImage {...tvBFFData} />;
  }

  // most watched tv show data
  const crossoverStar =
    id === "crossoverStar"
      ? parsedData
      : {
          name: TVStatsMockedData.yourCrossoverStar.name,
          imageUrl: TVStatsMockedData.yourCrossoverStar.imageURL,
        };

  if (crossoverStar) {
    return <CrossOverStarOGImage {...crossoverStar} />;
  }

  // total shows data
  const totalShows =
    id === "totalShows"
      ? parsedData
      : {
          count: TVStatsMockedData.totalShows.length,
          images: TVStatsMockedData.totalShows.top.map((show) => show.imageUrl),
        };
  if (totalShows) {
    return <TotalShowOGImage {...totalShows} />;
  }

  // most watched tv show data
  const mostWatched =
    id === "mostWatchedTvShow"
      ? parsedData
      : {
          name: TVStatsMockedData.mostWatchedTvShow.title,
          imageUrl: TVStatsMockedData.mostWatchedTvShow.imageURL,
        };

  if (mostWatched) {
    return <MostWatchedOGImage {...mostWatched} />;
  }

  // first tv show data
  const firstTVShow =
    id === "firstTvShow"
      ? parsedData
      : {
          name: TVStatsMockedData.firstTvShow.title,
          imageUrl: TVStatsMockedData.firstTvShow.imageURL,
        };
  if (firstTVShow) {
    return <FirstTVShowOGImage {...firstTVShow} />;
  }

  // default
  return <BaseOGImage />;
};

export default OGImage;
