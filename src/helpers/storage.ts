import { setCookie, getCookie } from "cookies-next";

import { generateUUID, isWindowDefined } from "./utils";

export const cookiesKey = {
  sessionId: "whoami:sessionId",
  sessionData: "whoami:sessionData",
};

export const storeSessionId = (sessionId: string) => {
  setCookie(cookiesKey.sessionId, sessionId);
};

export const createOrGetSessionId = (options: { new?: boolean } | void) => {
  // get the session id from the local storage
  let sessionId = getCookie(cookiesKey.sessionId);

  // if the session id is not available
  // create a new session id and store it in the local storage
  if (!sessionId || options?.new) {
    sessionId = generateUUID();
    storeSessionId(sessionId);
  }

  // return the session id
  return sessionId;
};

export const initializeSessionId = async () => {
  try {
    // get the session id from the local storage
    const sessionId = getCookie(cookiesKey.sessionId);

    if (sessionId) {
      const res = await fetch(`/api/user?sessionID=${sessionId}`);
      const user = await res.json();

      if (!user?.id) {
        storeSessionId(generateUUID());
      }
    } else {
      storeSessionId(generateUUID());
    }
  } catch {
    storeSessionId(generateUUID());
  }
};

export const storeDataInSession = (value: any) => {
  if (!value) {
    return;
  }

  if (isWindowDefined()) {
    window.sessionStorage.setItem(
      cookiesKey.sessionData,
      JSON.stringify(value),
    );
  }
};

export const getDataFromSession = () => {
  if (isWindowDefined()) {
    const data = window.sessionStorage.getItem(cookiesKey.sessionData);
    return data ? JSON.parse(data) : null;
  }
};

export { getCookie, setCookie };
