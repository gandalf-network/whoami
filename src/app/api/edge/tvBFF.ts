import { VercelRequest, VercelResponse } from "@vercel/node";

import { getAndUpdateTVBFF } from "@/actions";

export default async function (req: VercelRequest, res: VercelResponse) {
  const payload = req.body;
  try {
    await getAndUpdateTVBFF(payload);

    res.status(200).send("Job processed successfully");
  } catch (error) {
    console.error("Error processing job:", error);
    res.status(500).send("Error processing job");
  }
}
