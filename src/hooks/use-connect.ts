import { useEffect, useState } from "react";

import { getEnvDetails } from "@/helpers/utils";

export const useGandalfConnect = () => {
  const [url, setUrl] = useState("");

  const [loading, setLoading] = useState(false);

  const init = async () => {
    // lazy load the gandalf next import
    // ref: https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading#loading-external-libraries
    const Connect = (await import("@gandalf-network/connect")).default;

    const res = new Connect({
      publicKey: process.env.NEXT_PUBLIC_GANDALF_PUBLIC_KEY as string,
      redirectURL:
        process.env.NEXT_PUBLIC_GANDALF_REDIRECT_URL ||
        `${getEnvDetails().url}/stories`,
      services: { netflix: true },
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
