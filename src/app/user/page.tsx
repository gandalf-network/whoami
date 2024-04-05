"use client";

import { UserStories } from "@/components/stories";
import { Container } from "@/components/themed";

export default function Page() {
  return (
    <Container className="flex flex-col">
      <UserStories />
    </Container>
  );
}
