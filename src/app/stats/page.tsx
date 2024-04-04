"use client";

import { Container, PageHeader, Stories } from "@/components/themed";

const story = {
  duration: 5000,
  content: ({ action, isPaused }: any) => {
    return (
      <div className="py-6 px-4 bg-primary-cyan w-full h-full">
        <PageHeader name="TV Stats" />
      </div>
    );
  },
};

export default function Page() {
  return (
    <Container className="flex flex-col">
      <Stories
        loop
        width="100%"
        height="100%"
        stories={[
          story,
          story,
          story,
          story,
          story,
          story,
          story,
          story,
          story,
          story,
          story,
        ]}
      />
    </Container>
  );
}
