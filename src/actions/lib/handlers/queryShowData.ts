import { VercelRequest, VercelResponse } from '@vercel/node';
import { getShowData } from '../..';

export default async (req: VercelRequest, res: VercelResponse): Promise<void> => {
    const { shows } = req.body;
    try {
        await getShowData(shows);
        res.status(200).send('Job processed successfully');
    } catch (error) {
        console.error('Error processing job:', error);
        res.status(500).send('Error processing job');
    }
};
