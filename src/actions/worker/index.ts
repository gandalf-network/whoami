import { Worker, Job } from 'bullmq';
import { queueNames } from '../lib/queue/queues';
import { vercelKVClient } from '../store/vercelkv';
import axios from 'axios';
import { ActivityDataPayload, ShowPayload } from '../lib/queue/producers';

const queryActivitiesWorker  = () => {
  new Worker(queueNames.QueryActivities, async (job: Job<ActivityDataPayload>) => {
    try {
      const { sessionID, dataKey } = job.data;

      const url = `${process.env.VERCEL_FUNCTION_BASE_URL}/api/queryActivities`;

      const response = await axios.post(url, {
        sessionID,
        dataKey
      });

      console.log(`Job ${job.id} processed successfully. Response:`, response.data);
    } catch (error) {
      console.error('Error processing job:', error);
    }
  }, {connection: vercelKVClient });
};

const crawlRottenTomatoeWorker  = () => {
  new Worker(queueNames.CrawlRottenTomatoes, async (job: Job<ShowPayload>) => {
    try {
      const showPayload = job.data;

      const url = `${process.env.VERCEL_FUNCTION_BASE_URL}/api/crawlRottenTomatoes`;

      const response = await axios.post(url, showPayload);

      console.log(`Job ${job.id} processed successfully. Response:`, response.data);
      
    } catch (error) {
      console.error('Error processing job:', error);
    }
  }, {connection: vercelKVClient });
};

const queryShowDataWorker  = () => {
  new Worker(queueNames.QueryShowData,async (job: Job<ShowPayload>) => {
    try {
      const showPayload = job.data;

      const url = `${process.env.VERCEL_FUNCTION_BASE_URL}/api/queryShowData`;

      const response = await axios.post(url, showPayload);

      console.log(`Job ${job.id} processed successfully. Response:`, response.data);
      
    } catch (error) {
      console.error('Error processing job:', error);
    }
  }, {connection: vercelKVClient });
};

const starSignPickerWorker  = () => {
  new Worker(queueNames.StarSignPicker, async (job: Job<ShowPayload>) => {
    try {
      const showPayload = job.data;

      const url = `${process.env.VERCEL_FUNCTION_BASE_URL}/api/starSignPicker`;

      const response = await axios.post(url, showPayload);

      console.log(`Job ${job.id} processed successfully. Response:`, response.data);
      
    } catch (error) {
      console.error('Error processing job:', error);
    }
  }, {connection: vercelKVClient });
};

const tvBFFWorker  = () => {
  new Worker(queueNames.TVBFF, async (job: Job<ShowPayload>) => {
    try {
      const showPayload = job.data;

      const url = `${process.env.VERCEL_FUNCTION_BASE_URL}/api/tvBFF`;

      const response = await axios.post(url, showPayload);

      console.log(`Job ${job.id} processed successfully. Response:`, response.data);
      
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