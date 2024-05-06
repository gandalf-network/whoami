import { Nonagram1Star, Quadrilateral1Star } from "@/components/icon";
import { useUserData } from "@/components/providers/user";
import {
  PageHeader,
  ShareButton,
  StoryDownloadContainer,
  Text,
  PlaceholderImage,
} from "@/components/themed";
import { getStoryDownloadSelector } from "@/helpers/story";
import { cn } from "@/helpers/utils";
import { StoryContentProps, StoryDownloadContentProps } from "@/types";

export const TotalTVShowStory = ({
  storyProps,
  className,
  ...props
}: StoryContentProps) => {
  const { stats } = useUserData();

  const watchHistory = stats?.watchHistory || {};
  const firstShowImage = watchHistory?.topShows?.[0]?.imageURL;
  const secondShowImage = watchHistory?.topShows?.[1]?.imageURL;
  const thirdShowImage = watchHistory?.topShows?.[2]?.imageURL;

  return (
    <div
      className={cn(
        "py-6 px-4 bg-primary-pink w-full h-full flex flex-col",
        className,
      )}
    >
      <PageHeader storyProps={storyProps} name="tv Stats" />

      <div className="gap-y-10 story-content">
        <Text className="text-xl uppercase" font="heading">
          You have watched a total of <br />
          {watchHistory?.totalShowsWatched} show
          {watchHistory?.totalShowsWatched > 1 ? "s" : ""}
        </Text>

        <div className="relative flex items-center gap-x-8 p-0 w-[90%] h-72">
          <PlaceholderImage src={firstShowImage} className="h-64" />

          {secondShowImage || thirdShowImage ? (
            <div className="flex flex-col gap-y-4 w-32 h-72 flex-shrink-0 relative z-10 pr-4">
              <PlaceholderImage
                src={secondShowImage}
                className="h-[48%]"
                iconClassName="w-14"
              />
              <PlaceholderImage
                src={thirdShowImage}
                className="h-[48%]"
                iconClassName="w-14"
              />
            </div>
          ) : null}

          <Quadrilateral1Star className="absolute w-28 -bottom-10 -left-12 z-10" />

          <Nonagram1Star className="absolute w-24 -top-10 -right-12" />
        </div>

        <div>
          <Text className="text-base my-3">Your most watched shows are:</Text>
          <div className="pl-8">
            {watchHistory?.topShows?.map?.((show, index) => {
              return (
                <div
                  key={`${show?.title}-${index}`}
                  className="flex-center-y font-bold"
                >
                  <p className="w-6">{index + 1}</p>
                  <p className="capitalize">{show?.title}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex-center-x pb-4">
        <ShareButton
          storyProps={{
            id: "totalShows",
            ...storyProps,
          }}
        />
      </div>

      <TotalTVShowDownloadStory />
    </div>
  );
};

export const TotalTVShowDownloadStory = ({
  ...props
}: StoryDownloadContentProps) => {
  const { stats } = useUserData();

  const watchHistory = stats?.watchHistory || {};
  const firstShowImage = watchHistory?.topShows?.[0]?.imageURL;
  const secondShowImage = watchHistory?.topShows?.[1]?.imageURL;
  const thirdShowImage = watchHistory?.topShows?.[2]?.imageURL;

  return (
    <StoryDownloadContainer
      id={getStoryDownloadSelector("totalShows").id}
      className="bg-primary-pink"
      title={`I have watched a total of ${watchHistory?.totalShowsWatched} show${watchHistory?.totalShowsWatched > 1 ? "s" : ""}`}
      {...props}
    >
      <div className="gap-y-10 flex-1 flex-col flex-center text-center">
        <div className="relative flex items-center gap-x-6 p-0 w-[90%] h-72">
          <PlaceholderImage src={firstShowImage} className="h-64" />

          {secondShowImage || thirdShowImage ? (
            <div className="flex flex-col gap-y-4 w-32 h-72 flex-shrink-0 relative z-10 pr-4">
              <PlaceholderImage
                src={secondShowImage}
                className="h-[48%]"
                iconClassName="w-14"
              />
              <PlaceholderImage
                src={thirdShowImage}
                className="h-[48%]"
                iconClassName="w-14"
              />
            </div>
          ) : null}

          <Quadrilateral1Star className="absolute w-28 -bottom-10 -left-12 z-10" />

          <Nonagram1Star className="absolute w-24 -top-10 -right-12" />
        </div>

        <div className="pl-8">
          <Text className="text-base my-3 text-muted text-left font-medium">
            Most watched shows:
          </Text>
          <div>
            {watchHistory?.topShows?.map?.((show, index) => {
              return (
                <div
                  key={`${show?.title}-${index}`}
                  className="flex-center-y font-semibold text-2xl mb-1.5"
                >
                  <p className="w-6">{index + 1}</p>
                  <p className="capitalize">{show?.title}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </StoryDownloadContainer>
  );
};
