import { UserState } from "@prisma/client";

import { findUser, updateUserStateBySession } from "@/actions";
import { eventNames } from "@/actions/lib/queue/event";
import {
  enqueueStarSignPicker,
  enqueueTVBFF,
} from "@/actions/lib/queue/producers";
import {
  QueueName,
  checkDependentQueuesThreshold,
  checkCompletedThreshold,
  checkQueueThreshold,
  queueNames,
  sessionStates,
  setSessionIndex,
  getSessionStartTime,
  checkStatsReadyThreshold,
} from "@/actions/lib/queue/state";

import { inngest } from "../client";

const MAX_SESSION_DURATION = 60 * 1000; // 1 minute in milliseconds

export const stateThresholdCheckTask = inngest.createFunction(
  {
    id: "state-threshold-check",
    concurrency: { limit: 50 },
  },
  { event: eventNames.StateThresholdCheck },
  async ({ event, step }) => {
    const { sessionID } = event.data;
    if (!sessionID) return;

    let sessionStartTime = await getSessionStartTime(sessionID);
    if (sessionStartTime === 0) {
      console.log("No session start time");
      return;
    }

    const currentTime = performance.now();
    const sessionDuration = currentTime - sessionStartTime;

    if (sessionDuration > MAX_SESSION_DURATION) {
      console.log(`Session ${sessionID} has exceeded 15 minutes. Stopping further checks.`);
      await completeSession(sessionID);
      return;
    }

    console.log(`> Running state threshold checks... SID: ${sessionID}`);

    try {
      const user = await findUser(sessionID);

      // Update state to `COMPLETED` if last phase threshold is met
      if (await checkCompletedThreshold(sessionID)) {
        console.log(">>>>> COMPLETED >>>>>>>>");
        await completeSession(sessionID);
        return;
      }

      // Update state to `STATS_DATA_READY`
      if (
        (await checkStatsReadyThreshold(sessionID)) &&
        user?.state === UserState.PROCESSING
      ) {
        console.log(">>>>> STATS_DATA_READY >>>>>>>>");
        await updateUserStateBySession(sessionID, UserState.STATS_DATA_READY);
      }

      await processDependentQueues(sessionID);
    } catch (error) {
      console.error("Error processing job:", error);
    }

    console.log("DONE>>>>>>");
    // Reschedule the state threshold check
    await rescheduleThresholdCheck(sessionID, step);

    return { event };
  },
);

/**
 * Marks the session as completed by updating the user state and session index.
 * @param sessionID - The session ID to mark as completed
 */
async function completeSession(sessionID: string) {
  await updateUserStateBySession(sessionID, UserState.COMPLETED);
  await setSessionIndex(sessionID, sessionStates.COMPLETED);
}

/**
 * Processes dependent queues by enqueuing `tvBFF` and `starSignPicker` tasks.
 * @param sessionID - The session ID to process
 */
async function processDependentQueues(sessionID: string) {
  if (await checkDependentQueuesThreshold(sessionID)) {
    if (
      !(await checkQueueThreshold(
        sessionID,
        queueNames.StarSignPicker as QueueName,
      ))
    ) {
      await enqueueStarSignPicker(sessionID);
    }

    if (
      !(await checkQueueThreshold(sessionID, queueNames.TVBFF as QueueName))
    ) {
      await enqueueTVBFF(sessionID);
    }
  }
}

/**
 * Reschedules the threshold check task.
 * @param sessionID - The session ID to reschedule
 * @param step - The step object for the current function execution
 */
async function rescheduleThresholdCheck(sessionID: string, step: any) {
  await step.sleep("wait-with-ms", 3000);

  await step.run("reschedule-state-threshold-check", async () => {
    await inngest.send({
      name: eventNames.StateThresholdCheck,
      data: { sessionID },
    });
  });
}
