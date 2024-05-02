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
    console.log("> checking state threshold ");
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
  } catch (error) {
    console.error("Error processing job:", error);
  }
}

export const stateThresholdCheckTask = inngest.createFunction(
  { id: "state-threshold-check" },
  { cron: "*/1 * * * *" },
  async ({ event }) => {
    const result = await stateThresholdCheck();
    const executeEveryTenSeconds = () => {
      stateThresholdCheck();
      setTimeout(executeEveryTenSeconds, 10000);
    };

    executeEveryTenSeconds();

    await new Promise((resolve) => setTimeout(resolve, 60000));
    return { event, processed: result };
  },
);
