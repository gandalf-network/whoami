import { getReportCardResponse, getStatsResponse } from "./database";
import { findOrCreateUserBySessionID } from "./database/user";
import Eye, { Source } from "./eyeofsauron";
import {  NetflixActivityMetadata } from "./eyeofsauron/gql/__generated__";


const eye = new Eye({
    baseURL: process.env.GANDALF_SAURON_URL as string,
    privateKey: process.env.GANDALF_APP_PRIVATE_KEY as string,
});

export async function findOrCreateUser(sessionID: string) {
  return findOrCreateUserBySessionID(sessionID);
}

export async function getStats(sessionID: string) {
  return getStatsResponse(sessionID);
}

export async function getReportCard(sessionID: string) {
  return getReportCardResponse(sessionID);
}

interface Episode {
    ActivityID: string;
    Season: number | null;
    Episode: number | null;
    EpisodeTitle: string | null;
}

interface Show {
    Title: string;
    OriginalTitle: string;
    Episodes: Episode[];
}

export async function processUserActivities(sessionID: string, dataKey: string): Promise<void> {
    let page = 1;
    const limit = 300;
    
    try {
        const user = await findOrCreateUserBySessionID(sessionID)

        while (true) {
            const activityResponse = await eye.getActivity({
                dataKey: dataKey,
                source: Source.Netflix,
                limit: limit,
                page: page,
            });

            if (activityResponse.data.length === 0) {
                console.log('No more data to fetch.');
                break; 
            }

            console.log(`Fetched page ${page} with ${activityResponse.data.length} activities.`);
            for (const activity of activityResponse.data) {
                const metadata = activity?.metadata as NetflixActivityMetadata;
                const originalTitle = metadata.title;
                const originalTitleSplit = originalTitle.split(":");
        
                if (originalTitleSplit.length >= 3) {
                    
                }
            }
            // Bulk Insert...
            
            // Move to Next Workflow for this chunk (300)...
            page++; 
        }
    } catch (error) {
        console.error('Failed to fetch data', error);
        throw error; 
    }
}
