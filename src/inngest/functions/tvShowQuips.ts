import { UserState } from "@prisma/client";

import { getAndUpdateTVShowQuips, updateUserStateBySession } from "@/actions";
import { eventNames } from "@/actions/lib/queue/event";
import {
  QueueName,
  getSessionGlobalState,
  queueNames,
  setQueueSessionState,
} from "@/actions/lib/queue/state";

import { inngest } from "../client";

async function tvShowQuips(event: { data: any }) {
  const { sessionID } = event.data;

  try {
    const processedData = await getAndUpdateTVShowQuips(sessionID);
    const queueName = queueNames.TVShowQuips as QueueName;
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

export const tvShowQuipsTask = inngest.createFunction(
  {
    id: "tv-show-quips",
  },
  { event: eventNames.TVShowQuips },
  async ({ event }) => {
    console.log("Recv tvShowQups request...");
    const result = await tvShowQuips({ data: event.data });
    return { event, processed: result };
  },
);
