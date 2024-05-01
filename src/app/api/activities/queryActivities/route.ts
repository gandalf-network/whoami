import { getAndDumpActivities } from "@/actions";

export async function POST(req: Request) {
  const { sessionID, dataKey } = (await req.json()) as {
    sessionID: string;
    dataKey: string;
  };
  try {
    const totalData = await getAndDumpActivities(sessionID, dataKey);
    return new Response(
      JSON.stringify({ message: "Job processed successfully", totalData }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    console.error("Error processing job:", error);
    return new Response(JSON.stringify({ message: "Error processing job" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
