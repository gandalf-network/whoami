export type UseSessionOptionsType = {
  onCompleted?: () => void;
  loadOnMount?: boolean;
  refetchInterval?: number;
} | void;
