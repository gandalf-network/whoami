import { Metadata, ResolvingMetadata } from "next";
import { redirect } from "next/navigation";

import { getReportCard, getStats } from "@/actions";
import { UserStories } from "@/components/stories";
import { Container } from "@/components/themed";
import { buildOgImageUrl, sharedMetadata } from "@/helpers/metadata";
import { ReportsCardMockedData, TVStatsMockedData } from "@/helpers/mocked";
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

  try {
    // fetch data
    let images = sharedMetadata.openGraph?.images;

    const description = sharedMetadata.openGraph?.description;

    const title = sharedMetadata.openGraph?.title;

    // fetch data based on story kinds
    if (
      (
        [
          "firstTvShow",
          "mostWatchedTvShow",
          "totalShows",
          "crossoverStar",
          "tvGenre",
        ] as AllStoryIds[]
      ).includes(story)
    ) {
      // const {
      //   firstTvShow,
      //   mostWatchedTvShow,
      //   watchHistory,
      //   genreDistribution,
      //   yourCrossoverStar,
      // } = await getStats(id);
      const {
        firstTvShow,
        mostWatchedTvShow,
        watchHistory,
        genreDistribution,
        yourCrossoverStar,
      } = TVStatsMockedData;

      switch (story) {
        case "firstTvShow":
          images = buildOgImageUrl({
            story,
            data: {
              name: firstTvShow.show.title,
              imageUrl: firstTvShow.show.imageURL,
            },
          });
          break;
        case "mostWatchedTvShow":
          images = buildOgImageUrl({
            story,
            data: {
              name: mostWatchedTvShow.show.title,
              imageUrl: mostWatchedTvShow.show.imageURL,
            },
          });
          break;
        case "totalShows":
          images = buildOgImageUrl({
            story,
            data: {
              count: watchHistory.topShows.length,
              imageUrl: watchHistory.topShows.map((show) => show.imageURL),
            },
          });
          break;
        case "crossoverStar":
          images = buildOgImageUrl({
            story,
            data: {
              name: yourCrossoverStar.name,
              imageUrl: yourCrossoverStar.imageURL,
            },
          });
          break;
        case "tvGenre":
          images = buildOgImageUrl({
            story,
            data: {
              genres: genreDistribution.genres,
            },
          });
          break;
      }
    }

    if (
      (
        [
          "rottenTomatoesScore",
          "tvBff",
          "starSign",
          "overview",
        ] as AllStoryIds[]
      ).includes(story)
    ) {
      // const { personality, tvBFF, starSign } = await getReportCard(id);
      const { personality, tvBFF, starSign } = ReportsCardMockedData;

      switch (story) {
        case "rottenTomatoesScore":
          images = buildOgImageUrl({
            story,
            data: {
              score: personality.rtScore,
            },
          });
          break;
        case "tvBff":
          images = buildOgImageUrl({
            story,
            data: {
              name: tvBFF.name,
              show: tvBFF.show,
              imageUrl: tvBFF.imageURL,
            },
          });
          break;
        case "starSign":
          images = buildOgImageUrl({
            story,
            data: {
              name: starSign.name,
            },
          });
          break;
        case "overview":
          images = buildOgImageUrl({
            story,
            data: {
              score: personality.rtScore,
              tvBff: tvBFF.name,
              star: starSign.name,
              title: personality.personality,
            },
          });
          break;
      }
    }

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
  } catch {
    return sharedMetadata;
  }
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
