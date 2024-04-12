import Connect from "@gandalf-network/connect";
import { useEffect, useState } from "react";

export const useGandalfConnect = () => {
  const [url, setUrl] = useState("");

  const [loading, setLoading] = useState(false);

  const init = new Connect({
    publicKey: process.env.NEXT_PUBLIC_GANDALF_PUBLIC_KEY as string,
    redirectURL: "https://yourapp.com/connect-success",
    services: { netflix: true },
  });

  const generateURL = async () => {
    try {
      setLoading(true);
      const connectUrl = await init.generateURL();
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
