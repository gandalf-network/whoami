import { VercelRequest, VercelResponse } from "@vercel/node";
import { getAndDumpActivities } from "@/actions";

export default async (
  req: VercelRequest,
  res: VercelResponse,
): Promise<void> => {
  const { sessionID, dataKey } = req.body;
  try {
    await getAndDumpActivities(sessionID, dataKey);
    res.status(200).send("Job processed successfully");
  } catch (error) {
    console.error("Error processing job:", error);
    res.status(500).send("Error processing job");
  }
};
