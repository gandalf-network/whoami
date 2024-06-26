"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { findOrCreateUser, findUser, getReportCard, getStats } from "@/actions";
import {
  createOrGetSessionId,
  getDataFromSession,
  storeDataInSession,
  storeSessionId,
} from "@/helpers/storage";
import { parseStatsBigIntValueAsJSONReady } from "@/helpers/story";
import {
  UseSessionOptionsType,
  UserReportCardType,
  UserStatsType,
} from "@/types";

import { useInterval } from "./use-interval";

export const useSession = (options: UseSessionOptionsType = {}) => {
  const searchParams = useSearchParams();
  // get data key
  const dataKey = searchParams.get("dataKey");

  const querySessionId = searchParams.get("sessionID");

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<Awaited<
    ReturnType<typeof findOrCreateUser>
  > | null>(null);

  // user stats data
  const [stats, setStats] = useState<UserStatsType | null>(null);

  // user report card data
  const [reportCard, setReportCard] = useState<UserReportCardType | null>(null);

  // retries
  const [retries, setRetries] = useState(0);

  // session id state
  const [sessionId, setSessionId] = useState<string>(
    querySessionId || createOrGetSessionId(),
  );

  // store session valid state
  const [sessionValid, setSessionValid] = useState(true);

  const userKeyAvailable = !!(dataKey || sessionId);

  // update data
  const updateData = (data: {
    stats?: UserStatsType;
    reportCard?: UserReportCardType;
  }) => {
    if (data?.stats) {
      setStats(data.stats);
    }

    if (data?.reportCard) {
      setReportCard(data.reportCard);
    }
  };

  // get user data
  const getUser = async () => {
    try {
      setLoading(true);

      // if no session id is found, throw an error
      if (!sessionId) {
        // throw new Error("No session ID found");
      }

      // get user data
      const data = await findOrCreateUser(sessionId);

      setUser(data);

      if (data.state === "FAILED") {
        throw new Error("Internal server error while crunching the data");
      }

      // check if the user data is ready
      if (data.state === "STATS_DATA_READY") {
        const stats = await getStats(sessionId);

        if (stats) {
          updateData({ stats });
        }
      }

      if (data.state === "COMPLETED") {
        const _reportCard = await getReportCard(sessionId);
        const _stats = stats ? stats : await getStats(sessionId);

        updateData({ stats: _stats, reportCard: _reportCard });

        console.log({ _stats, _reportCard });

        if (_stats && _reportCard) {
          storeDataInSession({
            stats: parseStatsBigIntValueAsJSONReady(_stats),
            reportCard: _reportCard,
          });
        }

        // call the onCompleted callback if it exists
        if (options?.onCompleted) {
          options.onCompleted();
        }
      }

      return data;
    } catch (error) {
      router.push("/");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // pool user data
  const refetch = async () => {
    // if user key is not available, return
    if (!userKeyAvailable) {
      return;
    }

    // increment retries
    setRetries((prev) => prev + 1);

    // get user data
    await getUser();
  };

  useEffect(() => {
    /**
     * Get user data from the session storage
     * and set the stats and report card data
     * if it exists
     * This is useful when the user refreshes the page
     * and the data is still available in the session storage
     * so we can set the data from the session storage
     * and make a request to the server to get the latest data
     * if the data is not available in the session storage
     */
    if (getDataFromSession()) {
      const data = getDataFromSession();

      updateData(data);
    }

    // load user data on mount if loadOnMount is true
    if (options?.loadOnMount) {
      refetch();
    }

    if (options && options?.initializeUser) {
      const initUser = async () => {
        const user = await findOrCreateUser(sessionId);

        setUser(user);
        setSessionValid(true);
      };

      initUser();
    }

    if (querySessionId) {
      /**
       * If the querySessionId is available
       * we can assume that the user scanned the QR code
       * and we can store the session id in the session storage
       */
      const storeQuerySessionId = async () => {
        const user = await findUser(sessionId);

        if (user) {
          storeSessionId(querySessionId);
        }
      };

      storeQuerySessionId();
    }

    if (!sessionId) {
      setSessionValid(false);
    }
  }, []);

  useEffect(() => {
    const triggerCallback = async () => {
      let requestSessionId = sessionId;

      /**
       * If the querySessionId is not available
       * make a request to the server to get the user data
       * and if the user data is not available
       * create a new session id
       * and make a request to the server
       */
      if (!querySessionId) {
        const res = await fetch(`/api/user?sessionID=${sessionId}`);
        const user = await res.json();

        if (!user.id) {
          requestSessionId = createOrGetSessionId({ new: true });
          setSessionId(requestSessionId);
        }

        // set session valid state to true
        setSessionValid(true);
      } else {
        setSessionValid(true);
      }

      // this will make a request to the server
      await fetch(
        `/api/callback?sessionID=${requestSessionId}&dataKey=${dataKey}`,
      );

      // remove data key from the query params
      // router.replace("/stories", {
      //   scroll: false,
      // });
    };

    if (dataKey && sessionId) {
      triggerCallback();
    }
  }, [dataKey]);

  useInterval(refetch, {
    delay:
      (stats && reportCard) || retries >= 300 || !sessionValid
        ? undefined
        : options && options?.refetchInterval
          ? options.refetchInterval
          : 1000,
    deps: dataKey ? [dataKey] : undefined,
  });

  return {
    sessionId,
    user,
    stats,
    reportCard,
    loading,
    refetch,
  };
};
