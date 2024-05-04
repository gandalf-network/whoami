import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { findOrCreateUser, getReportCard, getStats } from "@/actions";
import {
  createOrGetSessionId,
  getDataFromSession,
  storeDataInSession,
  storeSessionId,
} from "@/helpers/storage";
import {
  UseSessionOptionsType,
  UserReportCardType,
  UserStatsType,
} from "@/types";

export const useSession = (options: UseSessionOptionsType = {}) => {
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

      // call the onCompleted callback if it exists
      if (options?.onCompleted && data.state === "COMPLETED") {
        options.onCompleted();
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
      const timer = setInterval(async () => {
        const data = await getUser();

        console.log({ state: data?.state });

        if (data.state === "STATS_DATA_READY") {
          const stats = await getStats(sessionId);

          console.log({ stats });

          if (stats) {
            setStats(stats);
          }
        }

        if (data.state === "COMPLETED") {
          const reportCard = await getReportCard(sessionId);
          const _stats = stats ? await getStats(sessionId) : stats;

          console.log({ reportCard });

          if (reportCard) {
            setReportCard(reportCard);
          }

          if (_stats) {
            setStats(_stats);
          }

          storeDataInSession({ stats: _stats, reportCard });

          clearInterval(timer);
        }
      }, interval);
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
          setStats(stats);
          setReportCard(reportCard);
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
    console.log({ dataKey, sessionId });

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

      if (data.stats) {
        setStats(data.stats);
      }

      if (data.reportCard) {
        setReportCard(data.reportCard);
      }
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
