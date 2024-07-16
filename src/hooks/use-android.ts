import { useEffect, useState } from "react";

import { isDeviceAndroid } from "@/helpers/utils";

export const useIsAndroid = () => {
  const [isAndroid, setIsAndroid] = useState(false);

  useEffect(() => {
    setIsAndroid(isDeviceAndroid());
  }, []);

  return isAndroid;
};
