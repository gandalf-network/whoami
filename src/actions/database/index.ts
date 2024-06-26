import { UserState } from "@prisma/client";

import { createOrUpdateUsersAIResponse } from "./aiResponses";
import {
  getUsersFirstShow,
  getTop3ShowsByUser,
  getUsersTopShowsByActor,
  getTotalNumberOfShowsWatchedByUser,
  getUsersTopGenres,
  getUserAverageRottenTomatoScore,
} from "./show";
import { findOrCreateUserBySessionID } from "./user";
import { MostWatchedTvShowWithEpisode, UserStats } from "../../types";

export async function getStatsResponse(sessionID: string) {
  const user = await findOrCreateUserBySessionID(sessionID);
  if (
    user.state !== UserState.COMPLETED &&
    user.state !== UserState.STATS_DATA_READY
  ) {
    throw new Error("users data has not been fetched yet");
  }

  const usersFirstShow = await getUsersFirstShow(user.id);
  const usersMostWatchedTVShows = await getTop3ShowsByUser(user.id, false);
  const usersMostWatchedTVShow = usersMostWatchedTVShows[0];
  const topShowsByActor = await getUsersTopShowsByActor(user.id);
  const watchCount = await getTotalNumberOfShowsWatchedByUser(user.id);
  const topGenres = await getUsersTopGenres(user.id, 5);
  const aiResponses = await createOrUpdateUsersAIResponse({ userID: user.id });

  const mostWatchedTvShow: MostWatchedTvShowWithEpisode = {
    ...usersMostWatchedTVShow,
  };

  const stats: UserStats = {
    firstTvShow: {
      show: usersFirstShow,
      quip: aiResponses.firstTVShowQuip ? aiResponses.firstTVShowQuip : "",
    },
    mostWatchedTvShow: {
      show: mostWatchedTvShow,
      quip: aiResponses.mostWatchedTVShowQuip
        ? aiResponses.mostWatchedTVShowQuip
        : "",
    },
    yourCrossoverStar: topShowsByActor,
    watchHistory: {
      totalShowsWatched: watchCount,
      topShows: usersMostWatchedTVShows,
    },
    genreDistribution: {
      genres: topGenres,
      quip: aiResponses.topGenresQuip ? aiResponses.topGenresQuip : "",
    },
  };

  return stats;
}

export async function getReportCardResponse(sessionID: string) {
  const user = await findOrCreateUserBySessionID(sessionID);
  if (user.state !== "COMPLETED") {
    throw new Error("users data has not been fetched yet");
  }

  const aiResponses = await createOrUpdateUsersAIResponse({ userID: user.id });
  const topShows = await getTop3ShowsByUser(user.id);
  const topShow = topShows[0];
  const rtScore = await getUserAverageRottenTomatoScore(user.id);

  const tvBFF = {
    show: topShow.title,
    name: aiResponses.bff,
    reason: aiResponses.bffQuip,
    imageURL: aiResponses.bffImageURL,
  };

  const starSign = {
    name: aiResponses.starSign,
    reason: aiResponses.starSignQuip,
    show: topShow.title,
  };

  const personality = {
    rtScore,
    personality: aiResponses.personality,
    reason: aiResponses.personalityQuip,
  };

  const rottenTomato = {
    rtScore,
    reason: aiResponses.rtScoreQuip,
  };

  return {
    tvBFF,
    starSign,
    personality,
    rottenTomato,
  };
}
