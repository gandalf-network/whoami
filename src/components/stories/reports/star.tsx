/* eslint-disable @next/next/no-img-element */
import { DodecagramStar, StarSignIcon } from "@/components/icon";
import {
  PageHeader,
  ShareButton,
  StoryDownloadContainer,
  Text,
} from "@/components/themed";
import { ReportsCardMockedData } from "@/helpers/mocked";
import { getStoryDownloadSelector } from "@/helpers/story";
import { cn } from "@/helpers/utils";
import { StoryContentProps, StoryDownloadContentProps } from "@/types";

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
        <ShareButton
          storyProps={{
            id: "starSign",
            ...storyProps,
          }}
        />
      </div>

      <StarSignDownloadStory />
    </div>
  );
};

export const StarSignDownloadStory = ({
  ...props
}: StoryDownloadContentProps) => {
  const { realStarSign } = ReportsCardMockedData;

  return (
    <StoryDownloadContainer
      id={getStoryDownloadSelector("starSign").id}
      className="bg-primary-blue"
      title="My Real Star Sign"
      {...props}
    >
      <div className="gap-y-10 flex-1 flex-col flex-center text-center">
        <StarSignIcon sign={realStarSign.name} className="w-80" />

        <div>
          <Text className="text-2xl font-bold mt-2 mb-4">
            {realStarSign.name}
          </Text>
          <Text className="text-xl">{realStarSign.show}</Text>
        </div>

        <DodecagramStar className="absolute w-20 rotate-[-40deg] -left-5 -bottom-7" />
      </div>
    </StoryDownloadContainer>
  );
};
