import { findOrCreateUserBySessionID } from "./user";

export async function getStats(sessionID: string) {
  const { user, error } = await findOrCreateUserBySessionID(sessionID);
  if (error !== null) {
    return { stats: null, error };
  }
}

export async function getReportCard(sessionID: string) {}

// Use Redis
export async function getSession(sessionID: string) {
  const { user, error } = await findOrCreateUserBySessionID(sessionID);
  if (user) {
    return {
      session: {
        state: user.state,
      },
      error: null,
    };
  }

  return { session: null, error };
}

export async function startSession(sessionID: string) {}
