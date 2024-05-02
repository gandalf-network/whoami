import { getCompletedShowDataBySession, getShowData } from "@/actions";
import { eventNames } from "@/actions/lib/queue/event";
import { ShowPayload } from "@/actions/lib/queue/producers";
import { queueNames } from "@/actions/lib/queue/queues";
import { QueueName, updatedCompletedJobs } from "@/actions/lib/queue/state";

import { inngest } from "../client";

async function queryShowData(event: { data: ShowPayload }) {
  const showPayload = event.data;

  try {
    await getShowData(event.data);
    const processedData = await getCompletedShowDataBySession(
      showPayload.SessionID,
    );
    const queueName = queueNames.QueryShowData as QueueName;
    await updatedCompletedJobs(showPayload.SessionID, queueName, processedData);
    return processedData;
  } catch (error) {
    console.error("Error processing job:", error);
  }
}

export const queryShowDataTask = inngest.createFunction(
  {
    id: "query-show-data",
    idempotency: "event.show.data",
  },
  { event: eventNames.QueryShowData },
  async ({ event }) => {
    const result = await queryShowData({ data: event.data });
    return { event, processed: result };
  },
);
