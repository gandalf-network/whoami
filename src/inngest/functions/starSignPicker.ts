import { getAndUpdateStarSignPicker } from "@/actions";
import { eventNames } from "@/actions/lib/queue/event";
import {
  QueueName,
  getSessionGlobalState,
  queueNames,
  setQueueSessionState,
} from "@/actions/lib/queue/state";

import { inngest } from "../client";

async function starSignPicker(event: { data: any }) {
  const { sessionID } = event.data;

  try {
    const processedData = await getAndUpdateStarSignPicker(sessionID);
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
  }
}

export const starSignPickerTask = inngest.createFunction(
  {
    id: "star-sign-picker",
  },
  { event: eventNames.StarSignPicker },
  async ({ event }) => {
    console.log("Recv starSignPicker request...");
    const result = await starSignPicker({ data: event.data });
    return { event, processed: result };
  },
);
