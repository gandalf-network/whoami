import IORedis from 'ioredis';
export const redisClient = new IORedis(process.env.REDIS_URL as string);
