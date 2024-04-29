import { getAndUpdateStarSignPicker } from "@/actions";

export async function GET(req: Request) {
  const payload = await req.json();
  try {
    await getAndUpdateStarSignPicker(payload);
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
