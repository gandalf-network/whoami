import instantiateWorkers from "@/actions/worker";

export async function GET(req: Request) {
  // instantiate workers
  instantiateWorkers();

  return new Response(JSON.stringify({ message: "Worker initiate" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
