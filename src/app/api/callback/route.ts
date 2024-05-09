import {
  enqueueActivityData,
  enqueueStateThresholdCheck,
} from "@/actions/lib/queue/producers";
import { removeNonAlphanumericLastChar } from "@/helpers/utils";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const searchParams = url.searchParams;
  const sessionID = searchParams.get("sessionID");
  let dataKey = searchParams.get("dataKey");

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

  dataKey = removeNonAlphanumericLastChar(dataKey);

  await enqueueActivityData(sessionID, dataKey);

  return new Response(JSON.stringify({ message: "Crunching you data..." }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
