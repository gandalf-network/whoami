import { findUser } from "@/actions";

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

    const user = await findUser(sessionID);

    console.log({ user });

    if (user) {
      return Response.json(user);
    } else {
      throw new Error("No user found");
    }
  } catch {
    return new Response(`No user found`, {
      status: 400,
    });
  }
}
