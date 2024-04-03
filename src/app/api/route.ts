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

  // Add vercel function here

  return new Response(JSON.stringify({ message: "Crunching you data..." }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
