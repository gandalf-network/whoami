import { UserState } from "@prisma/client";
import { Actor, ParsedActivity, Show } from "../types";
import { getFirstAndMostRewatchedShowQuips, getStarSign, getTVBFF } from "./api/openai";
import { getPersonalities } from "./api/perplexity";
import { getRottenTomatoScore } from "./api/rottenTomatoes";
import TMDBClient from "./api/tmdb";
import { getReportCardResponse, getStatsResponse } from "./database";
import { createAndConnectActorToShow, findActorByNameAndShow, getActorsByShow, getActorsImageByCharacterNameAndShow } from "./database/actor";
import {  createOrUpdateUsersAIResponse } from "./database/aiResponses";
import { UpdateShowInput, batchInsertEpisodes, getTop5ShowsByUser, getTotalNumberOfShowsWatchedByUser, getUserAverageRottenTomatoScore, getUsersFirstShow, getUsersTopGenres, insertEpisodeInput, updateShow, upsertShow, upsertUserShow } from "./database/show";
import { findOrCreateUserBySessionID, updateUser } from "./database/user";
import Eye, { Source } from "./eyeofsauron";
import {  NetflixActivityMetadata } from "./eyeofsauron/gql/__generated__";
import { parseActivityInput, extractEpisodeNumberFromTitle, parseDate } from "./helpers/parser";
import {  JobShow, ShowPayload, enqueueRottenTomatoes, enqueueShowData } from "./lib/queue/producers";


const eye = new Eye({
    baseURL: process.env.GANDALF_SAURON_URL as string,
    privateKey: process.env.GANDALF_APP_PRIVATE_KEY as string,
});

const tmdbClient = new TMDBClient(
    process.env.TMDB_BASE_URL as string, 
    process.env.TMDB_API_KEY as string
)

export async function findOrCreateUser(sessionID: string) {
  return findOrCreateUserBySessionID(sessionID);
}

export async function getStats(sessionID: string) {
  return getStatsResponse(sessionID);
}

export async function getReportCard(sessionID: string) {
  return getReportCardResponse(sessionID);
}

export async function updateUserStateBySession(sessionID: string, state: UserState) {
    let user = await findOrCreateUserBySessionID(sessionID)
    return await updateUser({state: state, id: user.id});
}

export async function getAndUpdateRottenTomatoesScore(payload: ShowPayload): Promise<number> {
    let processed: number = 0;
    for (const show of payload.Shows) {
        
        let score = await getRottenTomatoScore(show.title, show.actors)
        if(score) {
            await updateShow({id: show.id, rottenTomatoScore: score })
            processed += 1
        }
    }

    return processed
}

export async function getAndUpdateStarSignPicker(sessionID: string): Promise<number>  {
    let user = await findOrCreateUserBySessionID(sessionID)
    let topGenres = await getUsersTopGenres(user.id)
    let averageRottenTomatoesScore = await getUserAverageRottenTomatoScore(user.id)
    let starSigner = await getStarSign(topGenres, averageRottenTomatoesScore)
   
    await createOrUpdateUsersAIResponse({
        ...starSigner,
        rtScoreQuip: starSigner.RTScoreQuip,
        userID: user.id,
    })

    return await getTotalNumberOfShowsWatchedByUser(user.id)
}

export async function getAndUpdateTVBFF(sessionID: string) : Promise<number>  {
    let user = await findOrCreateUserBySessionID(sessionID)
    let topGenres = await getUsersTopGenres(user.id)
    let topShow = await getTop5ShowsByUser(user.id)
    let showActors = await getActorsByShow(topShow[0].id)
    let characters: string[] = showActors.map((actor)=> actor.characterName)

    let characterPersonalities = await getPersonalities(characters.slice(0, 5), topShow[0].title)
    let tvBFF = await getTVBFF(topGenres, characterPersonalities)
    let firstShow = await getUsersFirstShow(user.id)
    let mostRewatchedShowQuips = await getFirstAndMostRewatchedShowQuips(firstShow, topShow)

    let actorImageURL = await getActorsImageByCharacterNameAndShow(
        tvBFF.BFF as string,
        topShow[0].id,
    );

    await createOrUpdateUsersAIResponse({
        ...tvBFF,
        ...mostRewatchedShowQuips,
        bffImageURL: actorImageURL,
        userID: user.id,
    })

    return await getTotalNumberOfShowsWatchedByUser(user.id)
}

export async function getShowData(payload: ShowPayload): Promise<number> {
    let jobShows: JobShow[] = []
    let showActors: Actor[] = []
    let processed: number = 0
    console.log("> Number of shows:", payload?.Shows?.length);

    for (const show of payload.Shows) {
        let showResponse = await tmdbClient.searchTVShows(show.title)
        let showDetails = await tmdbClient.getTVShowDetails(showResponse.results[0].id)
        let genres: string[] = [];

        for (const genre of showDetails.genres) {
            genres.push(genre.name)
        }

        let jobActors: string[] = []
        for (const currentActor of showDetails.aggregate_credits.cast) {
            let actor = {
                name: currentActor.name,
                showID: show.id,
                popularity: currentActor.popularity,
                characterName: (currentActor.roles && currentActor.roles.length > 0) ? currentActor.roles[0].character : "",
                imageURL:  currentActor.profile_path ? `https://image.tmdb.org/t/p/w1280/${currentActor.profile_path}` : ""
            }
            await createAndConnectActorToShow(actor)

            let updatedActor = await findActorByNameAndShow(currentActor.name, show.id)
            showActors.push(updatedActor)
            jobActors.push(currentActor.name)
        }

        let updatedShow: UpdateShowInput = {
            id: show.id,
            genres: genres,
            numberOfEpisodes: showDetails.number_of_episodes,
            summary: showDetails.overview,
            imageURL:  `https://image.tmdb.org/t/p/w1280/${showDetails.poster_path}` 
        }

        await updateShow(updatedShow)

        jobShows.push({
            id: show.id, 
            title: show.title, 
            actors: jobActors,
        })
        processed += 1
    }
    
    payload.Shows = jobShows
    await enqueueRottenTomatoes(payload)
    return processed
}

function generateJobId(pageCount: number, sessionId: string): string {
    return `PC${pageCount}-SID${sessionId}`;
}

export async function getAndDumpActivities(sessionID: string, dataKey: string): Promise<number> {
    let page = 1;
    const limit = 400;
    let total: number = 0;
    try {
        const user = await findOrCreateUserBySessionID(sessionID)
        const seenShows: Record<string, boolean>  = {}
        const jobShows: JobShow[] = []
        const episodes: insertEpisodeInput[] = []
        while (true) {
            const activityResponse = await eye.getActivity({
                dataKey: dataKey,
                source: Source.Netflix,
                limit: limit,
                page: page,
            });

            total = total != 0 ? total : activityResponse.total;
            if (activityResponse.data.length === 0) {
                console.log('No more data to fetch.');
                break; 
            }

            console.log(`Fetched page ${page} with ${activityResponse.data.length} activities.`);
            for (const activity of activityResponse.data) {
                const metadata = activity?.metadata as NetflixActivityMetadata;
                const originalTitle = metadata.title;
                const originalTitleSplit = originalTitle.split(":");
                const title = originalTitleSplit[0];
        
                if (originalTitleSplit.length >= 3) {
                    const parsedActivity: ParsedActivity | null = parseActivityInput(originalTitle);
                    if (!parsedActivity) continue;

                    let updatedTitle = parsedActivity.movieTitle ? parsedActivity.movieTitle : title;
                    let updatedEpisodeNumber = parsedActivity.episodeNumber;
                    let updatedEpisodeTitle = parsedActivity.episodeTitle;

                    if (!parsedActivity.episodeNumber && parsedActivity.episodeTitle ) {
                        [updatedEpisodeNumber, updatedEpisodeTitle] = extractEpisodeNumberFromTitle( parsedActivity.episodeTitle);
                    }
                    
                    let show = await upsertShow(title)
                    let userShow = await upsertUserShow(user.id, show.id)
                    let episode = {
                        title: updatedEpisodeTitle || "",
                        datePlayed: parseDate(metadata.date),
                        userShowID: userShow.id,
                        season: parsedActivity.seasonNumber,
                        episode: updatedEpisodeNumber,
                    }
                    episodes.push(episode)

                    if (!seenShows[title]) {
                        seenShows[title] = true
                        jobShows.push({
                            id: show.id, 
                            title: show.title, 
                            actors: [],
                        })
                    }
                }
            }
            
            await batchInsertEpisodes(episodes)
            let jobId = generateJobId(page, sessionID)

            const showPayload: ShowPayload = {
                SessionID: sessionID,
                Shows: jobShows,
                JobID: jobId,
            };

            await enqueueShowData(showPayload)
            page++;
        }

        return jobShows.length
    } catch (error: any) {
        console.error('Failed to fetch data', error.message);
        throw error; 
    }
}
