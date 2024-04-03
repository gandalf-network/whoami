import whoamiQueue from "@/server/helpers/queue";

interface GetShowsFromSauronJobPayload {
  dataKey: string;
  sessionID: string;
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const searchParams = url.searchParams;
  const sessionID = searchParams.get("sessionID");
  const dataKey = searchParams.get("dataKey");

  if (!sessionID || !dataKey) {
    return new Response(
      JSON.stringify({ error: "Query Parameters not Provided" }),
      {
        status: 422,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }

  const getShowsFromSauronJobPayload: GetShowsFromSauronJobPayload = {
    dataKey,
    sessionID,
  };

  await whoamiQueue.add(getShowsFromSauronJobPayload);

  return new Response(JSON.stringify({ message: "Crunching you data..." }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
