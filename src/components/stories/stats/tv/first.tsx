/* eslint-disable @next/next/no-img-element */
import { DodecagramStar, QuadrilateralStar } from "@/components/icon";
import {
  PageHeader,
  ShareButton,
  StoryDownloadContainer,
  Text,
} from "@/components/themed";
import { getDate } from "@/helpers/date";
import { TVStatsMockedData } from "@/helpers/mocked";
import { getStoryDownloadSelector } from "@/helpers/story";
import { cn } from "@/helpers/utils";
import { StoryContentProps, StoryDownloadContentProps } from "@/types";

export const FirstTVShowStory = ({
  storyProps,
  className,
  ...props
}: StoryContentProps) => {
  const { firstTvShow } = TVStatsMockedData;

  return (
    <div
      className={cn(
        "py-6 px-4 bg-primary-cyan w-full h-full flex flex-col",
        className,
      )}
    >
      <PageHeader storyProps={storyProps} name="tv Stats" />

      <div className="gap-y-10 story-content">
        <Text className="text-2xl uppercase" font="heading">
          First TV Show
        </Text>

        <div className="relative p-0 w-52 h-72">
          <QuadrilateralStar className="absolute w-10 -top-5 -left-5" />
          <DodecagramStar className="absolute w-24 -bottom-10 -right-12 z-10" />
          <img
            src={firstTvShow.imageURL}
            alt="image"
            className="rounded-lg w-full h-full object-cover border-2 shadow-black shadow-[4px_4px] relative z-20"
          />
        </div>

        <div>
          <Text className="text-xl font-bold">{firstTvShow.title}</Text>
          <Text className="text-base my-3 font-medium">
            {getDate(firstTvShow.date).format("MMMM DD, YYYY")}
          </Text>
          <Text className="text-base" font="caption">
            {firstTvShow.summary}
          </Text>
        </div>
      </div>

      <div className="flex-center-x pb-4">
        <ShareButton
          storyProps={{
            id: "firstTvShow",
            ...storyProps,
          }}
        />
      </div>

      <FirstTVShowDownloadStory />
    </div>
  );
};

export const FirstTVShowDownloadStory = ({
  ...props
}: StoryDownloadContentProps) => {
  const { firstTvShow } = TVStatsMockedData;

  return (
    <StoryDownloadContainer
      id={getStoryDownloadSelector("firstTvShow").id}
      className="bg-primary-cyan"
      title="First TV Show"
      {...props}
    >
      <div className="gap-y-10 flex-1 flex-col flex-center text-center">
        <div className="relative p-0 w-52 h-72">
          <QuadrilateralStar className="absolute w-10 -top-5 -left-5" />
          <DodecagramStar className="absolute w-24 -bottom-10 -right-12 z-10" />
          <img
            src={firstTvShow.imageURL}
            alt="image"
            className="rounded-lg w-full h-full object-cover border-2 shadow-black shadow-[4px_4px] relative z-20"
          />
        </div>

        <div>
          <Text className="text-2xl font-bold mt-2 mb-4">
            {firstTvShow.title}
          </Text>
          <Text className="text-muted text-base">Date watched</Text>
          <Text className="text-xl font-semibold">
            {getDate(firstTvShow.date).format("MMMM DD, YYYY")}
          </Text>
        </div>
      </div>
    </StoryDownloadContainer>
  );
};
