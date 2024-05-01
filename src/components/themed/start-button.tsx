"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import instantiateWorkers from "@/actions/worker";
import { createOrGetSessionId } from "@/helpers/storage";
import { openLinkInNewTab } from "@/helpers/utils";
import { useIsAndroid } from "@/hooks/use-android";
import { useGandalfConnect } from "@/hooks/use-connect";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { ButtonProps } from "@/types";

import { Button } from "./button";

export const StartButton = (props: ButtonProps) => {
  const { url, loading } = useGandalfConnect();

  const isAndroid = useIsAndroid();

  const isMobile = useIsMobile();

  const router = useRouter();

  const onClick = () => {
    if (isMobile) {
      openLinkInNewTab(url);
    } else {
      router.push("/connect");
    }
  };

  useEffect(() => {
    createOrGetSessionId();
    instantiateWorkers();
  }, []);

  if (url && isMobile) {
    return (
      <a href={url} target="_blank" rel="noreferrer">
        <Button {...props} loading={loading}>
          Start
        </Button>
      </a>
    );
  }

  return (
    <Button
      {...props}
      disabled={isAndroid}
      onClick={onClick}
      loading={isMobile && loading}
    >
      Start
    </Button>
  );
};
