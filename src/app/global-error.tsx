"use client";

import { useEffect } from "react";

import { FeedbackScreen } from "@/components/screens/feedback";
import { Container } from "@/components/themed";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <Container className="relative">
          <FeedbackScreen
            title="Oops! Something went wrong"
            href="/"
            cta={{
              onClick: reset,
              children: "Continue",
            }}
          />
        </Container>
      </body>
    </html>
  );
}
