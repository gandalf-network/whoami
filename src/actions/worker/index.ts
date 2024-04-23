import { Worker, Job } from 'bullmq';
import { queueNames } from '../lib/queue/queues';
import { vercelKVClient } from '../store/vercelkv';
import axios from 'axios';
import { ActivityDataPayload, ShowPayload, enqueueStarSignPicker, enqueueTVBFF } from '../lib/queue/producers';
import { getAndDumpActivities, getAndUpdateRottenTomatoesScore, getAndUpdateStarSignPicker, getAndUpdateTVBFF, getShowData } from '..';
import { QueueName, checkDependentQueuesThresold, incrementCompletedJobs, setAllQueueTotalJobs } from '../lib/queue/state';

const queryActivitiesWorker  = () => {
  new Worker(queueNames.QueryActivities, async (job: Job<ActivityDataPayload>) => {
    try {
      const { sessionID, dataKey } = job.data;

      // const url = `${process.env.VERCEL_FUNCTION_BASE_URL}/api/queryActivities`;

      // const response = await axios.post(url, {
      //   sessionID,
      //   dataKey
      // });

      let totalData = await getAndDumpActivities(sessionID, dataKey);
      await setAllQueueTotalJobs(sessionID, totalData)
      let queueName = queueNames.QueryActivities as QueueName;
      await incrementCompletedJobs(sessionID, queueName, totalData)

      // console.log(`Job ${job.id} processed successfully. Response:`, response.data);
    } catch (error) {
      console.error('Error processing job:', error);
    }
  }, {connection: vercelKVClient });
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

      if (await checkDependentQueuesThresold(showPayload.SessionID)) {
        await enqueueTVBFF(showPayload.SessionID)
        await enqueueStarSignPicker(showPayload.SessionID)
      }
    // console.log(`Job ${job.id} processed successfully. Response:`, response.data);
      
    } catch (error) {
      console.error('Error processing job:', error);
    }
  }, {connection: vercelKVClient });
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
  }, {connection: vercelKVClient });
};

const starSignPickerWorker  = () => {
  new Worker(queueNames.StarSignPicker, async (job: Job<ShowPayload>) => {
    try {
      const showPayload = job.data;
      console.log("StarSignPicker")

      // const url = `${process.env.VERCEL_FUNCTION_BASE_URL}/api/starSignPicker`;

      // const response = await axios.post(url, showPayload);

      // console.log(`Job ${job.id} processed successfully. Response:`, response.data);
      await getAndUpdateStarSignPicker(showPayload);
    } catch (error) {
      console.error('Error processing job:', error);
    }
  }, {connection: vercelKVClient });
};

const tvBFFWorker  = () => {
  new Worker(queueNames.TVBFF, async (job: Job<ShowPayload>) => {
    try {
      const showPayload = job.data;

      // const url = `${process.env.VERCEL_FUNCTION_BASE_URL}/api/tvBFF`;

      // const response = await axios.post(url, showPayload);

      // console.log(`Job ${job.id} processed successfully. Response:`, response.data);
      await getAndUpdateTVBFF(showPayload);
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
  console.log("> server workers ready ")
}