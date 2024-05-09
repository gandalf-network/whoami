import { getShowData } from "@/actions";
import { eventNames } from "@/actions/lib/queue/event";
import { ShowPayload } from "@/actions/lib/queue/producers";
import {
  QueueName,
  incrementQueueSessionState,
  queueNames,
} from "@/actions/lib/queue/state";

import { inngest } from "../client";

async function queryShowData(event: { data: ShowPayload }) {
  const showPayload = event.data;
  try {
    const processedData = await getShowData(event.data);
    const queueName = queueNames.QueryShowData as QueueName;

    await incrementQueueSessionState(
      showPayload.SessionID,
      queueName,
      processedData,
      1,
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
