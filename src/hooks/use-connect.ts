import { useEffect, useState } from "react";

import { createOrGetSessionId } from "@/helpers/storage";
import { checkIfMobile, getEnvDetails } from "@/helpers/utils";

import { useIsAndroid } from "./use-android";

export const useGandalfConnect = () => {
  const [url, setUrl] = useState("");

  const [loading, setLoading] = useState(false);

  const isAndroid = useIsAndroid();

  const init = async () => {
    // lazy load the gandalf next import
    // ref: https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading#loading-external-libraries
    const Connect = (await import("@gandalf-network/connect")).default;

    const isMobile = checkIfMobile();

    const baseRedirectUrl = `${getEnvDetails().url}/stories`;
    const redirectURL = isMobile
      ? baseRedirectUrl
      : `${baseRedirectUrl}?sessionID=${createOrGetSessionId()}`;

    const getConnectPlatform = () => {
      if (!isMobile) {
        return "UNIVERSAL";
      }

      if (isAndroid) {
        return "ANDROID";
      }

      return undefined;
    };

    const res = new Connect({
      publicKey: process.env.NEXT_PUBLIC_GANDALF_PUBLIC_KEY as string,
      redirectURL,
      services: {
        netflix: {
          activities: ["WATCH"],
        },
      },
      options: {
        style: {
          primaryColor: "#000000",
          backgroundColor: "#FFFFFF",
          foregroundColor: "#000000",
          accentColor: "#FFB3EF",
        },
      },
      platform: getConnectPlatform() as any,
    });

    return res;
  };

  const generateURL = async () => {
    try {
      setLoading(true);
      const connectUrl = await (await init()).generateURL();
      setUrl(connectUrl);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Initiating Gandalf Connect");
    generateURL();
  }, []);

  return { init, url, loading };
};
