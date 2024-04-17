import { VercelRequest, VercelResponse } from '@vercel/node';
import { queryAndDumpActivities } from '../..';

export default async (req: VercelRequest, res: VercelResponse): Promise<void> => {
    const {sessionID, dataKey } = req.body;
    try {
        await queryAndDumpActivities(sessionID, dataKey);
        res.status(200).send('Job processed successfully');
    } catch (error) {
        console.error('Error processing job:', error);
        res.status(500).send('Error processing job');
    }
};
