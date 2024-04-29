import IORedis from 'ioredis';
import dotenv from 'dotenv';
dotenv.config();


export const vercelKVClient = new IORedis(process.env.KV_URL as string, {
    maxRetriesPerRequest: null,
});
