"use client";

import Connect from "@gandalf-network/connect";
import { useRouter } from "next/navigation";

import { openLinkInNewTab } from "@/helpers/utils";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { ButtonProps } from "@/types";

import { Button } from "./button";

export const StartButton = (props: ButtonProps) => {
  const isMobile = useIsMobile();

  const router = useRouter();

  const onClick = async () => {
    // if user is not on mobile, goto the connect screen
    if (isMobile) {
      // Initialize Connect
      const connect = new Connect({
        publicKey: process.env.NEXT_PUBLIC_GANDALF_PUBLIC_KEY as string,
        redirectURL: "https://yourapp.com/connect-success",
        services: { netflix: true },
      });

      const connectUrl = await connect.generateURL();

      openLinkInNewTab(connectUrl);
    } else {
      router.push("/connect");
    }
  };

  return (
    <Button {...props} onClick={onClick}>
      Start
    </Button>
  );
};
