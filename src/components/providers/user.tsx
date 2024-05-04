"use client";
import { createContext } from "@/helpers/context";
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

  const { stats, reportCard } = useSession({ loadOnMount: true });

  const loading = !stats && !reportCard;

  return (
    <UserDataContextProvider value={{ stats, reportCard }}>
      <Loader loading={loading}>{children}</Loader>
    </UserDataContextProvider>
  );
};

export const useUserData = () =>
  (useUserDataContext() || {}) as UserDataContextProps;
