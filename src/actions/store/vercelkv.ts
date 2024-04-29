import dotenv from "dotenv";
import IORedis from "ioredis";
dotenv.config();

export const vercelKVClient = new IORedis(process.env.KV_URL as string, {
  maxRetriesPerRequest: null,
});
