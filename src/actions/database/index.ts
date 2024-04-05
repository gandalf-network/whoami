import { MostWatchedTvShowWithEpisode, UserStats } from "@/types";

import {
  getTop5ShowsByUser,
  getTotalNumberOfShowsWatchedByUser,
  getUsersFirstShow,
  getUsersMostWatchedEpisodeByShow,
  getUsersTopShowsByActor,
} from "./show";
import { findOrCreateUserBySessionID } from "./user";

export async function getStats(sessionID: string) {
  const { user, error } = await findOrCreateUserBySessionID(sessionID);
  if (error || !user) {
    return { stats: null, error };
  }

  const { usersFirstShow, error: usersFirstShowError } =
    await getUsersFirstShow(user.id);
  if (usersFirstShowError || !usersFirstShow) {
    return { stats: null, error };
  }

  const { topShows, error: topShowsError } = await getTop5ShowsByUser(user.id);
  if (topShowsError || !topShows) {
    return { stats: null, error };
  }

  const { topEpisode, error: topEpisodeError } =
    await getUsersMostWatchedEpisodeByShow(user.id, topShows[0].id);
  if (topEpisodeError || !topEpisode) {
    return { stats: null, error };
  }

  const { watchCount, error: watchCountError } =
    await getTotalNumberOfShowsWatchedByUser(user.id);
  if (watchCountError || !watchCount) {
    return { stats: null, error };
  }

  const { topShowsForActorByUser, error: topShowsForActorByUserError } =
    await getUsersTopShowsByActor(user.id);
  if (topShowsForActorByUserError || !topShowsForActorByUser) {
    return { stats: null, error };
  }

  const mostWatchedTvShow: MostWatchedTvShowWithEpisode = {
    ...topShows[0],
    ...topEpisode,
  };

  const stats: UserStats = {
    firstTvShow: usersFirstShow,
    mostWatchedTvShow,
    yourCrossoverStar: topShowsForActorByUser,
    watchHistory: {
      totalShowsWatched: watchCount,
      topShows,
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
