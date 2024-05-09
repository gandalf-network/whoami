import { getAndUpdateStarSignPicker } from "@/actions";
import { eventNames } from "@/actions/lib/queue/event";
import {
  QueueName,
  getSessionGlobalState,
  queueNames,
  setQueueSessionState,
} from "@/actions/lib/queue/state";

import { inngest } from "../client";

async function starSignPicker(event: { data: any }, step: any) {
  const { sessionID } = event.data;
  try {
    const processedData = await step.run(
      "get-and-update-star-sign-picker",
      async () => {
        return await getAndUpdateStarSignPicker(sessionID);
      },
    );
    const queueName = queueNames.StarSignPicker as QueueName;
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

export const starSignPickerTask = inngest.createFunction(
  {
    id: "star-sign-picker",
    concurrency: {
      limit: 50,
    },
  },
  { event: eventNames.StarSignPicker },
  async ({ event, step }) => {
    console.log("> Recv starSignPicker request...");
    const result = await starSignPicker({ data: event.data }, step);
    return { event, processed: result };
  },
);