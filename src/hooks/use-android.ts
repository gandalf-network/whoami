import { useEffect, useState } from "react";

import { isWindowDefined } from "@/helpers/utils";

export const useIsAndroid = () => {
  const [isAndroid, setIsAndroid] = useState(false);

  useEffect(() => {
    if (!isWindowDefined()) return;

    const userAgent = navigator.userAgent || navigator.vendor;

    window.alert(userAgent);

    if (navigator.userAgent.includes("Android") || /android/i.test(userAgent)) {
      setIsAndroid(true);
    }
  }, []);

  return isAndroid;
};
