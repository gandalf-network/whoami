import {
  FirstTvShow,
  WatchHistory,
  MostWatchedTvShow,
  YourCrossoverStar,
} from "@/types";

import {
  getTop5EpisodesByUser,
  getTotalNumberOfShowsWatchedByUser,
  getUsersFirstShow,
  getUsersTopShowsByActor,
} from "./show";
import { findOrCreateUserBySessionID } from "./user";

type Stats = {
  firstTvShow: FirstTvShow;
  watchHistory: WatchHistory;
  mostWatchedTvShow: MostWatchedTvShow;
  yourCrossoverStar: YourCrossoverStar;
  // genreDistribution: "[]String";
};

export async function getStats(sessionID: string) {
  const { user, error } = await findOrCreateUserBySessionID(sessionID);
  if (error || !user) {
    return { stats: null, error };
  }

  const { usersFirstShow, error: ufsError } = await getUsersFirstShow(user.id);
  if (ufsError || !usersFirstShow) {
    return { stats: null, error };
  }

  const { topEpisodes, error: teError } = await getTop5EpisodesByUser(user.id);
  if (teError || !topEpisodes) {
    return { stats: null, error };
  }

  const { watchCount, error: wcError } =
    await getTotalNumberOfShowsWatchedByUser(user.id);
  if (wcError || !watchCount) {
    return { stats: null, error };
  }

  const { topShowsForActorByUser, error: t5sError } =
    await getUsersTopShowsByActor(user.id);
  if (t5sError || !topShowsForActorByUser) {
    return { stats: null, error };
  }

  const stats: Stats = {
    firstTvShow: usersFirstShow,
    mostWatchedTvShow: topEpisodes[0],
    yourCrossoverStar: topShowsForActorByUser,
    watchHistory: {
      totalShowsWatched: watchCount,
      topShows: topEpisodes,
    },
  };

  return { stats, error: null };
}

export async function getReportCard(sessionID: string) {}

// Use Redis
export async function getSession(sessionID: string) {
  const { user, error } = await findOrCreateUserBySessionID(sessionID);
  if (user) {
    return {
      session: {
        state: user.state,
      },
      error: null,
    };
  }

  return { session: null, error };
}

export async function startSession(sessionID: string) {}
