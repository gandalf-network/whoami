import { Metadata, ResolvingMetadata } from "next";
import { redirect } from "next/navigation";

import { UserStories } from "@/components/stories";
import { Container } from "@/components/themed";
import { sharedMetadata } from "@/helpers/metadata";
import { AllStoryIds } from "@/types";

type PageProps = {
  params: {
    id: string;
    story: AllStoryIds;
  };
};

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const { id, story } = params;

  // fetch data
  const images = sharedMetadata.openGraph?.images;

  const description = sharedMetadata.openGraph?.description;

  const title = sharedMetadata.openGraph?.title;

  return {
    ...sharedMetadata,
    title,
    description,
    openGraph: {
      description,
      title,
      images,
      ...sharedMetadata.openGraph,
    },
    twitter: {
      ...sharedMetadata.twitter,
      description,
      title,
      images,
    },
  };
}

export default async function Page({ searchParams }: { searchParams: any }) {
  // redirect to home if id is present
  if (searchParams.id) {
    redirect("/");
  }

  return (
    <Container className="flex flex-col">
      <UserStories />
    </Container>
  );
}
