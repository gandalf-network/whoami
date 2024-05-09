import { UserState } from "@prisma/client";

import { getAndUpdateTVShowQuips, updateUserStateBySession } from "@/actions";
import { eventNames } from "@/actions/lib/queue/event";

import { inngest } from "../client";

async function tvShowQuips(event: { data: any }, step: any) {
  const { sessionID } = event.data;
  try {
    await step.run("get-and-update-tv-quips", async () => {
      return await getAndUpdateTVShowQuips(sessionID);
    });

    await updateUserStateBySession(sessionID, UserState.FIRST_PHASE_READY);
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
