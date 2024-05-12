import { Metadata, ResolvingMetadata } from "next";

import { getReportCard, getStats } from "@/actions";
import { LandingScreen } from "@/components/screens/landing";
import { UserStories } from "@/components/stories";
import { Container } from "@/components/themed";
import { buildOgImageUrl, sharedMetadata } from "@/helpers/metadata";
import { replaceAmpersandWithAnd } from "@/helpers/utils";
import { AllStoryIds } from "@/types";

type PageProps = {
  searchParams: {
    id: string;
    story: AllStoryIds;
  };
};

export async function generateMetadata(
  { searchParams }: PageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const { id, story } = searchParams;

  // fetch data
  let images = sharedMetadata.openGraph?.images;

  const description = story
    ? "Check out whoami.tv to find out yours!"
    : sharedMetadata.openGraph?.description;

  let title = sharedMetadata.openGraph?.title;

  try {
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
      // @note: this is the mocked data and should be replaced with the actual data
      // const {
      //   firstTvShow,
      //   mostWatchedTvShow,
      //   watchHistory,
      //   genreDistribution,
      //   yourCrossoverStar,
      // } = TVStatsMockedData;

      const {
        firstTvShow,
        mostWatchedTvShow,
        watchHistory,
        genreDistribution,
        yourCrossoverStar,
      } = await getStats(id);

      switch (story) {
        case "firstTvShow":
          title = `My first TV show is ${firstTvShow.show.title}`;
          images = buildOgImageUrl({
            story,
            data: {
              name: replaceAmpersandWithAnd(firstTvShow.show.title),
              imageUrl: firstTvShow.show.imageURL,
            },
          });
          break;
        case "mostWatchedTvShow":
          title = `My most watched TV show is ${mostWatchedTvShow.show.title}`;
          images = buildOgImageUrl({
            story,
            data: {
              name: replaceAmpersandWithAnd(mostWatchedTvShow.show.title),
              imageUrl: mostWatchedTvShow.show.imageURL,
            },
          });
          break;
        case "totalShows":
          title = `I have watched ${watchHistory.totalShowsWatched} Netflix shows`;
          images = buildOgImageUrl({
            story,
            data: {
              count: watchHistory.totalShowsWatched,
              images: watchHistory.topShows.map((show) => show.imageURL),
            },
          });
          break;
        case "crossoverStar":
          title = `My crossover star is ${yourCrossoverStar.name}`;
          images = buildOgImageUrl({
            story,
            data: {
              name: replaceAmpersandWithAnd(yourCrossoverStar.name),
              imageUrl: yourCrossoverStar.imageURL,
            },
          });
          break;
        case "tvGenre":
          title = `My favorite TV genres are ${genreDistribution.genres
            .map((genre) => genre.genre)
            .join(", ")}`;
          images = buildOgImageUrl({
            story,
            data: {
              genres: genreDistribution.genres.map((genre) => ({
                ...genre,
                genre: replaceAmpersandWithAnd(genre.genre),
              })),
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
      // @note: this is the mocked data and should be replaced with the actual data
      // const { personality, tvBFF, starSign } = ReportsCardMockedData;

      const { personality, tvBFF, starSign } = await getReportCard(id);

      switch (story) {
        case "rottenTomatoesScore":
          title = `My Rotten Tomatoes score is ${personality.rtScore}%`;
          images = buildOgImageUrl({
            story,
            data: {
              score: personality.rtScore,
            },
          });
          break;
        case "tvBff":
          title = `My TV BFF is ${tvBFF.name}`;
          images = buildOgImageUrl({
            story,
            data: {
              name: replaceAmpersandWithAnd(tvBFF?.name || ""),
              show: replaceAmpersandWithAnd(tvBFF.show),
              imageUrl: tvBFF.imageURL,
            },
          });
          break;
        case "starSign":
          title = `My star sign is ${starSign.name}`;
          images = buildOgImageUrl({
            story,
            data: {
              name: replaceAmpersandWithAnd(starSign.name || ""),
            },
          });
          break;
        case "overview":
          title = `My personality is ${personality.personality}`;
          images = buildOgImageUrl({
            story,
            data: {
              score: personality.rtScore,
              tvBff: replaceAmpersandWithAnd(tvBFF?.name || ""),
              star: replaceAmpersandWithAnd(starSign?.name || ""),
              title: replaceAmpersandWithAnd(personality?.personality || ""),
            },
          });
          break;
      }
    }

    const res: Metadata = {
      ...sharedMetadata,
      title,
      description,
      openGraph: {
        description,
        title,
        images,
      },
      twitter: {
        description,
        title,
        images,
      },
    };

    return res;
  } catch {
    return sharedMetadata;
  }
}

export default async function Page({ searchParams }: { searchParams: any }) {
  // redirect to home if id is present
  if (searchParams.id) {
    return (
      <Container className="relative">
        <LandingScreen />
      </Container>
    );
  }

  return (
    <Container className="flex flex-col">
      <UserStories />
    </Container>
  );
}
