/* eslint-disable @next/next/no-img-element */
import { NonagramStar, PentagramStar } from "@/components/icon";
import { useUserData } from "@/components/providers/user";
import {
  PageHeader,
  ShareButton,
  StoryDownloadContainer,
  Text,
  ThemedImage,
} from "@/components/themed";
import { getStoryDownloadSelector } from "@/helpers/story";
import { cn } from "@/helpers/utils";
import { StoryContentProps, StoryDownloadContentProps } from "@/types";

export const MostRewatchTVShowStory = ({
  storyProps,
  className,
  ...props
}: StoryContentProps) => {
  const { firstPhaseData } = useUserData();

  const mostWatchedTvShow = firstPhaseData?.mostWatchedTvShow || {};

  const watchCount = Number(mostWatchedTvShow?.show?.watchCount);
  const numberOfEpisodes = mostWatchedTvShow?.show?.numberOfEpisodes;

  const hasCompletedShow =
    watchCount && numberOfEpisodes ? watchCount >= numberOfEpisodes : false;

  const showImage = mostWatchedTvShow?.show?.imageURL;

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
          Most Watched TV Show
        </Text>

        <div className="relative p-0 w-52 h-72">
          <NonagramStar className="absolute w-12 -top-4 -right-8 z-30" />
          <PentagramStar className="absolute w-24 -bottom-10 -left-12 z-10" />

          <ThemedImage src={showImage} className="z-20" />
        </div>

        <div>
          <Text className="text-xl font-bold">
            {mostWatchedTvShow?.show?.title}
          </Text>
          <Text className="text-base my-3 font-medium">
            You have watched{" "}
            {hasCompletedShow ? (
              <>
                All <strong>{numberOfEpisodes}</strong> episode
                {numberOfEpisodes && numberOfEpisodes > 1 && "s"}
              </>
            ) : (
              <>
                <strong>{watchCount}</strong> out of{" "}
                <strong>{numberOfEpisodes}</strong> episode
                {numberOfEpisodes && numberOfEpisodes > 1 && "s"}
              </>
            )}
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
            info: mostWatchedTvShow.show.title,
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
  const { firstPhaseData } = useUserData();

  const mostWatchedTvShow = firstPhaseData?.mostWatchedTvShow || {};

  const watchCount = Number(mostWatchedTvShow?.show?.watchCount);
  const numberOfEpisodes = mostWatchedTvShow?.show?.numberOfEpisodes;

  const hasCompletedShow =
    watchCount && numberOfEpisodes ? watchCount >= numberOfEpisodes : false;

  const showImage = mostWatchedTvShow?.show?.imageURL;

  return (
    <StoryDownloadContainer
      id={getStoryDownloadSelector("mostWatchedTvShow").id}
      className="bg-primary-green"
      title="My Most Watched TV Show"
      {...props}
    >
      <div className="gap-y-10 flex-1 flex-col flex-center text-center">
        <div className="relative p-0 w-52 h-72">
          <NonagramStar className="absolute w-12 -top-4 -right-8 z-30" />
          <PentagramStar className="absolute w-24 -bottom-10 -left-12 z-10" />

          <ThemedImage src={showImage} className="z-20" />
        </div>

        <div>
          <Text className="text-2xl font-bold mt-2 mb-4">
            {mostWatchedTvShow?.show?.title}
          </Text>

          <Text className="mt-2 text-lg font-medium">
            You have watched{" "}
            {hasCompletedShow ? (
              <>
                All <strong>{numberOfEpisodes}</strong> episode
                {numberOfEpisodes && numberOfEpisodes > 1 && "s"}
              </>
            ) : (
              <>
                <strong>{watchCount}</strong> out of{" "}
                <strong>{numberOfEpisodes}</strong> episode
                {numberOfEpisodes && numberOfEpisodes > 1 && "s"}
              </>
            )}
          </Text>
        </div>
      </div>
    </StoryDownloadContainer>
  );
};
