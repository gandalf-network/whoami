import { VercelRequest, VercelResponse } from "@vercel/node";

import { getAndUpdateRottenTomatoesScore } from "@/actions";
import { ShowPayload } from "@/actions/lib/queue/producers";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const payload: ShowPayload = req.body;
  try {
    await getAndUpdateRottenTomatoesScore(payload);
    res.status(200).send("Job processed successfully");
  } catch (error) {
    console.error("Error processing job:", error);
    res.status(500).send("Error processing job");
  }
}
