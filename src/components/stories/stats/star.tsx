/* eslint-disable @next/next/no-img-element */
import { Circle, GridDots, Rectangle } from "@/components/icon";
import {
  PageHeader,
  ShareButton,
  StoryDownloadContainer,
  Text,
} from "@/components/themed";
import { TVStatsMockedData } from "@/helpers/mocked";
import { getStoryDownloadSelector } from "@/helpers/story";
import { cn, formatStringArrayToJSX } from "@/helpers/utils";
import { StoryContentProps, StoryDownloadContentProps } from "@/types";

export const CrossOverStarStory = ({
  storyProps,
  className,
  ...props
}: StoryContentProps) => {
  const { yourCrossoverStar } = TVStatsMockedData;

  return (
    <div
      className={cn(
        "py-6 px-4 bg-primary-yellow w-full h-full flex flex-col",
        className,
      )}
    >
      <PageHeader storyProps={storyProps} name="tv Stats" />

      <div className="gap-y-10 story-content">
        <Text className="text-2xl uppercase" font="heading">
          Crossover Star
        </Text>

        <div className="relative p-0 w-64 h-64 rounded-full">
          <GridDots className="absolute w-[375px] top-[-17%] -translate-x-2/4 left-2/4" />
          <Circle className="absolute w-16 -top-0 -left-0" />
          <Rectangle
            className="absolute w-8 bottom-6 right-4 z-20"
            strokeWidth={1.5}
          />
          <img
            src={yourCrossoverStar.imageURL}
            alt="image"
            className="bg-background rounded-full w-full h-full object-cover border-2 shadow-black shadow-[6px_6px] relative z-10"
          />
        </div>

        <div className="mt-8">
          <Text className="text-xl font-bold">{yourCrossoverStar.name}</Text>
          <Text className="text-base my-3 font-medium">
            Has appeared in{" "}
            <strong>
              {yourCrossoverStar.totalAppearance} show
              {yourCrossoverStar.totalAppearance > 1 ? "s " : " "}
            </strong>
            you&apos;ve watched, including{" "}
            {formatStringArrayToJSX({
              strings: yourCrossoverStar.topShows,
              className: "font-bold",
            })}
          </Text>
        </div>
      </div>

      <div className="flex-center-x pb-4">
        <ShareButton
          storyProps={{
            id: "crossoverStar",
            ...storyProps,
          }}
        />
      </div>

      <CrossOverStarDownloadStory />
    </div>
  );
};

export const CrossOverStarDownloadStory = ({
  ...props
}: StoryDownloadContentProps) => {
  const { yourCrossoverStar } = TVStatsMockedData;

  return (
    <StoryDownloadContainer
      id={getStoryDownloadSelector("crossoverStar").id}
      className="bg-primary-yellow"
      title="my Crossover Star"
      {...props}
    >
      <div className="gap-y-10 flex-1 flex-col flex-center text-center">
        <div className="relative p-0 w-64 h-64 rounded-full">
          <GridDots className="absolute w-[375px] top-[-17%] -translate-x-2/4 left-2/4" />
          <Circle className="absolute w-16 -top-0 -left-0" />
          <Rectangle className="absolute w-12 bottom-6 -right-2 z-20" />
          <img
            src={yourCrossoverStar.imageURL}
            alt="image"
            className="bg-background rounded-full w-full h-full object-cover border-2 shadow-black shadow-[6px_6px] relative z-10"
          />
        </div>

        <div className="mt-8">
          <Text className="text-2xl font-bold mt-2 mb-4">
            {yourCrossoverStar.name}
          </Text>
          <Text className="font-medium text-base">Has appeared in</Text>
          <Text className="text-xl font-semibold">
            {yourCrossoverStar.totalAppearance} shows
          </Text>
          <Text className="text-lg mt-4 font-medium">
            I’ve watched including{" "}
            {formatStringArrayToJSX({
              strings: yourCrossoverStar.topShows,
              className: "",
            })}
          </Text>
        </div>
      </div>
    </StoryDownloadContainer>
  );
};
