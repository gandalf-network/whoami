"use client";

import { useEffect, useState } from "react";

import { getReportCard, getStats } from "@/actions";
import { createContext } from "@/helpers/context";
import { createOrGetSessionId } from "@/helpers/storage";
import { useSession } from "@/hooks/use-session";
import { UserReportCardType, UserStatsType } from "@/types";

import { Loader } from "../loader";

export interface UserDataContextProps {
  stats: UserStatsType;
  reportCard: UserReportCardType;
}

export interface UserDataProviderProps {
  children?: React.ReactNode;
}

export const [UserDataContextProvider, useUserDataContext] =
  createContext<UserDataContextProps>();

export const UserDataProvider = (props: UserDataProviderProps) => {
  const { children } = props;

  const sessionId = createOrGetSessionId();

  const { user } = useSession({ loadOnMount: true, refetchInterval: 5000 });

  const [stats, setStats] = useState<UserStatsType | null>(null);

  const [reportCard, setReportCard] = useState<UserReportCardType | null>(null);

  const loading = !stats || !reportCard;

  useEffect(() => {
    // ...
    if (user && user?.state === "COMPLETED") {
      getStats(sessionId).then(setStats);
      getReportCard(sessionId).then(setReportCard);
    }
  }, [user?.state]);

  return (
    <UserDataContextProvider value={{ stats, reportCard }}>
      <Loader loading={loading}>{children}</Loader>
    </UserDataContextProvider>
  );
};
