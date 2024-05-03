"use server";

import { UserState } from "@prisma/client";

import {
  getFirstAndMostRewatchedShowQuips,
  getStarSign,
  getTVBFF,
} from "./api/openai";
import { getPersonalities } from "./api/perplexity";
import { getRottenTomatoScore } from "./api/rottenTomatoes";
import TMDBClient from "./api/tmdb";
import { getReportCardResponse, getStatsResponse } from "./database";
import {
  ActorInput,
  createActorsAndConnectToShow,
  getActorsByShow,
  getActorsImageByCharacterNameAndShow,
} from "./database/actor";
import { createOrUpdateUsersAIResponse } from "./database/aiResponses";
import {
  UpdateShowInput,
  batchInsertEpisodes,
  getNumberOfUpdatedShowsByUser,
  getNumberOfUpdatedTomatoeScores,
  getTop5ShowsByUser,
  getTotalNumberOfShowsWatchedByUser,
  getUserAverageRottenTomatoScore,
  getUsersFirstShow,
  getUsersTopGenres,
  insertEpisodeInput,
  updateShow,
  upsertShow,
  upsertUserShow,
} from "./database/show";
import { findOrCreateUserBySessionID, updateUser, findOrCreateUpsert } from "./database/user";
import Eye, { Source } from "./eyeofsauron";
import { NetflixActivityMetadata } from "./eyeofsauron/gql/__generated__";
import {
  parseActivityInput,
  extractEpisodeNumberFromTitle,
  parseDate,
} from "./helpers/parser";
import {
  JobShow,
  ShowPayload,
  enqueueRottenTomatoes,
  enqueueShowData,
} from "./lib/queue/producers";
import { ParsedActivity } from "../types";

const eye = new Eye({
  baseURL: process.env.GANDALF_SAURON_URL as string,
  privateKey: process.env.GANDALF_PRIVATE_KEY as string,
});

const tmdbClient = new TMDBClient(
  process.env.TMDB_BASE_URL as string,
  process.env.TMDB_API_KEY as string,
);

export async function findOrCreateUser(sessionID: string) {
  return findOrCreateUserBySessionID(sessionID);
}

export async function getStats(sessionID: string) {
  return getStatsResponse(sessionID);
}

export async function getReportCard(sessionID: string) {
  return getReportCardResponse(sessionID);
}

export async function updateUserStateBySession(
  sessionID: string,
  state: UserState,
) {
  const user = await findOrCreateUserBySessionID(sessionID);
  return await updateUser({ state, id: user.id });
}

export async function getAndUpdateRottenTomatoesScore(
  payload: ShowPayload,
): Promise<number> {
  const user = await findOrCreateUserBySessionID(payload.SessionID);
  let processed: number = 0;
  for (const show of payload.Shows) {
    try {
      const score = await getRottenTomatoScore(show.title, show.actors);
      if (score != null) {
        await updateShow({ id: show.id, rottenTomatoScore: score });
        processed += 1;
      }
    } catch (error: any) {
      console.log(
        `RottenTomatoesScore: title ${show.title} failed with error: `,
        error,
      );
    }
  }

  return await getNumberOfUpdatedTomatoeScores(user.id);
}

export async function getCompletedShowDataBySession(
  sessionID: string,
): Promise<number> {
  const user = await findOrCreateUserBySessionID(sessionID);
  return getNumberOfUpdatedShowsByUser(user.id);
}

export async function getAndUpdateStarSignPicker(
  sessionID: string,
): Promise<number> {
  const user = await findOrCreateUserBySessionID(sessionID);
  const topGenres = await getUsersTopGenres(user.id);
  const averageRottenTomatoesScore = await getUserAverageRottenTomatoScore(
    user.id,
  );
  const starSigner = await getStarSign(topGenres, averageRottenTomatoesScore);

  await createOrUpdateUsersAIResponse({
    ...starSigner,
    rtScoreQuip: starSigner.RTScoreQuip,
    userID: user.id,
  });

  return await getTotalNumberOfShowsWatchedByUser(user.id);
}

export async function getAndUpdateTVBFF(sessionID: string): Promise<number> {
  const user = await findOrCreateUserBySessionID(sessionID);
  const topGenres = await getUsersTopGenres(user.id);
  const topShow = await getTop5ShowsByUser(user.id);
  const showActors = await getActorsByShow(topShow[0].id);
  const characters: string[] = showActors.map((actor) => actor.characterName);

  const characterPersonalities = await getPersonalities(
    characters.slice(0, 5),
    topShow[0].title,
  );
  const tvBFF = await getTVBFF(topGenres, characterPersonalities);
  const firstShow = await getUsersFirstShow(user.id);
  const mostRewatchedShowQuips = await getFirstAndMostRewatchedShowQuips(
    firstShow,
    topShow,
  );

  const actorImageURL = await getActorsImageByCharacterNameAndShow(
    tvBFF.BFF as string,
    topShow[0].id,
  );

  await createOrUpdateUsersAIResponse({
    ...tvBFF,
    ...mostRewatchedShowQuips,
    bffImageURL: actorImageURL,
    userID: user.id,
  });

  return await getTotalNumberOfShowsWatchedByUser(user.id);
}

export async function getShowData(payload: ShowPayload): Promise<number> {
  const jobShows: JobShow[] = [];
  let processed: number = 0;
  console.log("> Number of shows:", payload?.Shows?.length);

  for (const show of payload.Shows) {
    try {
      const showResponse = await tmdbClient.searchTVShows(show.title);
      const showDetails = await tmdbClient.getTVShowDetails(
        showResponse.results[0].id,
      );
      const genres: string[] = [];

      for (const genre of showDetails.genres) {
        genres.push(genre.name);
      }

      const actorNames: string[] = [];
      const actors: ActorInput[] = [];
      for (const currentActor of showDetails.aggregate_credits.cast) {
        const actor = {
          name: currentActor.name,
          popularity: currentActor.popularity,
          characterName:
            currentActor.roles && currentActor.roles.length > 0
              ? currentActor.roles[0].character
              : "",
          imageURL: currentActor.profile_path
            ? `https://image.tmdb.org/t/p/w1280/${currentActor.profile_path}`
            : "",
        };
        actors.push(actor);
        actorNames.push(currentActor.name);
      }
      await createActorsAndConnectToShow(actors, show.id);

      const updatedShow: UpdateShowInput = {
        id: show.id,
        genres,
        numberOfEpisodes: showDetails.number_of_episodes,
        summary: showDetails.overview,
        imageURL: `https://image.tmdb.org/t/p/w1280/${showDetails.poster_path}`,
      };

      await updateShow(updatedShow);

      jobShows.push({
        id: show.id,
        title: show.title,
        actors: actorNames,
      });
      processed += 1;
    } catch (error: any) {
      console.log(
        `getShowData: show  title ${show.title} failed with error: `,
        error,
      );
    }
  }

  payload.Shows = jobShows;
  await enqueueRottenTomatoes(payload);
  return processed;
}

function generateJobId(pageCount: number, sessionId: string): string {
  return `PC${pageCount}-SID${sessionId}`;
}

export async function getAndDumpActivities(
  sessionID: string,
  dataKey: string,
): Promise<number[]> {
  const limit = 400;
  let total: number = 0;
  try {
    const user = await findOrCreateUpsert(sessionID, dataKey);
    const seenShows: Set<string> = new Set();
    const episodes: insertEpisodeInput[] = [];

    const initialActivityResponse = await eye.getActivity({
      dataKey,
      source: Source.Netflix,
      limit,
      page: 1,
    });

    total = initialActivityResponse.total;
    if (initialActivityResponse.data.length === 0) {
      console.log("No data to fetch.");
      return [0,0];
    }

    const totalPages = Math.ceil(total / limit);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    // Parallel fetch of all pages
    const fetchPromises = pageNumbers.map((page) =>
      eye.getActivity({ dataKey, source: Source.Netflix, limit, page }),
    );
    const pageResults = await Promise.all(fetchPromises);

    let totalShows = 0;
    for (const activityResponse of pageResults) {
      const jobShows: JobShow[] = [];
      for (const activity of activityResponse.data) {
        const metadata = activity?.metadata as NetflixActivityMetadata;
        const originalTitle = metadata.title;
        const originalTitleSplit = originalTitle.split(":");
        const title = originalTitleSplit[0];

        if (originalTitleSplit.length >= 3) {
          const parsedActivity: ParsedActivity | null =
            parseActivityInput(originalTitle);
          if (!parsedActivity) continue;

          const updatedTitle = parsedActivity.movieTitle
            ? parsedActivity.movieTitle
            : title;
          let updatedEpisodeNumber = parsedActivity.episodeNumber;
          let updatedEpisodeTitle = parsedActivity.episodeTitle;

          if (!parsedActivity.episodeNumber && parsedActivity.episodeTitle) {
            [updatedEpisodeNumber, updatedEpisodeTitle] =
              extractEpisodeNumberFromTitle(parsedActivity.episodeTitle);
          }

          const show = await upsertShow(title);
          const userShow = await upsertUserShow(user.id, show.id);

          const episode = {
            title: updatedEpisodeTitle || "",
            datePlayed: parseDate(metadata.date),
            userShowID: userShow.id,
            season: parsedActivity.seasonNumber,
            episode: updatedEpisodeNumber,
          };
          episodes.push(episode);

          if (!seenShows.has(title)) {
            seenShows.add(title);
            jobShows.push({
              id: show.id,
              title: show.title,
              actors: [],
            });
          }
        }
      }

      if (jobShows.length > 0) {
        await batchInsertEpisodes(episodes);
        episodes.length = 0;

        const jobId = generateJobId(activityResponse.page, sessionID);
        const showPayload: ShowPayload = {
          SessionID: sessionID,
          Shows: jobShows,
          JobID: jobId,
        };
        await enqueueShowData(showPayload);
        totalShows += jobShows.length;
      }
    }
    return [totalShows, totalPages];
  } catch (error: any) {
    console.error("Failed to fetch data", error.message);
    throw error;
  }
}
