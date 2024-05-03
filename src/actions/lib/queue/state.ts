/**
 * State Tracking in Workflow:
 *
 * Designed to oversee the progress of tasks distributed across various queues, this state tracking logic uses a
 * `sessionId` as a unique identifier for collections of tasks tailored to specific user activities. This identifier
 * is key to efficiently monitoring, tracking, and aggregating job statuses throughout different phases of the processing
 * workflow. Each job's state is dynamically updated to reflect its current state based on the total jobs and completed jobs,
 * ensuring real-time oversight of the workflow.
 *
 * The idea is to employ a dynamic percentage completion model to gauge the progress of each job:
 * - 0% indicates a job is identified but not yet initiated.
 * - 1% to 99% indicates that a job is currently been processed.
 * - 100% completion signifies a job has been successfully completed but we only care about 97% completion.
 */

import { kv } from "@vercel/kv";

export type QueueName =
  | "queryActivities"
  | "queryShowData"
  | "tvBFF"
  | "starSignPicker"
  | "crawlRottenTomatoe";

export const queueNames = {
  QueryActivities: "queryActivities",
  QueryShowData: "queryShowData",
  CrawlRottenTomatoes: "crawlRottenTomatoe",
  TVBFF: "tvBFF",
  StarSignPicker: "starSignPicker",
  StateThresholdCheck: "stateThresholdCheck",
};

export type SessionState = "NOT_STARTED" | "PROCESSING" | "COMPLETED";
export type QueueCompletion = number;

const makeKey = (sessionId: string, queueName: QueueName, suffix: string) =>
  `session:${sessionId}:queue:${queueName}:${suffix}`;

const makeGlobalKey = (sessionId: string, suffix: string) =>
  `session:${sessionId}:${suffix}`;

const COMPLETION_THRESHOLD = 95;

export const sessionStates: Record<string, SessionState> = {
  NOT_STARTED: "NOT_STARTED",
  PROCESSING: "PROCESSING",
  COMPLETED: "COMPLETED",
};

/**
 * Updates the session index to reflect the new state of a given session.
 * This ensures that each session can only exist in one state at a time.
 *
 * @param sessionId The unique identifier of the session.
 * @param state The new state to assign to the session.
 */
export async function setSessionIndex(sessionId: string, state: SessionState) {
  const indexKey = "sessions:index";

  const sessionsIndex: string | null = await kv.get(indexKey);
  const index: Record<string, string[]> = sessionsIndex
    ? JSON.parse(JSON.stringify(sessionsIndex))
    : {};

  for (const key in index) {
    if (index[key].includes(sessionId)) {
      index[key] = index[key].filter((id) => id !== sessionId);
    }
  }

  if (!index[state]) {
    index[state] = [];
  }
  index[state].push(sessionId);

  await kv.set(indexKey, JSON.stringify(index));
}

export async function getSessionsByState(state: string): Promise<string[]> {
  const indexKey = "sessions:index";
  const sessionsIndex: Record<string, string[]> | null = await kv.get(indexKey);
  console.log(sessionsIndex);
  const index = sessionsIndex ? JSON.parse(JSON.stringify(sessionsIndex)) : {};
  return index[state] || [];
}

export async function setSessionGlobalState(
  sessionId: string,
  totalJobs: number,
  totalChunks: number,
) {
  await kv.set(
    makeGlobalKey(sessionId, "totalJobs"),
    totalJobs.toString(),
  );
  await kv.set(
    makeGlobalKey(sessionId, "totalChunks"),
    totalChunks.toString(),
  );
}


export async function getSessionGlobalState(sessionId: string): Promise<number[]>{
  const totalJobString:  string | null = await kv.get(
    makeGlobalKey(sessionId, "totalJobs")
  );
  const totalChunkString:  string | null = await kv.get(
    makeGlobalKey(sessionId, "totalChunks"),
  );

  const totalJobs = parseInt(totalJobString || "0");
  const totalChunks = parseInt(totalChunkString || "0");

  return[ totalJobs, totalChunks]
}

export async function getQueueSessionState(sessionId: string, queueName: QueueName): Promise<number[]>{
  const completedJobString:  string | null = await kv.get(
    makeKey(sessionId, queueName, "completedJobs")
  );
  const executedChunkString:  string | null = await kv.get(
    makeKey(sessionId, queueName, "executedChunks"),
  );

  const completedJobs = parseInt(completedJobString || "0");
  const executedChunks = parseInt(executedChunkString || "0");

  return [ completedJobs, executedChunks]
}

export async function setQueueSessionState(
  sessionId: string,
  queueName: QueueName,
  completedJobs: number,
  executedChunks: number,
) {
  await kv.set(
    makeKey(sessionId, queueName, "completedJobs"),
    completedJobs.toString(),
  );
  await kv.set(
    makeKey(sessionId, queueName, "executedChunks"),
    executedChunks.toString(),
  );
}

export async function getQueueCompletion(
  sessionId: string,
  queueName: QueueName,
): Promise<number> {
  const totalJobsKey = makeGlobalKey(sessionId, "totalJobs");
  const completedJobsKey = makeKey(sessionId, queueName, "completedJobs");

  const totalJobsString: string | null = await kv.get(totalJobsKey);
  const completedJobsString: string | null = await kv.get(completedJobsKey);

  const totalJobs = parseInt(totalJobsString || "0");
  const completedJobs = parseInt(completedJobsString || "0");
  if (totalJobs === 0) {
    return 0;
  }

  return (completedJobs / totalJobs) * 100;
}


export async function checkDependentQueuesThresold(
  sessionID: string,
): Promise<boolean> {
  const queuesToCheck: QueueName[] = [
    "queryActivities",
    "queryShowData",
    "crawlRottenTomatoe",
  ];
  let canTrigger = true;

  for (const queueName of queuesToCheck) {
    const completion = await getQueueCompletion(
      sessionID,
      queueName as QueueName,
    );
    
    const [, executedChunks] = await getQueueSessionState(sessionID, queueName)
    const [, totalChunks] = await getSessionGlobalState(sessionID)
    
    console.log(`${queueName}`, "<>", completion);
    if (completion < COMPLETION_THRESHOLD && executedChunks < totalChunks) {
      canTrigger = false;
      break;
    }
  }

  return canTrigger;
}

export async function checkIndependentQueuesThresold(
  sessionID: string,
): Promise<boolean> {
  const queuesToCheck: QueueName[] = ["tvBFF", "starSignPicker"];
  let canTrigger = true;

  for (const queueName of queuesToCheck) {
    const completion = await getQueueCompletion(
      sessionID,
      queueName as QueueName,
    );
    if (completion < COMPLETION_THRESHOLD) {
      canTrigger = false;
      break;
    }
  }

  return canTrigger;
}

export async function checkQueueThresold(
  sessionId: string,
  queueName: QueueName,
): Promise<boolean> {
  const completion = await getQueueCompletion(sessionId, queueName);
  if (completion < COMPLETION_THRESHOLD) {
    return false;
  }

  return true;
}
