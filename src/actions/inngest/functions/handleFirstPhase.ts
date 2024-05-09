import { preloadTopShowsData } from "@/actions";
import { getTop3ShowsByUser, getUsersFirstShow } from "@/actions/database/show";
import { findOrCreateUserBySessionID } from "@/actions/database/user";
import { eventNames } from "@/actions/lib/queue/event";
import { enqueueTVShowQuips } from "@/actions/lib/queue/producers";

import { inngest } from "../client";

async function executeFirstPhaseRequest(event: { data: any }, step: any) {
  const { sessionID } = event.data;
  try {
    await step.run("preload-show-data-for-first-phase", async () => {
      return await preloadTopShowsData(sessionID);
    });
    const user = await findOrCreateUserBySessionID(sessionID);
    const topShows = await getTop3ShowsByUser(user.id);
    const firstShow = await getUsersFirstShow(user.id);

    console.log({ firstShow, topShows });

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
