import { VercelRequest, VercelResponse } from "@vercel/node";

import { getAndUpdateStarSignPicker } from "@/actions";

export default async (
  req: VercelRequest,
  res: VercelResponse,
): Promise<void> => {
  const payload = req.body;
  try {
    await getAndUpdateStarSignPicker(payload);

    res.status(200).send("Job processed successfully");
  } catch (error) {
    console.error("Error processing job:", error);
    res.status(500).send("Error processing job");
  }
};
