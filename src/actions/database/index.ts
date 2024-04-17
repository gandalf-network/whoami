import { MostWatchedTvShowWithEpisode, UserStats } from "@/types";

import { createOrUpdateUsersAIResponse } from "./aiResponses";
import {
  getUsersFirstShow,
  getTop5ShowsByUser,
  getUsersTopShowsByActor,
  getTotalNumberOfShowsWatchedByUser,
  getUsersTopGenres,
  getUserAverageRottenTomatoScore,
} from "./show";
import { findOrCreateUserBySessionID } from "./user";

export async function getStatsResponse(sessionID: string) {
  const user = await findOrCreateUserBySessionID(sessionID);
  if (user.state !== "COMPLETED") {
    throw new Error("users data has not been fetched yet");
  }

  const usersFirstShow = await getUsersFirstShow(user.id);
  const usersMostWatchedTVShows = await getTop5ShowsByUser(user.id);
  const usersMostWatchedTVShow = usersMostWatchedTVShows[0];
  const topShowsByActor = await getUsersTopShowsByActor(user.id);
  const watchCount = await getTotalNumberOfShowsWatchedByUser(user.id);
  const topGenres = await getUsersTopGenres(user.id);
  const aiResponses = await createOrUpdateUsersAIResponse({ userID: user.id });

  const mostWatchedTvShow: MostWatchedTvShowWithEpisode = {
    ...usersMostWatchedTVShow,
  };

  const stats: UserStats = {
    firstTvShow: {
      show: usersFirstShow,
      quip: aiResponses.firstTVShowQuip as string,
    },
    mostWatchedTvShow: {
      show: mostWatchedTvShow,
      quip: aiResponses.mostRewatchedTVShowQuip as string,
    },
    yourCrossoverStar: topShowsByActor,
    watchHistory: {
      totalShowsWatched: watchCount,
      topShows: usersMostWatchedTVShows,
    },
    genreDistribution: {
      genres: topGenres,
      quip: aiResponses.topGenresQuip as string,
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
  const topShows = await getTop5ShowsByUser(user.id);
  const topShow = topShows[0];
  const rtScore = await getUserAverageRottenTomatoScore(user.id);

  const tvBFF = {
    show: topShow.title,
    name: aiResponses.bff,
    reason: aiResponses.bffQuip,
    imageURL: "",
  };

  const starSign = {
    name: aiResponses.starSign,
    reason: aiResponses.starSignQuip,
  };

  const personality = {
    rtScore,
    personality: aiResponses.personality,
    reason: aiResponses.personalityQuip,
  };

  return {
    tvBFF,
    starSign,
    personality,
  };
}
