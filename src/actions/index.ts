import { getReportCardResponse, getStatsResponse } from "./database";
import { findOrCreateUserBySessionID } from "./database/user";

export async function findOrCreateUser(sessionID: string) {
  return findOrCreateUserBySessionID(sessionID);
}

export async function getStats(sessionID: string) {
  return getStatsResponse(sessionID);
}

export async function getReportCard(sessionID: string) {
  return getReportCardResponse(sessionID);
}
