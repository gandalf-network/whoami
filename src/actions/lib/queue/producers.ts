import { Show } from '@/types';
import { crawlRottenTomatoesQueue, queryActivitiesQueue, queryShowDataQueue, queueNames, starSignPickerQueue, tvBFFQueue } from './queues';

export interface ActivityDataPayload {
    sessionID: string;
    dataKey: string;
}

export async function enqueueActivityData(sessionID: string, dataKey: string): Promise<void> {
    try {
        console.log(sessionID, dataKey);
        await queryActivitiesQueue.add(queueNames.QueryActivities, { sessionID, dataKey });
        return console.log('enqueueActivityData: data successfully enqueued');
    } catch (error) {
        console.error('Failed to enqueue data', error);
        throw error;
    }
}

export type ShowPayload = {
    SessionID: string;
    Shows: Show[];
}

export async function enqueueRottenTomatoes(payload: ShowPayload): Promise<void> {
    try {
        await crawlRottenTomatoesQueue.add(queueNames.CrawlRottenTomatoes, { ...payload });
        return console.log('enqueueRottenTomatoes: data successfully enqueued');
    } catch (error) {
        console.error('Failed to enqueue data', error);
        throw error;
    }
}

export async function enqueueShowData(payload: ShowPayload): Promise<void> {
    try {
        await queryShowDataQueue.add(queueNames.QueryShowData, { ...payload });
        return console.log('enqueueShowData: data successfully enqueued');
    } catch (error) {
        console.error('Failed to enqueue data', error);
        throw error;
    }
}


export async function enqueueTVBFF(sessionID: string): Promise<void> {
    try {
        await tvBFFQueue.add(queueNames.TVBFF, { sessionID });
        return console.log('enqueueTVBFF: data successfully enqueued');
    } catch (error) {
        console.error('Failed to enqueue data', error);
        throw error;
    }
}

export async function enqueueStarSignPicker(sessionID: string): Promise<void> {
    try {
        await starSignPickerQueue.add(queueNames.StarSignPicker, { sessionID });
        return console.log('enqueueStarSignPicker: data successfully enqueued');
    } catch (error) {
        console.error('Failed to enqueue data', error);
        throw error;
    }
}