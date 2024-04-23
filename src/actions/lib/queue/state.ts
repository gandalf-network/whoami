/**
 * State Tracking in Workflow:
 * 
 * Designed to oversee the progress of tasks distributed across various queues, this state tracking logic uses a 
 * `sessionId` as a unique identifier for collections of tasks tailored to specific user activities. This identifier 
 * is key to efficiently monitoring, tracking, and aggregating job statuses throughout different phases of the processing 
 * workflow. Each job's state is dynamically updated to reflect its current state based on the total jobs and completed jobs, 
 * ensuring real-time oversight of the workflow.
 * 
 * The idea is to employ a dynamic percentage completion model to gauge the progress of each job:
 * - 0% indicates a job is identified but not yet initiated.
 * - 1% to 99% indicates that a job is currently been processed.
 * - 100% completion signifies a job has been successfully completed but we only care about 97% completion.
 */

import { kv } from "@vercel/kv";

export type QueueName = 'queryActivities' | 'queryShowData'  | 'tvBFF' | 'starSignPicker' | 'crawlRottenTomatoe';
export type QueueCompletion = number;

const makeKey = (sessionId: string, queueName: QueueName, suffix: string) => `session:${sessionId}:queue:${queueName}:${suffix}`;

const COMPLETION_THRESHOLD = 97;

export async function setQueueStateInRedis(sessionId: string, queueName: QueueName, totalJobs: number) {
  await kv.set(makeKey(sessionId, queueName, 'totalJobs'), totalJobs.toString());
  await kv.set(makeKey(sessionId, queueName, 'completedJobs'), '0');
}

export async function setAllQueueTotalJobs(sessionId: string, totalJobs: number) {
  const queues: QueueName[] = ['queryActivities', 'queryShowData', 'crawlRottenTomatoe'];
  for (const queueName of queues) {
    setQueueStateInRedis(sessionId, queueName, totalJobs)
  }
}

export async function getQueueCompletion(sessionId: string, queueName: QueueName): Promise<number> {
  let totalJobsKey = makeKey(sessionId, queueName, 'totalJobs');
  let completedJobsKey = makeKey(sessionId, queueName, 'completedJobs');

  let totalJobsString: string | null = await kv.get(totalJobsKey);
  let completedJobsString: string | null = await kv.get(completedJobsKey);

  let totalJobs = parseInt(totalJobsString || '0');
  let completedJobs = parseInt(completedJobsString || '0');

  return (completedJobs / totalJobs) * 100;
}

export async function incrementCompletedJobs(sessionId: string, queueName: QueueName, jobs: number) {
  let completedJobsKey = makeKey(sessionId, queueName, 'completedJobs');

  let completedJobsString: string | null = await kv.get(completedJobsKey);
  let completedJobs = parseInt(completedJobsString || '0');
  completedJobs += jobs;

  await kv.set(completedJobsKey, completedJobs.toString());
}

export async function checkDependentQueuesThresold(sessionId: string): Promise<boolean> {
  let queuesToCheck: QueueName[] = ['queryActivities', 'queryShowData', 'crawlRottenTomatoe'];
  let canTrigger = true;

  for (let queueName of queuesToCheck) {
    let completion = await getQueueCompletion(sessionId, queueName as QueueName);
    if (completion < COMPLETION_THRESHOLD) {
      canTrigger = false;
      break;
    }
  }

  return canTrigger
}

