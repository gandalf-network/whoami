import { findUser } from "@/actions";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const searchParams = url.searchParams;
  const sessionID = searchParams.get("sessionID");

  try {
    if (!sessionID) {
      return Response.json({ error: "No sessionID found" }, { status: 404 });
    }

    const user = await findUser(sessionID);

    if (user) {
      return Response.json(user);
    } else {
      throw new Error("No user found");
    }
  } catch {
    return Response.json({ error: "No user found" }, { status: 404 });
  }
}
