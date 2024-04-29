import { getShowData } from "@/actions";
import { ShowPayload } from "@/actions/lib/queue/producers";

export async function POST(req: Request) {
  const payload = (await req.json()) as ShowPayload;
  try {
    await getShowData(payload);
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
