import { Loader } from "@/components/loader";
import { UserStories } from "@/components/stories";
import { Container } from "@/components/themed";
import { getStoryIndex } from "@/helpers/story";

export default async function Page({ searchParams }: { searchParams: any }) {
  const storyIndex = getStoryIndex(searchParams.id);

  return (
    <Container className="flex flex-col">
      <Loader>
        <UserStories currentIndex={storyIndex} />
      </Loader>
    </Container>
  );
}
