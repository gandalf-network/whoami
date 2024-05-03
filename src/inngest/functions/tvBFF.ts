import { getAndUpdateTVBFF } from "@/actions";
import { eventNames } from "@/actions/lib/queue/event";
import {
  QueueName,
  getSessionGlobalState,
  queueNames,
  setQueueSessionState,
} from "@/actions/lib/queue/state";

import { inngest } from "../client";

async function tvBFF(event: { data: any }) {
  const { sessionID } = event.data;

  try {
    const processedData = await getAndUpdateTVBFF(sessionID);
    const queueName = queueNames.TVBFF as QueueName;
    const [, totalChunks] = await getSessionGlobalState(sessionID);
    await setQueueSessionState(
      sessionID,
      queueName,
      processedData,
      totalChunks,
    );
  } catch (error) {
    console.error("Error processing job:", error);
  }
}

export const tvBFFTask = inngest.createFunction(
  {
    id: "tv-bff",
  },
  { event: eventNames.TVBFF },
  async ({ event }) => {
    console.log("Recv tvBFF request...");
    const result = await tvBFF({ data: event.data });
    return { event, processed: result };
  },
);
