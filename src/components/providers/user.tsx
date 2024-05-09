"use client";

import { createContext } from "@/helpers/context";
import { useSession } from "@/hooks/use-session";
import {
  UserFirstPhaseDataType,
  UserReportCardType,
  UserSecondPhaseDataType,
} from "@/types";

import { Loader } from "../loader";

export interface UserDataContextProps {
  firstPhaseData: UserFirstPhaseDataType;
  secondPhaseData: UserSecondPhaseDataType;
  reportCard: UserReportCardType;
}

export interface UserDataProviderProps {
  children?: React.ReactNode;
}

export const [UserDataContextProvider, useUserDataContext] =
  createContext<UserDataContextProps>();

export const UserDataProvider = (props: UserDataProviderProps) => {
  const { children } = props;

  const { firstPhaseData, secondPhaseData, reportCard } = useSession();
  const loading = !firstPhaseData && !secondPhaseData && !reportCard;
  console.log(firstPhaseData, secondPhaseData, reportCard, loading)
  return (
    <UserDataContextProvider
      value={{ firstPhaseData, secondPhaseData, reportCard }}
    >
      <Loader loading={loading}>{children}</Loader>
    </UserDataContextProvider>
  );
};

export const useUserData = () =>
  (useUserDataContext() || {}) as UserDataContextProps;
