import { getAndUpdateTVShowQuips, preloadTopShowsData, updateUserStateBySession } from "@/actions";
import { eventNames } from "@/actions/lib/queue/event";
import {
  QueueName,
  getSessionGlobalState,
  queueNames,
  setQueueSessionState,
} from "@/actions/lib/queue/state";

import { inngest } from "../client";
import { UserState } from "@prisma/client";

async function tvShowQuips(event: { data: any }, step: any) {
  const { sessionID } = event.data;
  try {
    await step.run("preload-show-data-for-first-phase", async () => {
      return await preloadTopShowsData(sessionID);
    });

    const processedData = await step.run(
      "get-and-update-tv-quips",
      async () => {
        return await getAndUpdateTVShowQuips(sessionID);
      },
    );
    const queueName = queueNames.TVShowQuips as QueueName;
    const [, totalChunks] = await getSessionGlobalState(sessionID);
    await setQueueSessionState(
      sessionID,
      queueName,
      processedData,
      totalChunks,
    );

    console.log(">>>>> STATS_DATA_READY >>>>>>>>");
    await updateUserStateBySession(sessionID, UserState.STATS_DATA_READY);
  } catch (error) {
    console.error("Error processing job:", error);
    throw error;
  }
}

export const tvShowQuipsTask = inngest.createFunction(
  {
    id: "tv-show-quips",
    concurrency: {
      limit: 50,
    },
  },
  { event: eventNames.TVShowQuips },
  async ({ event, step }) => {
    console.log("> Recv tvShowQuips request...");
    const result = await tvShowQuips({ data: event.data }, step);
    return { event, processed: result };
  },
);
