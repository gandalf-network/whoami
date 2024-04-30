import { getAndUpdateStarSignPicker } from "@/actions";

export async function POST(req: Request) {
  const payload = await req.json();
  try {
    await getAndUpdateStarSignPicker(payload);
    return new Response(
      JSON.stringify({ message: "Job processed successfully" }),
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
