import { UserState } from "@prisma/client";
import { performance } from "perf_hooks";

import { getAndDumpActivities, updateUserStateBySession } from "@/actions";
import { eventNames } from "@/actions/lib/queue/event";
import {
  ActivityDataPayload,
  enqueueStateThresholdCheck,
} from "@/actions/lib/queue/producers";
import {
  setSessionIndex,
  sessionStates,
  QueueName,
  queueNames,
  setQueueSessionState,
  setSessionGlobalState,
  setSessionStartTime,
} from "@/actions/lib/queue/state";

import { inngest } from "../client";

async function queryActivities(event: { data: ActivityDataPayload }) {
  const { sessionID, dataKey } = event.data;
  try {
    // enqueue state threshold check
    await setSessionStartTime(sessionID, performance.now());
    await enqueueStateThresholdCheck(sessionID);

    // set session index and user state to `PROCESSING`
    await setSessionIndex(sessionID, sessionStates.PROCESSING);
    await updateUserStateBySession(sessionID, UserState.PROCESSING);

    const [totalData, totalChunks] = await getAndDumpActivities(
      sessionID,
      dataKey,
    );
    await setSessionGlobalState(sessionID, totalData, totalChunks);

    const queueName = queueNames.QueryActivities as QueueName;
    await setQueueSessionState(sessionID, queueName, totalData, totalChunks);

    console.log(`> [totalData]:`, totalData, "[totalChunks]:", totalChunks);
    // await enqueueFirstPhaseHandler(sessionID);

    return totalData;
  } catch (error) {
    await updateUserStateBySession(sessionID, UserState.FAILED);
    console.error("Error processing job:", error);
    throw error;
  }
}

export const queryActivitiesTask = inngest.createFunction(
  {
    id: "query-activities",
    concurrency: {
      limit: 100,
    },
  },
  { event: eventNames.QueryActivities },
  async ({ event }) => {
    const startTime = performance.now();

    const result = await queryActivities({ data: event.data });
    const endTime = performance.now();

    console.log(`> queryActivities took ${endTime - startTime} milliseconds.`);

    return { event, processed: result };
  },
);
