import instantiateWorkers from "@/actions/worker";

export async function GET(req: Request) {
  const url = new URL(req.url);
  console.log(url);

  // instantiate workers
  try {
    instantiateWorkers();
  } catch (error) {
    console.log(error);
  }

  return new Response(JSON.stringify({ message: "Worker initiate" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
