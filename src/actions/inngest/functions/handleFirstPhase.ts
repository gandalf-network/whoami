import { preloadTopShowsData } from "@/actions";
import { eventNames } from "@/actions/lib/queue/event";
import { enqueueTVShowQuips } from "@/actions/lib/queue/producers";

import { inngest } from "../client";

async function executeFirstPhaseRequest(event: { data: any }, step: any) {
  const { sessionID } = event.data;
  try {
    await step.run("preload-show-data-for-first-phase", async () => {
      return await preloadTopShowsData(sessionID);
    });

    await enqueueTVShowQuips(sessionID);
  } catch (error) {
    console.error("Error processing job:", error);
    throw error;
  }
}
export const firstPhaseHandlerTask = inngest.createFunction(
  {
    id: "first-phase-handler",
    concurrency: {
      limit: 50,
    },
  },
  { event: eventNames.FirstPhaseHandler },
  async ({ event, step }) => {
    await executeFirstPhaseRequest({ data: event.data }, step);
    return {
      event,
    };
  },
);
