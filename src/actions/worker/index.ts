import { Worker, Job } from 'bullmq';
import { stateThresholdCheckQueue, queueNames } from '@/actions/lib/queue/queues';
import { vercelKVClient } from '../store/vercelkv';
import axios from 'axios';
import { ActivityDataPayload, ShowPayload, enqueueStarSignPicker, enqueueTVBFF } from '../lib/queue/producers';
import { getAndDumpActivities, getAndUpdateRottenTomatoesScore, getAndUpdateStarSignPicker, getAndUpdateTVBFF, getShowData, updateUserStateBySession } from '..';
import { QueueName, checkDependentQueuesThresold, checkIndependentQueuesThresold, checkQueueThresold, getSessionsByState, incrementCompletedJobs, sessionStates, setAllQueueTotalJobs, setSessionIndex } from '../lib/queue/state';
import { UserState } from '@prisma/client';

const concurrency = 50
const queryActivitiesWorker  = async  () => {
  new Worker(queueNames.QueryActivities, async (job: Job<ActivityDataPayload>) => {
    try {
      const { sessionID, dataKey } = job.data;

      // const url = `${process.env.VERCEL_FUNCTION_BASE_URL}/api/queryActivities`;

      // const response = await axios.post(url, {
      //   sessionID,
      //   dataKey
      // });

      let totalData = await getAndDumpActivities(sessionID, dataKey);
      await setSessionIndex(sessionID, sessionStates.PROCESSING)
      await updateUserStateBySession(sessionID, UserState.CRUNCHING_DATA)
      await setAllQueueTotalJobs(sessionID, totalData)

      let queueName = queueNames.QueryActivities as QueueName;
      await incrementCompletedJobs(sessionID, queueName, totalData)
      console.log("totalData:", totalData)

      // console.log(`Job ${job.id} processed successfully. Response:`, response.data);
    } catch (error) {
      console.error('Error processing job:', error);
    }
  }, {connection: vercelKVClient, concurrency });
};

const crawlRottenTomatoeWorker  = () => {
  new Worker(queueNames.CrawlRottenTomatoes, async (job: Job<ShowPayload>) => {
    try {
      const showPayload = job.data;

      // const url = `${process.env.VERCEL_FUNCTION_BASE_URL}/api/crawlRottenTomatoes`;

      // const response = await axios.post(url, showPayload);

      let processedData = await getAndUpdateRottenTomatoesScore(showPayload);
      let queueName = queueNames.CrawlRottenTomatoes as QueueName;
      await incrementCompletedJobs(showPayload.SessionID, queueName, processedData)
    // console.log(`Job ${job.id} processed successfully. Response:`, response.data);
      
    } catch (error) {
      console.error('Error processing job:', error);
    }
  }, {connection: vercelKVClient , concurrency });
};

const queryShowDataWorker  = () => {
  new Worker(queueNames.QueryShowData,async (job: Job<ShowPayload>) => {
    try {
      const showPayload = job.data;

      // const url = `${process.env.VERCEL_FUNCTION_BASE_URL}/api/queryShowData`;

      // const response = await axios.post(url, showPayload);

      // console.log(`Job ${job.id} processed successfully. Response:`, response.data);
      let processedData =  await getShowData(showPayload);
      let queueName = queueNames.QueryShowData as QueueName;
      await incrementCompletedJobs(showPayload.SessionID, queueName, processedData)

    } catch (error) {
      console.error('Error processing job:', error);
    }
  }, {connection: vercelKVClient, concurrency });
};

const starSignPickerWorker  = () => {
  new Worker(queueNames.StarSignPicker, async (job: Job) => {
    try {
      const { sessionID } = job.data;

      // const url = `${process.env.VERCEL_FUNCTION_BASE_URL}/api/starSignPicker`;

      // const response = await axios.post(url, showPayload);

      // console.log(`Job ${job.id} processed successfully. Response:`, response.data);
      const processedData = await getAndUpdateStarSignPicker(sessionID);
      let queueName = queueNames.StarSignPicker as QueueName;
      await incrementCompletedJobs(sessionID, queueName, processedData)

    } catch (error) {
      console.error('Error processing job:', error);
    }
  }, {connection: vercelKVClient, concurrency });
};

const tvBFFWorker  = () => {
  new Worker(queueNames.TVBFF, async (job: Job) => {
    try {
      const { sessionID } = job.data;

      // const url = `${process.env.VERCEL_FUNCTION_BASE_URL}/api/tvBFF`;

      // const response = await axios.post(url, showPayload);

      // console.log(`Job ${job.id} processed successfully. Response:`, response.data);
      let processedData = await getAndUpdateTVBFF(sessionID);
      let queueName = queueNames.TVBFF as QueueName;
      await incrementCompletedJobs(sessionID, queueName, processedData)

    } catch (error) {
      console.error('Error processing job:', error);
    }
  }, {connection: vercelKVClient, concurrency });
};

const checkDependentQueuesThresoldWorker  = () => {
  stateThresholdCheckQueue.add(queueNames.StateThresholdCheck, {}, {
    repeat: {
      every: 30000,
      limit: 100,
    },
  });

  new Worker(queueNames.StateThresholdCheck, async (job: Job) => {
    try {
      console.log("> checking state threshold ")
      let sessionIDs = await getSessionsByState(sessionStates.PROCESSING)
      for(const sessionID of sessionIDs) {
        if (await checkIndependentQueuesThresold(sessionID)) {
          await setSessionIndex(sessionID, sessionStates.COMPLETED)
          await updateUserStateBySession(sessionID, UserState.COMPLETED)
          continue;
        }

        if (await checkDependentQueuesThresold(sessionID)) {
          if (!await checkQueueThresold(sessionID, queueNames.TVBFF as QueueName)) {
            await enqueueTVBFF(sessionID)
          }

          if (!await checkQueueThresold(sessionID, queueNames.StarSignPicker as QueueName)) {
            await enqueueStarSignPicker(sessionID)
          }
        }
      }
    } catch (error) {
      console.error('Error processing job:', error);
    }
  }, {connection: vercelKVClient });
};

export default ()=> {
  console.log("> initiate server workers")
  queryActivitiesWorker();
  crawlRottenTomatoeWorker();
  queryShowDataWorker();
  starSignPickerWorker();
  tvBFFWorker();
  checkDependentQueuesThresoldWorker();
  console.log("> server workers ready ")
}