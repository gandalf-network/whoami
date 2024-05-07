import { UserState } from "@prisma/client";

import { updateUserStateBySession } from "@/actions";
import { eventNames } from "@/actions/lib/queue/event";
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
  queueNames,
  sessionStates,
  setSessionIndex,
} from "@/actions/lib/queue/state";

import { inngest } from "../client";

export const stateThresholdCheckHandlerTask = inngest.createFunction(
  {
    id: "state-threshold-check-handler",
  },
  { event: eventNames.StateThresholdCheckHandler },
  async ({ event }) => {
    const { sessionID } = event.data;
    try {
      if (await checkIndependentQueuesThresold(sessionID)) {
        await updateUserStateBySession(sessionID, UserState.COMPLETED);
        await setSessionIndex(sessionID, sessionStates.COMPLETED);
        return;
      }

      if (
        await checkQueueThresold(sessionID, queueNames.TVShowQuips as QueueName)
      ) {
        await updateUserStateBySession(sessionID, UserState.STATS_DATA_READY);
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

      return { event };
    } catch (error) {
      console.error("Error processing job:", error);
      throw error;
    }
  },
);
