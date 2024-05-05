import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { findOrCreateUser, getReportCard, getStats } from "@/actions";
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

export const useSession = (options: UseSessionOptionsType = {}) => {
  const intervalRef = useRef<number>();

  const searchParams = useSearchParams();

  // get data key
  const dataKey = searchParams.get("dataKey");

  const querySessionId = searchParams.get("sessionID");

  const sessionId = querySessionId || createOrGetSessionId();

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<Awaited<
    ReturnType<typeof findOrCreateUser>
  > | null>(null);

  // user stats data
  const [stats, setStats] = useState<UserStatsType | null>(null);

  // user report card data
  const [reportCard, setReportCard] = useState<UserReportCardType | null>(null);

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
        throw new Error("No session ID found");
      }

      // get user data
      const data = await findOrCreateUser(sessionId);
      setUser(data);

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
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // refetch user data
  const refetch = async (interval?: number) => {
    if (dataKey && sessionId) {
      // this will make a request to the server
      await fetch(`/api/callback?sessionID=${sessionId}&dataKey=${dataKey}`);
    }

    // if interval is provided, fetch user data every interval
    if (interval) {
      const timer = setInterval(() => {
        getUser();

        console.log({ user });

        if (user?.state === "COMPLETED") {
          clearInterval(timer);
        }
      }, interval);

      intervalRef.current = timer as unknown as number;
    } else {
      getUser();
    }
  };

  // get user stats and report card data
  const getUserStatsAndReportCard = async () => {
    const fetchData = () => {
      // fetch user stats and report card data every 5 seconds
      const timer = setInterval(async () => {
        const stats = await getStats(sessionId);
        const reportCard = await getReportCard(sessionId);

        if (stats && reportCard) {
          updateData({ stats, reportCard });
          clearInterval(timer);
        }
      }, 5000);
    };

    if (dataKey && sessionId) {
      // this will make a request to the server
      await fetch(`/api/callback?sessionID=${sessionId}&dataKey=${dataKey}`);

      fetchData();
    } else if (sessionId) {
      fetchData();
    }
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
      refetch(options?.refetchInterval);
    }

    if (querySessionId) {
      storeSessionId(querySessionId);
    }
  }, []);

  useEffect(() => {
    if (dataKey) {
      refetch(5000);
    }
  }, [dataKey]);

  useEffect(() => {
    console.log({ user, stats, reportCard, effect: true });
    if (user && user.state === "COMPLETED" && reportCard && stats) {
      if (intervalRef?.current) {
        clearInterval(intervalRef.current);
      }
    }
  }, [stats, reportCard, user]);

  return {
    sessionId,
    user,
    stats,
    reportCard,
    loading,
    refetch,
    getUserStatsAndReportCard,
  };
};
