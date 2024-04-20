import { Show } from '../../../types';
import { crawlRottenTomatoesQueue, queryActivitiesQueue, queryShowDataQueue, queueNames, starSignPickerQueue, tvBFFQueue } from './queues';

export interface ActivityDataPayload {
    sessionID: string;
    dataKey: string;
}

export async function enqueueActivityData(sessionID: string, dataKey: string): Promise<void> {
    try {
        console.log(sessionID, dataKey);
        await queryActivitiesQueue.add(queueNames.QueryActivities, { sessionID, dataKey });
        return console.log('Data successfully enqueued');
    } catch (error) {
        console.error('Failed to enqueue data', error);
        throw error;
    }
}

export type ShowPayload = {
    SessionID: string;
    ChunksTotal: number;
    Shows: Show[];
}

export async function enqueueRottenTomatoes(payload: ShowPayload): Promise<void> {
    try {
        await crawlRottenTomatoesQueue.add(queueNames.CrawlRottenTomatoes, { ...payload });
        return console.log('data successfully enqueued');
    } catch (error) {
        console.error('Failed to enqueue data', error);
        throw error;
    }
}

export async function enqueueShowData(payload: ShowPayload): Promise<void> {
    try {
        await queryShowDataQueue.add(queueNames.QueryShowData, { ...payload });
        return console.log('data successfully enqueued');
    } catch (error) {
        console.error('Failed to enqueue data', error);
        throw error;
    }
}

export async function enqueueTVBFF(payload: ShowPayload): Promise<void> {
    try {
        await tvBFFQueue.add(queueNames.TVBFF, { ...payload });
        return console.log('data successfully enqueued');
    } catch (error) {
        console.error('Failed to enqueue data', error);
        throw error;
    }
}

export async function enqueueStarSignPicker(payload: ShowPayload): Promise<void> {
    try {
        await starSignPickerQueue.add(queueNames.StarSignPicker, { ...payload });
        return console.log('data successfully enqueued');
    } catch (error) {
        console.error('Failed to enqueue data', error);
        throw error;
    }
}