"use server";
import { UserState } from "@prisma/client";

import { handleShowTitleEdgeCases } from "@/helpers/utils";

import {
  getFirstAndMostWatchedShowQuips,
  getStarSign,
  getTVBFF,
} from "./api/openai";
import { getPersonalities } from "./api/perplexity";
import { getRottenTomatoScore } from "./api/rottenTomatoes";
import TMDBClient, { TVShowDetails } from "./api/tmdb";
import TVDBClient from "./api/tvdb";
import { getReportCardResponse, getStatsResponse } from "./database";
import {
  getActorsByShow,
  getActorsImageByCharacterNameAndShow,
  createActorsAndConnectToShow,
} from "./database/actor";
import { createOrUpdateUsersAIResponse } from "./database/aiResponses";
import {
  UpdateShowInput,
  batchInsertEpisodes,
  getNumberOfUpdatedShowsByUser,
  getNumberOfUpdatedTomatoeScores,
  getTop3ShowsByUser,
  getTotalNumberOfShowsWatchedByUser,
  getUserAverageRottenTomatoScore,
  getUsersFirstShow,
  getUsersTopGenres,
  insertEpisodeInput,
  updateShow,
  upsertShow,
  upsertUserShow,
} from "./database/show";
import {
  createUserBySessionID,
  findOrCreateUserBySessionID,
  findUserBySessionID,
  updateUser,
  upsertUser,
} from "./database/user";
import Eye, { Source } from "./eyeofsauron";
import { NetflixActivityMetadata } from "./eyeofsauron/gql/__generated__";
import {
  JobShow,
  ShowPayload,
  enqueueRottenTomatoes,
  enqueueShowData,
} from "./lib/queue/producers";
import { TVDB_API_KEY } from "../helpers/constants";
import {
  parseActivityInput,
  extractEpisodeNumberFromTitle,
  parseDate,
} from "../helpers/parser";
import { ActorInput, ParsedActivity, Show } from "../types";

const eye = new Eye({
  baseURL: process.env.GANDALF_SAURON_URL as string,
  privateKey: process.env.GANDALF_PRIVATE_KEY as string,
});

const tmdbClient = new TMDBClient(
  process.env.TMDB_BASE_URL as string,
  process.env.TMDB_API_KEY as string,
);

const tvdbClient = new TVDBClient();

export async function createUser(sessionID: string) {
  console.log(sessionID);
  return createUserBySessionID(sessionID);
}

export async function findUser(sessionID: string) {
  return findUserBySessionID(sessionID);
}

export async function findOrCreateUser(sessionID: string) {
  try {
    const user = await findUser(sessionID);
    if (!user) {
      return createUser(sessionID);
    }

    return user;
  } catch (error: any) {
    throw error;
  }
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
  const fetchPromises = payload.Shows.map(async (show) => {
    try {
      const score = await getRottenTomatoScore(show.title, show.actors);
      if (score != null) {
        await updateShow({ id: show.id, rottenTomatoScore: score });
        return 1;
      } else {
        return 0;
      }
    } catch (error: any) {
      console.log(
        `RottenTomatoesScore: title ${show.title} failed with error: `,
        error,
      );
      return 0;
    }
  });

  const results = await Promise.allSettled(fetchPromises);

  const fulfilledCount = results.filter(
    (result) => result.status === "fulfilled",
  ).length;

  return fulfilledCount;
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

export async function getAndUpdateTVShowQuips(
  sessionID: string,
): Promise<number> {
  const user = await findOrCreateUserBySessionID(sessionID);
  const topShow = await getTop3ShowsByUser(user.id, false);
  const firstShow = await getUsersFirstShow(user.id);

  const mostWatchedShowQuips = await getFirstAndMostWatchedShowQuips(
    firstShow,
    topShow,
  );

  await createOrUpdateUsersAIResponse({
    ...mostWatchedShowQuips,
    userID: user.id,
  });

  return await getTotalNumberOfShowsWatchedByUser(user.id);
}

export async function getAndUpdateTVBFF(sessionID: string): Promise<number> {
  const user = await findOrCreateUserBySessionID(sessionID);
  const topGenres = await getUsersTopGenres(user.id);
  const topShow = await getTop3ShowsByUser(user.id);
  let showActors = await getActorsByShow(topShow[0].id);
  showActors = showActors.slice(0, 5);
  const characters: string[] = showActors.map((actor) => actor.characterName);

  const characterPersonalities = await getPersonalities(
    characters,
    topShow[0].title,
  );
  const tvBFF = await getTVBFF(topGenres, characterPersonalities);

  const actorImageURL = await getActorsImageByCharacterNameAndShow(
    tvBFF.BFF as string,
    topShow[0].id,
  );

  await createOrUpdateUsersAIResponse({
    ...tvBFF,
    bffImageURL: actorImageURL,
    userID: user.id,
  });

  return await getTotalNumberOfShowsWatchedByUser(user.id);
}

export async function getShowDataWithTVDB(
  payload: ShowPayload,
): Promise<number> {
  const jobShows: JobShow[] = [];
  let processed: number = 0;
  console.log("> Number of shows:", payload?.Shows?.length);

  for (const show of payload.Shows) {
    try {
      await tvdbClient.login(TVDB_API_KEY);
      show.title = handleShowTitleEdgeCases(show.title);
      const showResponse = await tvdbClient.searchTVShows(show.title);
      const showDetails = await tvdbClient.getTVShowDetails(
        showResponse[0].tvdb_id,
      );
      const genres: string[] = [];

      for (const genre of showDetails.genres) {
        genres.push(genre);
      }

      await createActorsAndConnectToShow(showDetails.actors, show.id);

      const updatedShow: UpdateShowInput = {
        id: show.id,
        genres,
        numberOfEpisodes: showDetails.episodeCount,
        summary: showDetails.summary,
        imageURL: showDetails.imageURL,
      };

      await updateShow(updatedShow);

      jobShows.push({
        id: show.id,
        title: show.title,
        actors: showDetails.actorNames,
      });
      processed += 1;
    } catch (error: any) {
      console.log(
        `getShowDataWithTVDB: show  title ${show.title} failed with error: `,
        error,
      );
    }
  }

  payload.Shows = jobShows;
  await enqueueRottenTomatoes(payload);
  return processed;
}

export async function preloadTopShowsData(sessionID: string) {
  const user = await findOrCreateUserBySessionID(sessionID);
  const topShows = await getTop3ShowsByUser(user.id, false);
  const firstShow = await getUsersFirstShow(user.id);

  const shows = [...topShows, firstShow];
  const jobShows: JobShow[] = shows.map((show) => {
    return {
      id: show.id,
      title: show.title,
      actors: [],
    };
  });

  const payload: ShowPayload = {
    SessionID: sessionID,
    Shows: jobShows,
    ProceedNext: false,
    JobID: "",
  };

  await getShowData(payload);
}

export async function getShowData(payload: ShowPayload): Promise<number> {
  let processed = 0;
  console.log("> Number of shows:", payload?.Shows?.length);

  const queryShowPromises = payload.Shows.map(async (show) => {
    try {
      show.title = handleShowTitleEdgeCases(show.title);
      const showResponse = await tmdbClient.searchTVShows(show.title);
      if (showResponse.results.length === 0) {
        throw new Error(`No results found for title: ${show.title}`);
      }

      const showId = showResponse.results[0].id;
      const showDetails = await tmdbClient.getTVShowDetails(showId);
      return { show, showDetails };
    } catch (error) {
      console.error(
        `Search failed for show title: ${show.title}, error:`,
        error,
      );
      return null;
    }
  });

  const fetchedShows = (await Promise.all(queryShowPromises)).filter(
    Boolean,
  ) as { show: JobShow; showDetails: TVShowDetails }[];

  for (const { show, showDetails } of fetchedShows) {
    try {
      const genres: string[] = showDetails.genres.map((genre) => genre.name);
      const actors: ActorInput[] = [];
      const actorNames: string[] = [];

      for (const currentActor of showDetails.aggregate_credits.cast) {
        const actor = {
          name: currentActor.name,
          popularity: currentActor.popularity,
          totalEpisodeCount: currentActor.total_episode_count ?? 0,
          characterName: currentActor.roles?.[0]?.character ?? "",
          imageURL: currentActor.profile_path
            ? `https://image.tmdb.org/t/p/w1280/${currentActor.profile_path}`
            : "",
        };
        actors.push(actor);
        actorNames.push(currentActor.name);
      }

      // Retry logic for creating actors and connecting them to the show
      let retryAttempts = 3;
      const retryDelay = 2000;
      let success = false;

      while (!success && retryAttempts > 0) {
        try {
          await createActorsAndConnectToShow(actors, show.id);
          success = true;
        } catch (error: any) {
          if (
            error.message.includes("deadlock detected") &&
            retryAttempts > 1
          ) {
            console.warn(
              `Deadlock detected for show ${show.title}. Retrying... (${3 - retryAttempts + 1}/3)`,
            );
            await new Promise((resolve) => setTimeout(resolve, retryDelay));
          } else {
            console.error(
              `Failed to process actors for show ${show.title}:`,
              error,
            );
            break;
          }
        }
        retryAttempts--;
      }

      const updatedShow: UpdateShowInput = {
        id: show.id,
        genres,
        numberOfEpisodes: showDetails.number_of_episodes,
        summary: showDetails.overview,
        imageURL: `https://image.tmdb.org/t/p/w1280/${showDetails.poster_path}`,
      };
      await updateShow(updatedShow);

      processed++;
      show.actors = actorNames;
    } catch (error) {
      console.error(
        `getShowData: show title ${show.title} failed with error:`,
        error,
      );
    }
  }

  payload.Shows = fetchedShows.map(({ show }) => show);

  if (payload.ProceedNext) {
    try {
      await enqueueRottenTomatoes(payload);
    } catch (error) {
      console.error(`Failed to enqueue Rotten Tomatoes data:`, error);
    }
  }

  return processed;
}

export async function getShowDataWithTMDB(shows: Show[]): Promise<number> {
  const queryShowPromises = shows.map(async (show) => {
    try {
      show.title = handleShowTitleEdgeCases(show.title);
      const showResponse = await tmdbClient.searchTVShows(show.title);
      if (showResponse.results.length === 0) {
        throw new Error(`No results found for title: ${show.title}`);
      }

      const showId = showResponse.results[0].id;
      const showDetails = await tmdbClient.getTVShowDetails(showId);
      return { show, showDetails };
    } catch (error) {
      console.log(`Search failed for show title: ${show.title}, error:`, error);
      return null;
    }
  });

  const fetchedShows = (await Promise.all(queryShowPromises)).filter(
    Boolean,
  ) as { show: Show; showDetails: TVShowDetails }[];
  const saveShowPromises = fetchedShows.map(async ({ show, showDetails }) => {
    try {
      const genres: string[] = showDetails.genres.map((genre) => genre.name);
      const actors: ActorInput[] = [];
      const actorNames: string[] = [];

      for (const currentActor of showDetails.aggregate_credits.cast) {
        const actor = {
          name: currentActor.name,
          popularity: currentActor.popularity,
          totalEpisodeCount: currentActor.total_episode_count ?? 0,
          characterName: currentActor.roles?.[0]?.character ?? "",
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

      return {
        id: show.id,
        title: show.title,
        actors: actorNames,
      };
    } catch (error) {
      console.log(
        `getShowData: show title ${show.title} failed with error:`,
        error,
      );
      return null;
    }
  });

  const results = (await Promise.all(saveShowPromises)).filter(Boolean);

  return results.length;
}

function generateJobId(
  pageCount: number,
  chunkNumber: number,
  sessionId: string,
): string {
  return `PC${pageCount}-CN${chunkNumber}-SID${sessionId}`;
}

export async function getAndDumpActivities(
  sessionID: string,
  dataKey: string,
): Promise<number[]> {
  const limit = 500;
  const chunkLimit = 50;
  let totalChunks = 0;
  let totalShows = 0;
  try {
    const user = await upsertUser(sessionID, dataKey);

    const seenShows = new Map<string, { showId: string; userShowId: string }>();
    const episodes: insertEpisodeInput[] = [];
    const jobShows: Map<string, JobShow> = new Map();

    console.log(
      "\n..............Started Fetching Data......................\n",
    );
    const startTime = performance.now();

    // Fetch initial page to get the total number of pages
    const initialActivityResponse = await eye.getActivity({
      dataKey,
      source: Source.Netflix,
      limit,
      page: 1,
    });

    const total = initialActivityResponse.total;
    if (initialActivityResponse.data.length === 0) {
      console.log("No data to fetch.");
      return [0, 0];
    }

    // Fetch all pages concurrently
    const totalPages = Math.ceil(total / limit);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    const pageResults = await Promise.all(
      pageNumbers.map(async (page) => {
        if (page === 1) {
          return initialActivityResponse;
        } else {
          return eye.getActivity({
            dataKey,
            source: Source.Netflix,
            limit,
            page,
          });
        }
      }),
    );

    const midTime = performance.now();
    console.log(
      `> Before processing data: took ${(midTime - startTime) / 1000} seconds.`,
    );

    for (const activityResponse of pageResults) {
      for (const activity of activityResponse.data) {
        const metadata = activity?.metadata as NetflixActivityMetadata;
        const originalTitle = metadata.title;
        const originalTitleSplit = originalTitle.split(":");
        const title = originalTitleSplit[0];

        const parsedActivity = parseActivityInput(originalTitle);
        if (!parsedActivity) continue;

        const updatedTitle = parsedActivity.movieTitle ?? title;
        let {
          episodeNumber: updatedEpisodeNumber,
          episodeTitle: updatedEpisodeTitle,
        } = parsedActivity;

        if (!parsedActivity.episodeNumber && parsedActivity.episodeTitle) {
          [updatedEpisodeNumber, updatedEpisodeTitle] =
            extractEpisodeNumberFromTitle(parsedActivity.episodeTitle);
        }

        // Cache shows to avoid repetitive upsertShow calls
        if (!seenShows.has(updatedTitle)) {
          const show = await upsertShow(updatedTitle);
          const userShow = await upsertUserShow(user.id, show.id);
          seenShows.set(updatedTitle, {
            showId: show.id,
            userShowId: userShow.id,
          });
          jobShows.set(updatedTitle, {
            id: show.id,
            title: show.title,
            actors: [],
          });
        }

        const { userShowId } = seenShows.get(updatedTitle)!;

        episodes.push({
          title: updatedEpisodeTitle || "",
          datePlayed: parseDate(metadata.date),
          userShowID: userShowId,
          season: parsedActivity.seasonNumber,
          episode: updatedEpisodeNumber,
        });
      }
    }

    if (episodes.length > 0) {
      await batchInsertEpisodes(episodes);
    }

    // Chunk and enqueue job shows
    const jobChunks = chunkShows(Array.from(jobShows.values()), chunkLimit);
    for (let chunkIndex = 0; chunkIndex < jobChunks.length; chunkIndex++) {
      const currentChunk = jobChunks[chunkIndex];
      const jobId = generateJobId(1, chunkIndex, sessionID);
      const showPayload: ShowPayload = {
        SessionID: sessionID,
        Shows: currentChunk,
        ProceedNext: true,
        JobID: jobId,
      };
      await enqueueShowData(showPayload);
      totalChunks++;
    }
    totalShows = jobShows.size;

    console.log("\n............Data Fetching Complete......................\n");
    const finalTime = performance.now();
    console.log(
      `> After processing data: took ${(finalTime - startTime) / 1000} seconds.`,
    );

    return [totalShows, totalChunks];
  } catch (error: any) {
    await updateUserStateBySession(sessionID, UserState.FAILED);
    console.error(`Failed to fetch data for user ${sessionID}`, error.message);
    throw error;
  }
}

function chunkShows<T>(shows: T[], chunkSize: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < shows.length; i += chunkSize) {
    chunks.push(shows.slice(i, i + chunkSize));
  }
  return chunks;
}
