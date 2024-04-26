import { crawlRottenTomatoesQueue, queryActivitiesQueue, queryShowDataQueue, queueNames, starSignPickerQueue, tvBFFQueue } from './queues';

export interface ActivityDataPayload {
    sessionID: string;
    dataKey: string;
}

export async function enqueueActivityData(sessionID: string, dataKey: string): Promise<void> {
    try {
        await queryActivitiesQueue.add(queueNames.QueryActivities, { sessionID, dataKey }, { jobId: sessionID});
        return console.log('enqueueActivityData: data successfully enqueued');
    } catch (error) {
        console.error('Failed to enqueue data', error);
        throw error;
    }
}

export type JobShow = {
    id: string;
    title: string;
    actors: string[]
}

export type ShowPayload = {
    SessionID: string;
    Shows: JobShow[];
    JobID: string;
}

export async function enqueueRottenTomatoes(payload: ShowPayload): Promise<void> {
    try {
        console.log(payload)
        await crawlRottenTomatoesQueue.add(queueNames.CrawlRottenTomatoes, { ...payload }, { jobId: payload.JobID});
        return console.log('enqueueRottenTomatoes: data successfully enqueued');
    } catch (error) {
        console.error('enqueueRottenTomatoes: Failed to enqueue data', error);
        throw error;
    }
}

export async function enqueueShowData(payload: ShowPayload): Promise<void> {
    try {
        await queryShowDataQueue.add(queueNames.QueryShowData, { ...payload }, { jobId: payload.JobID});
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