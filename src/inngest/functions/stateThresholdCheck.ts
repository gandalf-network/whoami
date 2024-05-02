import { UserState } from "@prisma/client";

import { updateUserStateBySession } from "@/actions";
import {
  enqueueStarSignPicker,
  enqueueTVBFF,
} from "@/actions/lib/queue/producers";
import { queueNames } from "@/actions/lib/queue/queues";
import {
  QueueName,
  checkDependentQueuesThresold,
  checkIndependentQueuesThresold,
  checkQueueThresold,
  getSessionsByState,
  sessionStates,
  setSessionIndex,
} from "@/actions/lib/queue/state";

import { inngest } from "../client";

async function stateThresholdCheck() {
  try {
    const sessionIDs = await getSessionsByState(sessionStates.PROCESSING);
    for (const sessionID of sessionIDs) {
      if (await checkIndependentQueuesThresold(sessionID)) {
        await setSessionIndex(sessionID, sessionStates.COMPLETED);
        await updateUserStateBySession(sessionID, UserState.COMPLETED);
        continue;
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
    const maxDuration = 10000;
    let results;

    const check = async () => {
      if (Date.now() - startTime > maxDuration) {
        console.log("Reached maximum execution time. Ending checks.");
        return;
      }

      results = await stateThresholdCheck();
      setTimeout(check, 5000);
    };
    await check();

    await new Promise((resolve) => setTimeout(resolve, maxDuration));
    return { event, sessions: results };
  },
);
