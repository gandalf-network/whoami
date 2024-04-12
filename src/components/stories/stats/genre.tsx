/* eslint-disable @next/next/no-img-element */
import { HalfEclipse, PentagramStar } from "@/components/icon";
import {
  PageHeader,
  Progress,
  ShareButton,
  StoryDownloadContainer,
  Text,
  ThemedProgress,
} from "@/components/themed";
import { TVStatsMockedData } from "@/helpers/mocked";
import { getStoryDownloadSelector } from "@/helpers/story";
import { cn } from "@/helpers/utils";
import { StoryContentProps, StoryDownloadContentProps } from "@/types";

export const GenreDistributionStory = ({
  storyProps,
  className,
  ...props
}: StoryContentProps) => {
  const { genreDistribution } = TVStatsMockedData;

  return (
    <div
      className={cn(
        "py-6 px-4 bg-primary-orange w-full h-full flex flex-col",
        className,
      )}
    >
      <div className="offset-content flex-1 flex-col flex-center">
        <PageHeader storyProps={storyProps} name="tv Stats" />

        <div className="gap-y-10 flex-1 flex-col flex-center text-center">
          <Text className="text-2xl uppercase" font="heading">
            Genre Distribution
          </Text>

          <div className="max-w-96 px-8">
            <Text className="text-lg mb-2">
              Your top {genreDistribution.top.length} TV genres include:
            </Text>
            <div className="my-3 flex flex-col gap-y-0.5">
              {genreDistribution.top.map((genre, index) => {
                const label = `${genre.title} - ${genre.percentage}%`;
                return (
                  <Progress
                    key={`${label}-${index}`}
                    max={100}
                    value={genre.percentage}
                    label={label}
                    className="w-full"
                    containerClassName="px-4"
                  />
                );
              })}
            </div>
            <Text className="text-base" font="caption">
              {genreDistribution.summary}
            </Text>
          </div>
        </div>
      </div>

      <PentagramStar className="absolute w-24 right-8 top-[32%]" />

      <HalfEclipse className="absolute w-16 rotate-[-40deg] -left-2 -bottom-6" />

      <div className="flex-center-x pb-4">
        <ShareButton
          storyProps={{
            id: "tvGenre",
            ...storyProps,
          }}
        />
      </div>

      <GenreDistributionDownloadStory />
    </div>
  );
};

export const GenreDistributionDownloadStory = ({
  ...props
}: StoryDownloadContentProps) => {
  const { genreDistribution } = TVStatsMockedData;

  return (
    <StoryDownloadContainer
      id={getStoryDownloadSelector("tvGenre").id}
      className="bg-primary-orange"
      title="my Genre Distribution"
      {...props}
    >
      <div className="gap-y-10 flex-1 flex-col flex-center text-center">
        <Text className="text-lg">
          My top {genreDistribution.top.length} TV genres include:
        </Text>
        <div className="relative z-20 w-full px-4">
          <div className="my-3 w-full flex flex-col gap-y-1.5">
            {genreDistribution.top.map((genre, index) => {
              const label = `${genre.title} - ${genre.percentage}%`;
              return (
                <ThemedProgress
                  key={`${label}-${index}`}
                  max={100}
                  value={genre.percentage}
                  label={label}
                  className="w-full"
                  containerClassName="px-4"
                />
              );
            })}
          </div>
        </div>

        <PentagramStar className="absolute w-24 right-0 top-[32%]" />
        <HalfEclipse className="absolute w-16 rotate-[-40deg] -left-2 -bottom-6" />
      </div>
    </StoryDownloadContainer>
  );
};
