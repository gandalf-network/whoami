import { Actor, ParsedActivity, Show } from "../types";
import { getRottenTomatoScore } from "./api/rottenTomatoes";
import TMDBClient from "./api/tmdb";
import { getReportCardResponse, getStatsResponse } from "./database";
import { createAndConnectActorToShow } from "./database/actor";
import { batchInsertEpisodes, insertEpisodeInput, updateShow, upsertShow, upsertUserShow } from "./database/show";
import { findOrCreateUserBySessionID } from "./database/user";
import Eye, { Source } from "./eyeofsauron";
import {  NetflixActivityMetadata } from "./eyeofsauron/gql/__generated__";
import { parseActivityInput, extractEpisodeNumberFromTitle, parseDate } from "./helpers/parser";
import {  ShowPayload, enqueueRottenTomatoes, enqueueShowData } from "./lib/queue/producers";


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

export async function getAndUpdateRottenTomatoesScore(shows: Show[]) {
    for (const show of shows) {
        let score = await getRottenTomatoScore(show.title)
        await updateShow({id: show.id, rottenTomatoScore: parseInt(score) })
    }
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
        let updatedShow = {
            id: show.id,
            genre: genres,
            title: show.title,
            imageURL:  `https://image.tmdb.org/t/p/w1280/${showDetails.poster_path}` 
        }

        await updateShow(updatedShow)
        updatedShows.push(updatedShow)

        for (const actor of showDetails.aggregate_credits.cast) {
            await createAndConnectActorToShow({
                name: actor.name,
                showID: show.id,
                imageURL:  `https://image.tmdb.org/t/p/w1280/${actor.profile_path}` 
            })
        }
    }
    
    payload.Shows = updatedShows
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

            await enqueueRottenTomatoes(showPayload)
            await enqueueShowData(showPayload)

            page++;
        }
    } catch (error) {
        console.error('Failed to fetch data', error);
        throw error; 
    }
}
