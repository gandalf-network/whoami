import { getCompletedShowDataBySession, getShowData } from "@/actions";
import { eventNames } from "@/actions/lib/queue/event";
import { ShowPayload } from "@/actions/lib/queue/producers";
import {
  QueueName,
  getQueueSessionState,
  queueNames,
  setQueueSessionState,
} from "@/actions/lib/queue/state";

import { inngest } from "../client";

async function queryShowData(event: { data: ShowPayload }) {
  const showPayload = event.data;
  try {
    await getShowData(event.data);
    const processedData = await getCompletedShowDataBySession(
      showPayload.SessionID,
    );
    const queueName = queueNames.QueryShowData as QueueName;
    let [, executedChunks] = await getQueueSessionState(
      showPayload.SessionID,
      queueName,
    );

    executedChunks = executedChunks + 1;
    await setQueueSessionState(
      showPayload.SessionID,
      queueName,
      processedData,
      executedChunks,
    );
    return processedData;
  } catch (error) {
    console.error("Error processing job:", error);
    throw error;
  }
}

export const queryShowDataTask = inngest.createFunction(
  {
    id: "query-show-data",
    concurrency: {
      limit: 100,
    },
  },
  { event: eventNames.QueryShowData },
  async ({ event }) => {
    const result = await queryShowData({ data: event.data });
    return { event, processed: result };
  },
);
