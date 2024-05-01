import dotenv from "dotenv";
import IORedis from "ioredis";
dotenv.config();

export const vercelKVClient = new IORedis(process.env.REDIS_URL as string, {
  maxRetriesPerRequest: null,
});
