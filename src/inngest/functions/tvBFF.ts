import { getAndUpdateTVBFF } from "@/actions";
import { eventNames } from "@/actions/lib/queue/event";
import {
  QueueName,
  getSessionGlobalState,
  queueNames,
  setQueueSessionState,
} from "@/actions/lib/queue/state";

import { inngest } from "../client";

async function tvBFF(event: { data: any }, step: any) {
  const { sessionID } = event.data;

  try {
    const processedData = await step.run("get-and-update-tv-bff", async () => {
      return await getAndUpdateTVBFF(sessionID);
    });
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
    throw error;
  }
}

export const tvBFFTask = inngest.createFunction(
  {
    id: "tv-bff",
  },
  { event: eventNames.TVBFF },
  async ({ event, step }) => {
    console.log("Recv tvBFF request...");
    const result = await tvBFF({ data: event.data }, step);
    return { event, processed: result };
  },
);
