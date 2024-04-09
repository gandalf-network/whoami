import { VercelRequest, VercelResponse } from '@vercel/node';
import { Job, Queue, Worker } from 'bullmq';
import { queueNames } from '../queue/queues';

export default async (req: VercelRequest, res: VercelResponse): Promise<void> => {
    const jobData = req.body;

    try {
        console.log(`Processing job with data: ${JSON.stringify(jobData)}`);
        // Execute logic......
        // ======

        // ======
        // Move to another workflow by pushing data into queue......
        res.status(200).send('Job processed successfully');
    } catch (error) {
        console.error('Error processing job:', error);
        res.status(500).send('Error processing job');
    }
};
