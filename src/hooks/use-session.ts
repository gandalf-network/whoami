import { useEffect, useState } from "react";

import { findOrCreateUser } from "@/actions";
import { createOrGetSessionId } from "@/helpers/storage";
import { UseSessionOptionsType } from "@/types";

export const useSession = (options: UseSessionOptionsType = {}) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<Awaited<
    ReturnType<typeof findOrCreateUser>
  > | null>(null);

  const getSessionId = () => {
    return createOrGetSessionId();
  };

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

  const refetch = (interval?: number) => {
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

  useEffect(() => {
    // load user data on mount if loadOnMount is true
    if (options?.loadOnMount) {
      refetch(options?.refetchInterval);
    }
  }, []);

  return {
    sessionId: getSessionId(),
    user,
    loading,
    refetch,
  };
};
