import { Actor, ParsedActivity, Show } from "../types";
import { getStarSign, getTVBFF } from "./api/openai";
import { getPersonalities } from "./api/perplexity";
import { getRottenTomatoScore } from "./api/rottenTomatoes";
import TMDBClient from "./api/tmdb";
import { getReportCardResponse, getStatsResponse } from "./database";
import { createAndConnectActorToShow, findActorByNameAndShow } from "./database/actor";
import {  createOrUpdateUsersAIResponse } from "./database/aiResponses";
import { UpdateShowInput, batchInsertEpisodes, getTop5ShowsByUser, getUserAverageRottenTomatoScore, getUsersTopGenres, insertEpisodeInput, updateShow, upsertShow, upsertUserShow } from "./database/show";
import { findOrCreateUserBySessionID } from "./database/user";
import Eye, { Source } from "./eyeofsauron";
import {  NetflixActivityMetadata } from "./eyeofsauron/gql/__generated__";
import { parseActivityInput, extractEpisodeNumberFromTitle, parseDate } from "./helpers/parser";
import {  ShowPayload, enqueueRottenTomatoes, enqueueShowData, enqueueTVBFF } from "./lib/queue/producers";

const eye = new Eye({
    baseURL: process.env.GANDALF_SAURON_URL as string,
    privateKey: process.env.GANDALF_APP_PRIVATE_KEY as string,
});

const tmdbClient = new TMDBClient(
    process.env.TMDB_API_URL as string, 
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

export async function getAndUpdateRottenTomatoesScore(payload: ShowPayload) {
    for (const show of payload.Shows) {
        var actors: string[] = []
        if (show.actors){
            for(const actor of show.actors) {
                actors.push(actor.name)
            }
        }
        let score = await getRottenTomatoScore(show.title, actors)
        if(score) {
            await updateShow({id: show.id, rottenTomatoScore: score })
        }
    }

    // This will be triggered when GET_ACTIVITY, GET_SHOW_DATA & ROTTEN_TOMATOE is done.
    await enqueueTVBFF(payload)
    await enqueueTVBFF(payload)
}

export async function getAndUpdateStarSignPicker(payload: ShowPayload) {
    let user = await findOrCreateUserBySessionID(payload.SessionID)
    let topGenres = await getUsersTopGenres(user.id)
    let averageRottenTomatoesScore = await getUserAverageRottenTomatoScore(user.id)
    let starSign = await getStarSign(topGenres, averageRottenTomatoesScore)
   
    await createOrUpdateUsersAIResponse({
        ...starSign,
        userID: user.id,
    })
}

export async function getAndUpdateTVBFF(payload: ShowPayload) {
    let user = await findOrCreateUserBySessionID(payload.SessionID)
    let topGenres = await getUsersTopGenres(user.id)
    let topShow = await getTop5ShowsByUser(user.id)
    let characterPersonalities = await getPersonalities(topShow[0].title)
    let tvBFF = await getTVBFF(topGenres, characterPersonalities)
    await createOrUpdateUsersAIResponse({
        ...tvBFF,
        userID: user.id,
    })
}

export async function getShowData(payload: ShowPayload) {
    let updatedShows: Show[] = []
    let showActors: Actor[] = []
    for (const show of payload.Shows) {
        let showResponse = await tmdbClient.searchTVShows(show.title)
        let showDetails = await tmdbClient.getTVShowDetails(showResponse.results[0].id)
        let genres: string[] = [];

        for (const genre of showDetails.genres) {
            genres.push(genre.name)
        }

        for (const currentActor of showDetails.aggregate_credits.cast) {
            let actor = {
                name: currentActor.name,
                showID: show.id,
                characterName: currentActor.roles[0].character,
                imageURL:  `https://image.tmdb.org/t/p/w1280/${currentActor.profile_path}` 
            }
            await createAndConnectActorToShow(actor)

            let updatedActor = await findActorByNameAndShow(currentActor.name, show.id)
            showActors.push(updatedActor)
        }

        let updatedShow: Show | UpdateShowInput = {
            id: show.id,
            genres: genres,
            title: show.title,
            actors: show.actors,
            imageURL:  `https://image.tmdb.org/t/p/w1280/${showDetails.poster_path}` 
        }

        await updateShow(updatedShow)
        updatedShows.push(updatedShow)
    }
    
    payload.Shows = updatedShows

    await enqueueRottenTomatoes(payload)
}


export async function getAndDumpActivities(sessionID: string, dataKey: string): Promise<void> {
    let page = 1;
    const limit = 300;
    let total: number = 0;
    
    try {
        const user = await findOrCreateUserBySessionID(sessionID)
        const seenShows: Record<string, boolean>  = {}
        const shows: Show[] = []
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
                        shows.push({id: show.id, title: show.title})
                    }
                }
            }
            
            await batchInsertEpisodes(episodes)

            total = total - (limit - shows.length)
            const showPayload: ShowPayload = {
                SessionID: sessionID,
                ChunksTotal: total,
                Shows: shows
            };

            await enqueueShowData(showPayload)
            page++;
        }
    } catch (error) {
        console.error('Failed to fetch data', error);
        throw error; 
    }
}
