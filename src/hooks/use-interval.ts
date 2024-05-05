import { useEffect, useRef } from "react";

type useIntervalOptionType = {
  delay?: number;
  deps?: any[];
};

export const useInterval = (
  callback: () => void,
  { delay, deps }: useIntervalOptionType,
) => {
  const savedCallback = useRef<() => void>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    const func = () => {
      savedCallback.current?.();
    };

    if (delay !== null && delay !== undefined && delay > 0) {
      const id = setInterval(func, delay);
      return () => clearInterval(id);
    }
  }, [delay, ...(deps || [])]);
};
