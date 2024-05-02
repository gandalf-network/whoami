import { UserState } from "@prisma/client";

import { getAndDumpActivities, updateUserStateBySession } from "@/actions";
import { eventNames } from "@/actions/lib/queue/event";
import { ActivityDataPayload } from "@/actions/lib/queue/producers";
import {
  setSessionIndex,
  setAllQueueTotalJobs,
  incrementCompletedJobs,
  sessionStates,
  QueueName,
  queueNames,
} from "@/actions/lib/queue/state";

import { inngest } from "../client";

async function queryActivities(event: { data: ActivityDataPayload }) {
  const { sessionID, dataKey } = event.data;
  try {
    const totalData = await getAndDumpActivities(sessionID, dataKey);
    await setSessionIndex(sessionID, sessionStates.PROCESSING);
    await updateUserStateBySession(sessionID, UserState.CRUNCHING_DATA);
    await setAllQueueTotalJobs(sessionID, totalData);
    const queueName = queueNames.QueryActivities as QueueName;
    await incrementCompletedJobs(sessionID, queueName, totalData);
    console.log("totalData:", totalData);
    return totalData;
  } catch (error) {
    console.error("Error processing job:", error);
  }
}

export const queryActivitiesTask = inngest.createFunction(
  {
    id: "query-activities",
    idempotency: "event.activities",
  },
  { event: eventNames.QueryActivities },
  async ({ event }) => {
    const result = await queryActivities({ data: event.data });
    return { event, processed: result };
  },
);