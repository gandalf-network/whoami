import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { findOrCreateUser, getReportCard, getStats } from "@/actions";
import { createOrGetSessionId } from "@/helpers/storage";
import {
  UseSessionOptionsType,
  UserReportCardType,
  UserStatsType,
} from "@/types";

export const useSession = (options: UseSessionOptionsType = {}) => {
  const searchParams = useSearchParams();

  // get data key
  const dataKey = searchParams.get("dataKey");

  const sessionId = searchParams.get("sessionID") || createOrGetSessionId();

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<Awaited<
    ReturnType<typeof findOrCreateUser>
  > | null>(null);

  // user stats data
  const [stats, setStats] = useState<UserStatsType | null>(null);

  // user report card data
  const [reportCard, setReportCard] = useState<UserReportCardType | null>(null);

  // get session id
  const getSessionId = () => {
    return sessionId;
  };

  // get user data
  const getUser = async () => {
    try {
      setLoading(true);
      // get session id
      const sessionId = getSessionId();

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
  const refetch = (interval?: number) => {
    // if interval is provided, fetch user data every interval
    if (interval) {
      const timer = setInterval(async () => {
        const data = await getUser();

        if (data.state === "COMPLETED") {
          clearInterval(timer);
        }
      }, interval);
    } else {
      getUser();
    }
  };

  // get user stats and report card data
  const getUserStatsAndReportCard = async () => {
    // get session id
    const sessionId = getSessionId();

    if (dataKey && sessionId) {
      console.log({ dataKey, sessionId });
      // this will make a request to the server
      await fetch(`/api/callback?sessionID=${sessionId}&dataKey=${dataKey}`);

      // fetch user stats and report card data every 5 seconds
      const timer = setInterval(async () => {
        const stats = await getStats(sessionId);
        const reportCard = await getReportCard(sessionId);

        console.log({ stats, reportCard });

        if (stats && reportCard) {
          setStats(stats);
          setReportCard(reportCard);
          clearInterval(timer);
        }
      }, 5000);
    }
  };

  useEffect(() => {
    // load user data on mount if loadOnMount is true
    if (options?.loadOnMount) {
      refetch(options?.refetchInterval);
    }
  }, []);

  useEffect(() => {
    getUserStatsAndReportCard();
  }, [dataKey]);

  return {
    sessionId: getSessionId(),
    user,
    stats,
    reportCard,
    loading,
    refetch,
  };
};
