import { getAndDumpActivities } from "@/actions";

export async function POST(req: Request) {
  const { sessionID, dataKey } = (await req.json()) as {
    sessionID: string;
    dataKey: string;
  };
  try {
    await getAndDumpActivities(sessionID, dataKey);
    return new Response("Job run successfully", {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error processing job:", error);
    return new Response("Error processing job", {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
