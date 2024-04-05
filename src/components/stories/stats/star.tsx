/* eslint-disable @next/next/no-img-element */
import { Circle, Rectangle } from "@/components/icon";
import { PageHeader, ShareButton, Text } from "@/components/themed";
import { TVStatsMockedData } from "@/helpers/mocked";
import { cn, formatStringArrayToJSX } from "@/helpers/utils";

import { StoryContentProps } from "../base";

export const CrossOverStarStory = ({
  storyProps,
  className,
  ...props
}: StoryContentProps) => {
  const { yourCrossoverStar } = TVStatsMockedData;

  return (
    <div
      className={cn(
        "py-6 px-4 bg-primary-cyan w-full h-full flex flex-col",
        className,
      )}
    >
      <PageHeader name="tv Stats" />

      <div className="gap-y-10 flex-1 flex-col flex-center text-center">
        <Text className="text-2xl uppercase" font="heading">
          Crossover Star
        </Text>

        <div className="relative p-0 w-64 h-64 rounded-full">
          <Circle className="absolute w-16 -top-0 -left-0" />
          <Rectangle className="absolute w-8 bottom-12 -right-2 z-20" />
          <img
            src={yourCrossoverStar.imageURL}
            alt="image"
            className="bg-background rounded-full w-full h-full object-cover border-2 shadow-black shadow-[6px_6px] relative z-10"
          />
        </div>

        <div className="mt-8">
          <Text className="text-xl font-bold">{yourCrossoverStar.name}</Text>
          <Text className="text-base my-3">
            Has appeared in {yourCrossoverStar.totalAppearance} shows
            you&apos;ve watched, including{" "}
            {formatStringArrayToJSX({
              strings: yourCrossoverStar.topShows,
              className: "font-bold",
            })}
          </Text>
        </div>
      </div>

      <div className="flex-center-x pb-4">
        <ShareButton />
      </div>
    </div>
  );
};
