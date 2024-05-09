import { QueueName, checkDependentQueuesThresold, checkIndependentQueuesThresold, checkQueueThresold, getSessionsByState, queueNames, sessionStates, setSessionIndex, statsPhaseReady } from "@/actions/lib/queue/state";

import { inngest } from "../client";
import { eventNames } from "@/actions/lib/queue/event";
import { enqueueStarSignPicker, enqueueTVBFF } from "@/actions/lib/queue/producers";
import { UserState } from "@prisma/client";
import { updateUserStateBySession } from "@/actions";

export const stateThresholdCheckTask = inngest.createFunction(
  {
    id: "state-threshold-check",
    concurrency: {
      limit: 50,
    },
  },
  { event: eventNames.StateThresholdCheck },
  async ({ event, step }) => {
    const { sessionID } = event.data;
    console.log(`> running state threshold checks... ${sessionID}`);
    try {
      console.log(await getSessionsByState(sessionStates.PROCESSING))
      if (await checkIndependentQueuesThresold(sessionID)) {
        await updateUserStateBySession(sessionID, UserState.COMPLETED);
        await setSessionIndex(sessionID, sessionStates.COMPLETED);
        return;
      }

      if (await statsPhaseReady(sessionID)) {
        await updateUserStateBySession(sessionID, UserState.SECOND_PHASE_READY);
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

    } catch (error) {
      console.error("Error processing job:", error);
    }
    
    console.log("DONE>>>>>>")
    // Reschedule the same function again by invoking itself.
    await step.run("reschedule-state-threshold-check", async () => {
      await inngest.send({ name: eventNames.StateThresholdCheck, data: { sessionID } });
    });

    return { event };
  },
);
