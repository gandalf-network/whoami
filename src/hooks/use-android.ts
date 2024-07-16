import { useEffect, useState } from "react";

import { isWindowDefined } from "@/helpers/utils";

export const useIsAndroid = () => {
  const [isAndroid, setIsAndroid] = useState(false);

  useEffect(() => {
    const userAgent = isWindowDefined() ? navigator.userAgent : undefined;

    if (!userAgent) return;

    alert(
      `${userAgent} ${
        navigator.userAgent.includes("Android") || /android/i.test(userAgent)
          ? "Android"
          : "Not Android"
      }`,
    );

    setIsAndroid(
      navigator.userAgent.includes("Android") || /android/i.test(userAgent),
    );
  }, []);

  return isAndroid;
};
