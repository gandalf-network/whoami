import IORedis from 'ioredis';

export const vercelKVClient = new IORedis(process.env.KV_URL as string, {
    maxRetriesPerRequest: null,
});