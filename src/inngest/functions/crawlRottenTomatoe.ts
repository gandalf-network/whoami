import { getAndUpdateRottenTomatoesScore } from "@/actions";
import { eventNames } from "@/actions/lib/queue/event";
import { ShowPayload } from "@/actions/lib/queue/producers";
import {
  QueueName,
  getQueueSessionState,
  queueNames,
  setQueueSessionState,
} from "@/actions/lib/queue/state";

import { inngest } from "../client";

async function crawlRottenTomatoes(event: { data: ShowPayload }) {
  try {
    console.log("Recv crawlRottenTomatoes request...");
    const showPayload = event.data;
    const processedData = await getAndUpdateRottenTomatoesScore(showPayload);
    const queueName = queueNames.CrawlRottenTomatoes as QueueName;

    const [, executedChunks] = await getQueueSessionState(
      showPayload.SessionID,
      queueName,
    );
    await setQueueSessionState(
      showPayload.SessionID,
      queueName,
      processedData,
      executedChunks + 1,
    );
    return processedData;
  } catch (error) {
    console.error("Error processing job:", error);
  }
}

export const crawlRottenTomatoesTask = inngest.createFunction(
  {
    id: "crawl-rotten-tomatoes",
    // idempotency: "event.crawl.rottentomatoes",
    concurrency: 50,
  },
  { event: eventNames.CrawlRottenTomatoes },
  async ({ event }) => {
    const result = await crawlRottenTomatoes({ data: event.data });
    return {
      event,
      processed: result,
    };
  },
);
