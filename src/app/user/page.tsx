"use client";

import { useEffect, useState } from "react";

import { Loader } from "@/components/loader";
import { UserStories } from "@/components/stories";
import { Container } from "@/components/themed";

export default function Page() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  return (
    <Container className="flex flex-col">
      <Loader loading={loading}>
        <UserStories />
      </Loader>
    </Container>
  );
}
