import { UserState } from "@prisma/client";
import { Worker, Job } from "bullmq";

import {
  stateThresholdCheckQueue,
  queueNames,
} from "@/actions/lib/queue/queues";

import { getCompletedShowDataBySession, updateUserStateBySession } from "..";
import {
  ActivityDataPayload,
  ShowPayload,
  enqueueStarSignPicker,
  enqueueTVBFF,
} from "../lib/queue/producers";
import {
  QueueName,
  checkDependentQueuesThresold,
  checkIndependentQueuesThresold,
  checkQueueThresold,
  getSessionsByState,
  incrementCompletedJobs,
  sessionStates,
  setAllQueueTotalJobs,
  setSessionIndex,
  updatedCompletedJobs,
} from "../lib/queue/state";
import { vercelKVClient } from "../store/vercelkv";

const concurrency = 50;
const queryActivitiesWorker = async () => {
  new Worker(
    queueNames.QueryActivities,
    async (job: Job<ActivityDataPayload>) => {
      try {
        const { sessionID } = job.data;
        const url = `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/activities/queryActivities`;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(job.data),
        });

        if (!response.ok) {
          const message = `An error has occurred: ${response.status}`;
          throw new Error(message);
        }

        const { totalData } = (await response.json()) as {
          totalData: number;
        };
        await setSessionIndex(sessionID, sessionStates.PROCESSING);
        await updateUserStateBySession(sessionID, UserState.CRUNCHING_DATA);
        await setAllQueueTotalJobs(sessionID, totalData);

        const queueName = queueNames.QueryActivities as QueueName;
        await incrementCompletedJobs(sessionID, queueName, totalData);
        console.log("totalData:", totalData);
      } catch (error) {
        console.error("Error processing job:", error);
      }
    },
    { connection: vercelKVClient, concurrency },
  );
};

const crawlRottenTomatoeWorker = () => {
  new Worker(
    queueNames.CrawlRottenTomatoes,
    async (job: Job<ShowPayload>) => {
      try {
        const showPayload = job.data;
        const url = `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/activities/queryRottenTomatoes`;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(job.data),
        });

        if (!response.ok) {
          const message = `An error has occurred: ${response.status}`;
          throw new Error(message);
        }

        const { processedData } = (await response.json()) as {
          processedData: number;
        };
        const queueName = queueNames.CrawlRottenTomatoes as QueueName;
        await incrementCompletedJobs(
          showPayload.SessionID,
          queueName,
          processedData,
        );
      } catch (error) {
        console.error("Error processing job:", error);
      }
    },
    { connection: vercelKVClient, concurrency },
  );
};

const queryShowDataWorker = () => {
  new Worker(
    queueNames.QueryShowData,
    async (job: Job<ShowPayload>) => {
      try {
        const showPayload = job.data;
        const url = `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/activities/queryShowData`;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(job.data),
        });

        if (!response.ok) {
          const message = `An error has occurred: ${response.status}`;
          throw new Error(message);
        }

        const processedData = await getCompletedShowDataBySession(
          showPayload.SessionID,
        );
        const queueName = queueNames.QueryShowData as QueueName;
        await updatedCompletedJobs(
          showPayload.SessionID,
          queueName,
          processedData,
        );
      } catch (error) {
        console.error("Error processing job:", error);
      }
    },
    { connection: vercelKVClient, concurrency },
  );
};

const starSignPickerWorker = () => {
  new Worker(
    queueNames.StarSignPicker,
    async (job: Job) => {
      try {
        const { sessionID } = job.data;
        const url = `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/activities/starSignPicker`;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(job.data),
        });

        if (!response.ok) {
          const message = `An error has occurred: ${response.status}`;
          throw new Error(message);
        }

        const { processedData } = (await response.json()) as {
          processedData: number;
        };
        const queueName = queueNames.StarSignPicker as QueueName;
        await incrementCompletedJobs(sessionID, queueName, processedData);
      } catch (error) {
        console.error("Error processing job:", error);
      }
    },
    { connection: vercelKVClient, concurrency },
  );
};

const tvBFFWorker = () => {
  new Worker(
    queueNames.TVBFF,
    async (job: Job) => {
      try {
        const { sessionID } = job.data;
        const url = `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/activities/tvBFF`;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(job.data),
        });

        if (!response.ok) {
          const message = `An error has occurred: ${response.status}`;
          throw new Error(message);
        }

        const { processedData } = (await response.json()) as {
          processedData: number;
        };
        const queueName = queueNames.TVBFF as QueueName;
        await incrementCompletedJobs(sessionID, queueName, processedData);
      } catch (error) {
        console.error("Error processing job:", error);
      }
    },
    { connection: vercelKVClient, concurrency },
  );
};

const checkDependentQueuesThresoldWorker = () => {
  stateThresholdCheckQueue.add(
    queueNames.StateThresholdCheck,
    {},
    {
      repeat: {
        every: 30000,
        limit: 100,
      },
    },
  );

  new Worker(
    queueNames.StateThresholdCheck,
    async (job: Job) => {
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
              !(await checkQueueThresold(
                sessionID,
                queueNames.TVBFF as QueueName,
              ))
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
    },
    { connection: vercelKVClient },
  );
};

export default () => {
  console.log("> initiate server workers");
  queryActivitiesWorker();
  crawlRottenTomatoeWorker();
  queryShowDataWorker();
  starSignPickerWorker();
  tvBFFWorker();
  checkDependentQueuesThresoldWorker();
  console.log("> server workers ready ");
};
