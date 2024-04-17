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


interface Show {
    ID: string;
    Title: string;
}

interface ShowPayload {
    SessionID: string;
    ChunksTotal: number;
    Show: Show[];
}

export async function enqueueShowActorsQueue(payload: ShowPayload): Promise<void> {
    try {
        await queryActivitiesQueue.add(queueNames.QueryShowActors, { payload });
        return console.log('Data successfully enqueued');
    } catch (error) {
        console.error('Failed to enqueue data', error);
        throw error;
    }
}