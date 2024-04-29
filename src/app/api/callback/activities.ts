import { NextRequest } from "next/server";

import { getAndDumpActivities } from "@/actions";

export async function GET(req: NextRequest) {
  const { sessionID, dataKey } = req.body as any;

  await getAndDumpActivities(sessionID, dataKey);

  return new Response("Job processed successfully", {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
