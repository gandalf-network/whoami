import { Worker, Job } from 'bullmq';
import { queueNames } from '../lib/queue/queues';
import { vercelKVClient } from '../store/vercelkv';

const queryActivitiesWorker  = () => {
  new Worker(queueNames.QueryActivities, async (job: Job) => {
    try {
      console.log(`Processing job ${job.id}`);
      
    } catch (error) {
      console.error('Error processing job:', error);
    }
  }, {connection: vercelKVClient });
};

const crawlRottenTomatoeWorker  = () => {
  new Worker(queueNames.CrawlRottenTomatoes, async (job: Job) => {
    try {
      console.log(`Processing job ${job.id}`);
      
    } catch (error) {
      console.error('Error processing job:', error);
    }
  }, {connection: vercelKVClient });
};

const queryShowDataWorker  = () => {
  new Worker(queueNames.QueryShowData, async (job: Job) => {
    try {
      console.log(`Processing job ${job.id}`);
     
    } catch (error) {
      console.error('Error processing job:', error);
    }
  }, {connection: vercelKVClient });
};

const queryShowActorsWorker  = () => {
  new Worker(queueNames.QueryShowActors, async (job: Job) => {
    try {
      console.log(`Processing job ${job.id}`);
     
    } catch (error) {
      console.error('Error processing job:', error);
    }
  }, {connection: vercelKVClient });
};


const genreDistributionWorker  = () => {
  new Worker(queueNames.GenreDistribution, async (job: Job) => {
    try {
      console.log(`Processing job ${job.id}`);
      
    } catch (error) {
      console.error('Error processing job:', error);
    }
  }, {connection: vercelKVClient });
};

const starSignPickerWorker  = () => {
  new Worker(queueNames.StarSignPicker, async (job: Job) => {
    try {
      console.log(`Processing job ${job.id}`);
     
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
  queryShowActorsWorker();
  genreDistributionWorker();
  starSignPickerWorker();
  console.log("> server workers ready ")
}