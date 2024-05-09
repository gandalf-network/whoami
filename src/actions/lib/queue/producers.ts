import { inngest } from "@/actions/inngest/client";

import { eventNames } from "./event";

export interface ActivityDataPayload {
  sessionID: string;
  dataKey: string;
}

export async function enqueueActivityData(
  sessionID: string,
  dataKey: string,
): Promise<void> {
  try {
    await inngest.send({
      name: eventNames.QueryActivities,
      data: { sessionID, dataKey },
      id: sessionID,
    });
    return console.log("> enqueueActivityData: data successfully enqueued");
  } catch (error) {
    console.error("Failed to enqueue data", error);
    throw error;
  }
}

export type JobShow = {
  id: string;
  title: string;
  actors: string[];
};

const jobShow: JobShow = {
  id: "",
  title: "",
  actors: [""],
};

export type ShowPayload = {
  SessionID: string;
  Shows: JobShow[];
  JobID: string;
  ProceedNext?: boolean;
};

export async function enqueueRottenTomatoes(
  payload: ShowPayload,
): Promise<void> {
  try {
    await inngest.send({
      name: eventNames.CrawlRottenTomatoes,
      data: { ...payload },
      id: payload.JobID,
    });
    return console.log("> enqueueRottenTomatoes: data successfully enqueued");
  } catch (error) {
    console.error("enqueueRottenTomatoes: Failed to enqueue data", error);
    throw error;
  }
}

export async function enqueueShowData(payload: ShowPayload): Promise<void> {
  try {
    await inngest.send({
      name: eventNames.QueryShowData,
      data: { ...payload },
      id: payload.JobID,
    });
    return console.log("> enqueueShowData: data successfully enqueued");
  } catch (error) {
    console.error("Failed to enqueue data", error);
    throw error;
  }
}

export async function enqueueTVBFF(sessionID: string): Promise<void> {
  try {
    await inngest.send({
      name: eventNames.TVBFF,
      data: { sessionID },
      id: sessionID,
    });
    return console.log("> enqueueTVBFF: data successfully enqueued");
  } catch (error) {
    console.error("Failed to enqueue data", error);
    throw error;
  }
}

export async function enqueueStarSignPicker(sessionID: string): Promise<void> {
  try {
    await inngest.send({
      name: eventNames.StarSignPicker,
      data: { sessionID },
      id: sessionID,
    });
    return console.log("> enqueueStarSignPicker: data successfully enqueued");
  } catch (error) {
    console.error("Failed to enqueue data", error);
    throw error;
  }
}

export async function enqueueTVShowQuips(sessionID: string): Promise<void> {
  try {
    await inngest.send({
      name: eventNames.TVShowQuips,
      data: { sessionID },
      id: sessionID,
    });
    return console.log("> enqueueTVShowQuips: data successfully enqueued");
  } catch (error) {
    console.error("Failed to enqueue data", error);
    throw error;
  }
}

export async function enqueueStateThresholdCheck(
  sessionID: string,
): Promise<void> {
  try {
    await inngest.send({
      name: eventNames.StateThresholdCheck,
      data: { sessionID },
    });
    return console.log(
      "> enqueueStateThresholdCheck: data successfully enqueued",
    );
  } catch (error) {
    console.error("Failed to enqueue data", error);
    throw error;
  }
}


export async function enqueueFirstPhaseHandler(
  sessionID: string,
): Promise<void> {
  try {
    await inngest.send({
      name: eventNames.FirstPhaseHandler,
      data: { sessionID },
    });
    return console.log(
      "> enqueueFirstPhaseHandler: data successfully enqueued",
    );
  } catch (error) {
    console.error("Failed to enqueue data", error);
    throw error;
  }
}
