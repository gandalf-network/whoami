/* eslint-disable @next/next/no-img-element */
import { NonagramStar, PentagramStar } from "@/components/icon";
import { useUserData } from "@/components/providers/user";
import {
  PageHeader,
  ShareButton,
  StoryDownloadContainer,
  Text,
} from "@/components/themed";
import { getStoryDownloadSelector } from "@/helpers/story";
import { cn } from "@/helpers/utils";
import { StoryContentProps, StoryDownloadContentProps } from "@/types";

export const MostRewatchTVShowStory = ({
  storyProps,
  className,
  ...props
}: StoryContentProps) => {
  const { stats } = useUserData();

  const mostWatchedTvShow = stats?.mostWatchedTvShow;

  return (
    <div
      className={cn(
        "py-6 px-4 bg-primary-green w-full h-full flex flex-col",
        className,
      )}
    >
      <PageHeader storyProps={storyProps} name="tv Stats" />

      <div className="gap-y-10 story-content">
        <Text className="text-2xl uppercase" font="heading">
          Most Rewatched TV Show
        </Text>

        <div className="relative p-0 w-52 h-72">
          <NonagramStar className="absolute w-12 -top-4 -right-8 z-30" />
          <PentagramStar className="absolute w-24 -bottom-10 -left-12 z-10" />
          <img
            src={mostWatchedTvShow.show?.imageURL}
            alt="image"
            className="rounded-lg w-full h-full object-cover border-2 shadow-black shadow-[4px_4px] relative z-20 bg-background"
          />
        </div>

        <div>
          <Text className="text-xl font-bold">
            {mostWatchedTvShow.show?.title}
          </Text>
          <Text className="text-base my-3 font-medium">
            You have played{" "}
            <strong>
              S{mostWatchedTvShow.show?.title}:E
              {mostWatchedTvShow.show?.title}
            </strong>{" "}
            {mostWatchedTvShow.show?.watchCount} times
          </Text>
          <Text className="text-base" font="caption">
            {mostWatchedTvShow.quip}
          </Text>
        </div>
      </div>

      <div className="flex-center-x pb-4">
        <ShareButton
          storyProps={{
            id: "mostWatchedTvShow",
            ...storyProps,
          }}
        />
      </div>

      <MostRewatchTVShowDownloadStory />
    </div>
  );
};

export const MostRewatchTVShowDownloadStory = ({
  ...props
}: StoryDownloadContentProps) => {
  const { stats } = useUserData();

  const mostWatchedTvShow = stats?.mostWatchedTvShow;

  return (
    <StoryDownloadContainer
      id={getStoryDownloadSelector("mostWatchedTvShow").id}
      className="bg-primary-green"
      title="My Most Rewatched TV Show"
      {...props}
    >
      <div className="gap-y-10 flex-1 flex-col flex-center text-center">
        <div className="relative p-0 w-52 h-72">
          <NonagramStar className="absolute w-12 -top-4 -right-8 z-30" />
          <PentagramStar className="absolute w-24 -bottom-10 -left-12 z-10" />
          <img
            src={mostWatchedTvShow.show?.imageURL}
            alt="image"
            className="rounded-lg w-full h-full object-cover border-2 shadow-black shadow-[4px_4px] relative z-20"
          />
        </div>

        <div>
          <Text className="text-2xl font-bold mt-2 mb-4">
            {mostWatchedTvShow.show?.title}
          </Text>
          <Text className="text-muted text-base font-medium">
            Most played episode
          </Text>
          <Text className="text-xl font-bold">
            S{mostWatchedTvShow.show?.title}:E
            {mostWatchedTvShow.show?.title}
          </Text>

          <Text className="mt-6 text-lg font-medium">
            Played {mostWatchedTvShow?.show?.watchCount} times
          </Text>
        </div>
      </div>
    </StoryDownloadContainer>
  );
};