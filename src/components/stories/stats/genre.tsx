/* eslint-disable @next/next/no-img-element */
import { HalfEclipse } from "@/components/icon";
import { PageHeader, Progress, ShareButton, Text } from "@/components/themed";
import { TVStatsMockedData } from "@/helpers/mocked";
import { cn } from "@/helpers/utils";

import { StoryContentProps } from "../base";

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
      <PageHeader name="tv Stats" />

      <div className="gap-y-10 flex-1 flex-col flex-center text-center">
        <Text className="text-2xl uppercase" font="heading">
          Genre Distribution
        </Text>

        <div className="max-w-80">
          <Text className="text-lg">
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

      <HalfEclipse className="absolute w-16 rotate-[-40deg] -left-2 -bottom-6" />

      <div className="flex-center-x pb-4">
        <ShareButton />
      </div>
    </div>
  );
};
