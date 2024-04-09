/* eslint-disable @next/next/no-img-element */
import { DodecagramStar, StarSignIcon } from "@/components/icon";
import { PageHeader, ShareButton, Text } from "@/components/themed";
import { ReportsCardMockedData } from "@/helpers/mocked";
import { cn } from "@/helpers/utils";

import { StoryContentProps } from "../base";

export const StarSignStory = ({
  storyProps,
  className,
  ...props
}: StoryContentProps) => {
  const { realStarSign } = ReportsCardMockedData;

  return (
    <div
      className={cn(
        "py-6 px-4 bg-primary-blue w-full h-full flex flex-col",
        className,
      )}
    >
      <PageHeader name="tv Report Card" />

      <div className="gap-y-10 flex-1 flex-col flex-center text-center">
        <Text className="text-2xl uppercase" font="heading">
          Real Star Sign
        </Text>

        <StarSignIcon sign={realStarSign.name} className="w-80" />

        <div>
          <Text className="text-xl font-bold capitalize">
            {realStarSign.name}
          </Text>
          <Text className="text-base my-3">
            From &quot;<span className="capitalize">{realStarSign.show}</span>
            &quot;
          </Text>
          <Text className="max-w-xs text-base" font="caption">
            {realStarSign.reason}
          </Text>
        </div>
      </div>

      <DodecagramStar className="absolute w-20 rotate-[-40deg] -left-5 -bottom-7" />

      <div className="flex-center-x pb-4">
        <ShareButton storyId="starSign" />
      </div>
    </div>
  );
};
