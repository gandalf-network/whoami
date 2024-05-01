import { getShowData } from "@/actions";
import { ShowPayload } from "@/actions/lib/queue/producers";

export async function POST(req: Request) {
  const payload = (await req.json()) as ShowPayload;
  try {
    let result = await getShowData(payload);
    return new Response(
      JSON.stringify({ message: "Job processed successfully", result }),
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
