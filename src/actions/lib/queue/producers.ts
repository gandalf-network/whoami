import { Show } from '../../../types';
import { queryActivitiesQueue, queueNames } from './queues';

export async function enqueueActivityData(sessionID: string, dataKey: string): Promise<void> {
    try {
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
        await queryActivitiesQueue.add(queueNames.CrawlRottenTomatoes, { payload });
        return console.log('Data successfully enqueued');
    } catch (error) {
        console.error('Failed to enqueue data', error);
        throw error;
    }
}

export async function enqueueShowData(payload: ShowPayload): Promise<void> {
    try {
        await queryActivitiesQueue.add(queueNames.QueryShowData, { payload });
        return console.log('Data successfully enqueued');
    } catch (error) {
        console.error('Failed to enqueue data', error);
        throw error;
    }
}

export async function enqueueTVBFF(payload: ShowPayload): Promise<void> {
    try {
        await queryActivitiesQueue.add(queueNames.TVBFF, { payload });
        return console.log('Data successfully enqueued');
    } catch (error) {
        console.error('Failed to enqueue data', error);
        throw error;
    }
}