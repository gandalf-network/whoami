import axios from "axios";

export async function POST(req: Request) {
  const body = await req.json();

  const url = body?.url;

  if (!url) {
    return new Response("URL not found", {
      status: 422,
    });
  }

  try {
    const response = await axios.get(url, { responseType: "arraybuffer" });

    const base64Data =
      `data:${response.headers["content-type"]};base64,` +
      Buffer.from(response.data).toString("base64");

    // return Response.json(data)
    return new Response(base64Data, {
      status: 200,
    });
  } catch {
    return new Response("Error fetching image", { status: 500 });
  }
}
