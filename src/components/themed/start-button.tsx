"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { initializeSessionId } from "@/helpers/storage";
import { openLinkInNewTab } from "@/helpers/utils";
import { useGandalfConnect } from "@/hooks/use-connect";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { ButtonProps } from "@/types";

import { Button } from "./button";

export const StartButton = (props: ButtonProps) => {
  const { url, loading } = useGandalfConnect();

  const [isLoading, setIsLoading] = useState(false);

  const isMobile = useIsMobile();

  const router = useRouter();

  const onClick = () => {
    if (isMobile) {
      openLinkInNewTab(url);
    } else {
      router.push("/connect");
    }
  };

  const init = async () => {
    try {
      setIsLoading(true);
      initializeSessionId();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    init();
  }, []);

  if (url && isMobile) {
    return (
      <a href={url} target="_blank" rel="noreferrer">
        <Button {...props} loading={loading || isLoading}>
          Start
        </Button>
      </a>
    );
  }

  return (
    <Button
      {...props}
      onClick={onClick}
      loading={isMobile && (loading || isLoading)}
    >
      Start
    </Button>
  );
};
