import { getAndUpdateStarSignPicker } from "@/actions";

export async function POST(req: Request) {
  const { sessionID } = (await req.json()) as {
    sessionID: string;
  };
  try {
    const processedData = await getAndUpdateStarSignPicker(sessionID);
    return new Response(
      JSON.stringify({ message: "Job processed successfully", processedData }),
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
