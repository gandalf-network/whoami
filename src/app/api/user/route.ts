import { getUser } from "@/actions";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const searchParams = url.searchParams;
  const sessionID = searchParams.get("sessionID");

  try {
    if (!sessionID) {
      return new Response("Session id not found", {
        status: 422,
      });
    }

    const user = await getUser(sessionID);

    if (user) {
      return Response.json(user);
    } else {
      return new Response(`No user found`, {
        status: 400,
      });
    }
  } catch {
    return new Response(`No user found`, {
      status: 400,
    });
  }
}
