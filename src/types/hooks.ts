export type UseSessionOptionsType = {
  onCompleted?: () => void;
  loadOnMount?: boolean;
  refetchInterval?: number;
  initializeUser?: boolean;
} | void;
