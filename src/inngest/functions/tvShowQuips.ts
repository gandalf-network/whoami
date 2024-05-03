import { getAndUpdateTVShowQuips } from "@/actions";
import { eventNames } from "@/actions/lib/queue/event";
import {
  QueueName,
  incrementCompletedJobs,
  queueNames,
} from "@/actions/lib/queue/state";

import { inngest } from "../client";

async function tvShowQuips(event: { data: any }) {
  const { sessionID } = event.data;

  try {
    const processedData = await getAndUpdateTVShowQuips(sessionID);
    const queueName = queueNames.TVShowQuips as QueueName;
    await incrementCompletedJobs(sessionID, queueName, processedData);
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
