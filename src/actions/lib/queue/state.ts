import { kv } from "@vercel/kv";

export type QueueName =
  | "queryActivities"
  | "queryShowData"
  | "tvShowQuips"
  | "tvBFF"
  | "starSignPicker"
  | "crawlRottenTomatoe";

export const queueNames = {
  QueryActivities: "queryActivities",
  QueryShowData: "queryShowData",
  CrawlRottenTomatoes: "crawlRottenTomatoe",
  TVBFF: "tvBFF",
  TVShowQuips: "tvShowQuips",
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
  if (sessionsIndex) {
    console.log("> sessions: ", sessionsIndex);
  }
  const index = sessionsIndex ? JSON.parse(JSON.stringify(sessionsIndex)) : {};
  return index[state] || [];
}

export async function setSessionGlobalState(
  sessionId: string,
  totalJobs: number,
  totalChunks: number,
) {
  await kv.set(makeGlobalKey(sessionId, "totalJobs"), totalJobs.toString());
  await kv.set(makeGlobalKey(sessionId, "totalChunks"), totalChunks.toString());
}

export async function setSessionStartTime(
  sessionId: string,
  startTime: number,
): Promise<void> {
  await kv.set(makeGlobalKey(sessionId, "startTime"), startTime);
}

export async function getSessionStartTime(sessionId: string): Promise<number> {
  const startTimeString: string | null = await kv.get(
    makeGlobalKey(sessionId, "startTime"),
  );
  const startTime = parseInt(startTimeString || "0");
  return startTime;
}

export async function getSessionGlobalState(
  sessionId: string,
): Promise<number[]> {
  const totalJobString: string | null = await kv.get(
    makeGlobalKey(sessionId, "totalJobs"),
  );
  const totalChunkString: string | null = await kv.get(
    makeGlobalKey(sessionId, "totalChunks"),
  );

  const totalJobs = parseInt(totalJobString || "0");
  const totalChunks = parseInt(totalChunkString || "0");

  return [totalJobs, totalChunks];
}

export async function getQueueSessionState(
  sessionId: string,
  queueName: QueueName,
): Promise<number[]> {
  const completedJobString: string | null = await kv.get(
    makeKey(sessionId, queueName, "completedJobs"),
  );
  const executedChunkString: string | null = await kv.get(
    makeKey(sessionId, queueName, "executedChunks"),
  );

  const completedJobs = parseInt(completedJobString || "0");
  const executedChunks = parseInt(executedChunkString || "0");

  return [completedJobs, executedChunks];
}

export async function atomicIncrement(
  key: string,
  incrementBy: number,
): Promise<number> {
  const newValue = await kv.incrby(key, incrementBy);
  return newValue;
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

export async function incrementQueueSessionState(
  sessionId: string,
  queueName: QueueName,
  completedJobsIncrement: number,
  executedChunksIncrement: number,
) {
  const completedJobsKey = makeKey(sessionId, queueName, "completedJobs");
  const executedChunksKey = makeKey(sessionId, queueName, "executedChunks");

  await atomicIncrement(completedJobsKey, completedJobsIncrement);
  await atomicIncrement(executedChunksKey, executedChunksIncrement);
}

export async function getQueueCompletion(
  sessionId: string,
  queueName: QueueName,
): Promise<number> {
  const totalJobsKey = makeGlobalKey(sessionId, "totalJobs");
  const completedJobsKey = makeKey(sessionId, queueName, "completedJobs");

  const totalJobs = parseInt((await kv.get(totalJobsKey)) || "0", 10);
  const completedJobs = parseInt((await kv.get(completedJobsKey)) || "0", 10);

  if (totalJobs === 0) return 0;

  return (completedJobs / totalJobs) * 100;
}

export async function checkDependentQueuesThreshold(
  sessionID: string,
): Promise<boolean> {
  const queuesToCheck: QueueName[] = [
    "queryActivities",
    "queryShowData",
    "crawlRottenTomatoe",
  ];
  let canTrigger = true;
  const [, totalChunks] = await getSessionGlobalState(sessionID);
  if (totalChunks == 0) {
    return false;
  }

  for (const queueName of queuesToCheck) {
    const completion = await getQueueCompletion(
      sessionID,
      queueName as QueueName,
    );

    const [, executedChunks] = await getQueueSessionState(sessionID, queueName);

    console.log(
      `${queueName}`,
      "<>",
      "completion",
      completion,
      "executedChunks",
      executedChunks,
      "totalChunks",
      totalChunks,
    );
    if (completion < COMPLETION_THRESHOLD && executedChunks < totalChunks) {
      canTrigger = false;
      break;
    }
  }

  return canTrigger;
}

export async function checkCompletedThreshold(
  sessionID: string,
): Promise<boolean> {
  const queuesToCheck: QueueName[] = ["tvBFF", "tvShowQuips", "starSignPicker"];
  let canTrigger = true;
  const [, totalChunks] = await getSessionGlobalState(sessionID);
  if (totalChunks == 0) {
    return false;
  }

  for (const queueName of queuesToCheck) {
    const completion = await getQueueCompletion(
      sessionID,
      queueName as QueueName,
    );
    const [, executedChunks] = await getQueueSessionState(sessionID, queueName);

    console.log(
      `${queueName}`,
      "<>",
      "completion",
      completion,
      "executedChunks",
      executedChunks,
      "totalChunks",
      totalChunks,
    );
    if (completion < COMPLETION_THRESHOLD) {
      canTrigger = false;
      break;
    }
  }

  return canTrigger;
}

export async function checkQueueThreshold(
  sessionID: string,
  queueName: QueueName,
): Promise<boolean> {
  const completion = await getQueueCompletion(sessionID, queueName);
  const [, executedChunks] = await getQueueSessionState(sessionID, queueName);
  const [, totalChunks] = await getSessionGlobalState(sessionID);
  if (totalChunks == 0) {
    return false;
  }

  if (completion < COMPLETION_THRESHOLD && executedChunks < totalChunks) {
    return false;
  }

  return true;
}

export async function checkStatsReadyThreshold(
  sessionID: string,
): Promise<boolean> {
  return await checkQueueThreshold(
    sessionID,
    queueNames.TVShowQuips as QueueName,
  );
}
