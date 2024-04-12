import { redirect } from "next/navigation";

import { Loader } from "@/components/loader";
import { UserStories } from "@/components/stories";
import { Container } from "@/components/themed";

export default async function Page({ searchParams }: { searchParams: any }) {
  // redirect to home if id is present
  if (searchParams.id) {
    redirect("/");
  }

  return (
    <Container className="flex flex-col">
      <Loader loading>
        <UserStories />
      </Loader>
    </Container>
  );
}
