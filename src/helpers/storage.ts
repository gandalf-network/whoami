import { setCookie, getCookie } from "cookies-next";

import { generateUUID, isWindowDefined } from "./utils";

export const cookiesKey = {
  sessionId: "whoami:sessionId",
};

export const storeSessionId = (sessionId: string) => {
  setCookie(cookiesKey.sessionId, sessionId);
};

export const createOrGetSessionId = () => {
  // get the session id from the local storage
  let sessionId = getCookie(cookiesKey.sessionId);

  // if the session id is not available
  // create a new session id and store it in the local storage
  if (!sessionId) {
    sessionId = generateUUID();
    storeSessionId(sessionId);
  }

  // return the session id
  return sessionId;
};

export const storeDataInSession = (value: any) => {
  if (!value) {
    return;
  }

  if (isWindowDefined()) {
    window.sessionStorage.setItem(cookiesKey.sessionId, JSON.stringify(value));
  }
};

export const getDataFromSession = () => {
  if (isWindowDefined()) {
    const data = window.sessionStorage.getItem(cookiesKey.sessionId);
    return data ? JSON.parse(data) : null;
  }
};

export { getCookie, setCookie };
