import { UserState } from "@prisma/client";
import { performance } from "perf_hooks";

import { getAndDumpActivities, updateUserStateBySession } from "@/actions";
import { eventNames } from "@/actions/lib/queue/event";
import { ActivityDataPayload } from "@/actions/lib/queue/producers";
import {
  setSessionIndex,
  sessionStates,
  QueueName,
  queueNames,
  setQueueSessionState,
  setSessionGlobalState,
} from "@/actions/lib/queue/state";

import { inngest } from "../client";

async function queryActivities(event: { data: ActivityDataPayload }) {
  const { sessionID, dataKey } = event.data;
  try {
    const [totalData, totalChunks] = await getAndDumpActivities(
      sessionID,
      dataKey,
    );
    await setSessionIndex(sessionID, sessionStates.PROCESSING);
    await updateUserStateBySession(sessionID, UserState.CRUNCHING_DATA);
    await setSessionGlobalState(sessionID, totalData, totalChunks);

    const queueName = queueNames.QueryActivities as QueueName;
    await setQueueSessionState(sessionID, queueName, totalData, totalChunks);

    console.log(`[totalData]:`, totalData, "[totalChunks]:", totalChunks);
    return totalData;
  } catch (error) {
    console.error("Error processing job:", error);
  }
}

export const queryActivitiesTask = inngest.createFunction(
  {
    id: "query-activities",
    concurrency: 50,
    // idempotency: "event.activities",
  },
  { event: eventNames.QueryActivities },
  async ({ event }) => {
    const startTime = performance.now();
    const result = await queryActivities({ data: event.data });
    const endTime = performance.now();

    console.log(`queryActivities took ${endTime - startTime} milliseconds.`);

    return { event, processed: result };
  },
);
