/**
 * State Tracking in Workflow:
 * 
 * The state tracking workflow is designed to track the processing state of various jobs within a series of queues,
 * each uniquely identified by a `sessionId`. This `sessionId` acts as a unique identifier for a collection of tasks,
 * for a specific user activities analysis, allowing for efficient monitoring, tracking, and aggregation
 * of job statuses across different stages of the processing workflow. The state of each job is
 * dynamically updated to reflect its current state, enabling real-time monitoring and control over
 * the workflow execution.
 * 
 * The workflow utilizes a predefined set of states (`QUEUE_STATES`) to categorize the status of each job:
 * - NOT_INITIATED: The job has been identified but not yet started.
 * - PROCESSING: The job is currently in progress.
 * - COMPLETED: The job has finished successfully.
 * - ERROR: The job encountered an error during processing.
 * 
 * Queue state data include:
 * - `key:sessionId`: A string that serves as the unique identifier for a group of related jobs which is specific to a user within a queue.
 * - `value:state`: A value from `QUEUE_STATES` that represents the job's current status.
 */

import { kv } from "@vercel/kv";

export const QUEUE_STATES = {
  NOT_INITIATED: 'NOT_INITIATED',
  PROCESSING: 'PROCESSING',
  COMPLETED: 'COMPLETED',
  ERROR: 'ERROR',
};

export type QueueName = keyof QueueSessionStates;
export type QueueState = typeof QUEUE_STATES[keyof typeof QUEUE_STATES];

interface QueueSessionStates {
  queryActivitiesQueue: QueueState;
  queryShowActorsQueue: QueueState;
  queryShowDataQueue: QueueState;
  genreDistributionQueue: QueueState;
  tvBFFQueue: QueueState;
  starSignPickerQueue: QueueState;
  crawlRottenTomatoeQueue: QueueState;
}

function initializeSessionStates(): QueueSessionStates {
  return {
    queryActivitiesQueue: QUEUE_STATES.NOT_INITIATED,
    queryShowActorsQueue: QUEUE_STATES.NOT_INITIATED,
    queryShowDataQueue: QUEUE_STATES.NOT_INITIATED,
    genreDistributionQueue: QUEUE_STATES.NOT_INITIATED,
    tvBFFQueue: QUEUE_STATES.NOT_INITIATED,
    starSignPickerQueue: QUEUE_STATES.NOT_INITIATED,
    crawlRottenTomatoeQueue: QUEUE_STATES.NOT_INITIATED,
  };
}

// getStateRecordFromStore gets the current state record from the store
export async function getStateRecordFromStore(sessionId: string): Promise<QueueSessionStates> {
  try {
    const parsedState: QueueSessionStates | null = await kv.get(sessionId);
    const initialState = initializeSessionStates();
    
    if (!parsedState) return initialState;
    const queueSessionStates: QueueSessionStates = { ...initialState, ...parsedState };
    
    return queueSessionStates;
  } catch (error) {
    console.error(`Error fetching state for session ${sessionId}:`, error);
    throw new Error('Failed to fetch state from store.');
  }
}

// saveStateRecordToStore save the updated state record back to the store
export async function saveStateRecordToStore(sessionId: string, sessionStates: QueueSessionStates): Promise<void> {
  try {
    await kv.set(sessionId, JSON.stringify(sessionStates));
  } catch (error) {
    console.error(`Error saving state for session ${sessionId}:`, error);
    throw new Error('Failed to save state to store.');
  }
}

// updateQueueState update the state of a specific queue for a session
export async function updateQueueState(sessionId: string, queueName: QueueName, newState: QueueState): Promise<void> {
  const queueSessionStates = await getStateRecordFromStore(sessionId);
  queueSessionStates[queueName] = newState;
  await saveStateRecordToStore(sessionId, queueSessionStates);
}
