import { enqueueStateThresholdCheckHandler } from "@/actions/lib/queue/producers";
import { getSessionsByState, sessionStates } from "@/actions/lib/queue/state";

import { inngest } from "../client";

async function stateThresholdCheck() {
  try {
    const sessionIDs = await getSessionsByState(sessionStates.PROCESSING);
    for (const sessionID of sessionIDs) {
      enqueueStateThresholdCheckHandler(sessionID);
    }
    return sessionIDs;
  } catch (error) {
    console.error("Error processing job:", error);
  }
}

export const stateThresholdCheckTask = inngest.createFunction(
  { id: "state-threshold-check" },
  {
    cron: "*/1 * * * *",
    concurrency: {
      limit: 50,
    },
  },
  async ({ event }) => {
    try {
      console.log("> running state threshold checks...");
      const startTime = Date.now();
      const maxDuration = 60000;
      let results;
      let interval: string | number | NodeJS.Timeout | undefined;

      const check = async () => {
        if (Date.now() - startTime > maxDuration) {
          console.log("Reached maximum execution time. Ending checks.");
          clearInterval(interval);
          return;
        }

        results = await stateThresholdCheck();
      };

      interval = setInterval(check, 10000);
      await new Promise((resolve) => setTimeout(resolve, maxDuration));
      clearInterval(interval);

      return { event, sessions: results };
    } catch (err) {
      console.error(err);
      return { event, sessions: null };
    }
  },
);
