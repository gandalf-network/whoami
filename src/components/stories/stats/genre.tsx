/* eslint-disable @next/next/no-img-element */
import { HalfEclipse, PentagramStar } from "@/components/icon";
import { useUserData } from "@/components/providers/user";
import {
  PageHeader,
  Progress,
  ShareButton,
  StoryDownloadContainer,
  Text,
  ThemedProgress,
} from "@/components/themed";
import { getStoryDownloadSelector } from "@/helpers/story";
import { cn } from "@/helpers/utils";
import { StoryContentProps, StoryDownloadContentProps } from "@/types";

export const GenreDistributionStory = ({
  storyProps,
  className,
  ...props
}: StoryContentProps) => {
  const { stats } = useUserData();

  const genreDistribution = stats?.genreDistribution;

  return (
    <div
      className={cn(
        "py-6 px-4 bg-primary-orange w-full h-full flex flex-col",
        className,
      )}
    >
      <div className="offset-content flex-1 flex-col flex-center">
        <PageHeader storyProps={storyProps} name="tv Stats" />

        <div className="gap-y-8 story-content">
          <Text className="text-2xl uppercase" font="heading">
            Genre Distribution
          </Text>

          <div className="max-w-96 px-8">
            <Text className="text-lg mb-2.5 font-medium">
              Your top {genreDistribution?.genres?.length} TV genres include:
            </Text>
            <div className="relative w-full">
              <div className="my-3 flex flex-col gap-y-0.5 w-full z-10 relative">
                {genreDistribution?.genres?.map?.((genre, index) => {
                  const label = `${genre.genre} - ${parseInt((genre?.percentage || 0).toString(), 10)}%`;
                  return (
                    <Progress
                      key={`${label}-${index}`}
                      max={100}
                      value={genre.percentage}
                      label={label}
                      className="w-full"
                      containerClassName="px-0"
                    />
                  );
                })}
              </div>
              <PentagramStar className="absolute w-24 -right-14 -top-6" />
            </div>
            <Text className="text-base" font="caption">
              {genreDistribution?.quip}
            </Text>
          </div>
        </div>
      </div>

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
  const { stats } = useUserData();

  const genreDistribution = stats?.genreDistribution;

  return (
    <StoryDownloadContainer
      id={getStoryDownloadSelector("tvGenre").id}
      className="bg-primary-orange"
      title="My Genre Distribution"
      titleClassName="max-w-full"
      description={`My top ${genreDistribution?.genres?.length} TV genres include:`}
      {...props}
    >
      <div className="flex-1 relative z-20 w-full pt-14">
        <div className="my-3 w-full flex flex-col gap-y-1.5">
          {genreDistribution?.genres?.map?.((genre, index) => {
            const label = `${genre.genre} - ${parseInt((genre?.percentage || 0).toString(), 10)}%`;
            return (
              <ThemedProgress
                key={`${label}-${index}`}
                max={100}
                value={genre.percentage}
                label={label}
                className="w-full h-16"
                containerClassName="px-4"
              />
            );
          })}
        </div>
      </div>

      <PentagramStar className="absolute w-24 right-0 top-[20%]" />
      <HalfEclipse className="absolute w-16 rotate-[-40deg] -left-2 -bottom-6" />
    </StoryDownloadContainer>
  );
};
