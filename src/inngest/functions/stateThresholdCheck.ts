import { UserState } from "@prisma/client";

import { updateUserStateBySession } from "@/actions";
import {
  enqueueStarSignPicker,
  enqueueTVBFF,
  enqueueTVShowQuips,
} from "@/actions/lib/queue/producers";
import {
  QueueName,
  checkDependentQueuesThresold,
  checkIndependentQueuesThresold,
  checkQueueThresold,
  getSessionsByState,
  queueNames,
  sessionStates,
  setSessionIndex,
} from "@/actions/lib/queue/state";

import { inngest } from "../client";

async function stateThresholdCheck() {
  try {
    const sessionIDs = await getSessionsByState(sessionStates.PROCESSING);
    for (const sessionID of sessionIDs) {
      if (await checkIndependentQueuesThresold(sessionID)) {
        await updateUserStateBySession(sessionID, UserState.COMPLETED);
        await setSessionIndex(sessionID, sessionStates.COMPLETED);
        continue;
      }

      if ( await checkQueueThresold(
        sessionID,
        queueNames.TVShowQuips as QueueName,
      )) {
        await updateUserStateBySession(sessionID, UserState.STATS_DATA_READY);
      }

      if (
        await checkQueueThresold(
          sessionID,
          queueNames.QueryShowData as QueueName,
        )
      ) {
        await enqueueTVShowQuips(sessionID);
      }

      if (await checkDependentQueuesThresold(sessionID)) {
        if (
          !(await checkQueueThresold(sessionID, queueNames.TVBFF as QueueName))
        ) {
          await enqueueTVBFF(sessionID);
        }

        if (
          !(await checkQueueThresold(
            sessionID,
            queueNames.StarSignPicker as QueueName,
          ))
        ) {
          await enqueueStarSignPicker(sessionID);
        }
      }
    }
    return sessionIDs;
  } catch (error) {
    console.error("Error processing job:", error);
  }
}

export const stateThresholdCheckTask = inngest.createFunction(
  { id: "state-threshold-check" },
  { cron: "*/1 * * * *" },
  async ({ event }) => {
    console.log("> Initiating state threshold checks...");
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

    interval = setInterval(check, 5000);

    await new Promise((resolve) => setTimeout(resolve, maxDuration));
    clearInterval(interval);

    return { event, sessions: results };
  },
);
