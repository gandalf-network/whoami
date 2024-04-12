/* eslint-disable @next/next/no-img-element */
import { Nonagram1Star, Quadrilateral1Star } from "@/components/icon";
import {
  PageHeader,
  ShareButton,
  StoryDownloadContainer,
  Text,
} from "@/components/themed";
import { TVStatsMockedData } from "@/helpers/mocked";
import { getStoryDownloadSelector } from "@/helpers/story";
import { cn } from "@/helpers/utils";
import { StoryContentProps, StoryDownloadContentProps } from "@/types";

export const TotalTVShowStory = ({
  storyProps,
  className,
  ...props
}: StoryContentProps) => {
  const { totalShows } = TVStatsMockedData;

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
          You have watched a total of <br />{totalShows.length} show
          {totalShows.length > 1 ? "s" : ""}
        </Text>

        <div className="relative flex items-center gap-x-8 p-0 w-[90%] h-72">
          <img
            src={totalShows.top[0].imageUrl}
            alt="image"
            className="w-full h-64 rounded-lg object-cover border-2 shadow-black shadow-[4px_4px]"
          />

          <div className="flex flex-col gap-y-4 w-32 h-72 flex-shrink-0 relative z-10">
            <img
              src={totalShows.top[1].imageUrl}
              alt="image"
              className="w-full h-[48%] rounded-lg object-cover border-2 shadow-black shadow-[4px_4px]"
            />

            <img
              src={totalShows.top[2].imageUrl}
              alt="image"
              className="w-full h-[48%] rounded-lg object-cover border-2 shadow-black shadow-[4px_4px]"
            />
          </div>

          <Quadrilateral1Star className="absolute w-28 -bottom-10 -left-12 z-10" />

          <Nonagram1Star className="absolute w-24 -top-10 -right-12" />
        </div>

        <div>
          <Text className="text-base my-3">Your most watched shows are:</Text>
          <div className="pl-8">
            {totalShows.top.map((show, index) => {
              return (
                <div
                  key={`${show.title}-${index}`}
                  className="flex-center-y font-bold"
                >
                  <p className="w-6">{index + 1}</p>
                  <p className="capitalize">{show.title}</p>
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
  const { totalShows } = TVStatsMockedData;

  return (
    <StoryDownloadContainer
      id={getStoryDownloadSelector("totalShows").id}
      className="bg-primary-pink"
      title={`I have watched a total of ${totalShows.length} show${totalShows.length > 1 ? "s" : ""}`}
      {...props}
    >
      <div className="gap-y-10 flex-1 flex-col flex-center text-center">
        <div className="relative flex items-center gap-x-6 p-0 w-[90%] h-72">
          <img
            src={totalShows.top[0].imageUrl}
            alt="image"
            className="w-full h-64 rounded-lg object-cover border-2 shadow-black shadow-[4px_4px]"
          />

          <div className="flex flex-col gap-y-4 w-24 h-72 flex-shrink-0 relative z-10">
            <img
              src={totalShows.top[1].imageUrl}
              alt="image"
              className="w-full h-[48%] rounded-lg object-cover border-2 shadow-black shadow-[4px_4px]"
            />

            <img
              src={totalShows.top[2].imageUrl}
              alt="image"
              className="w-full h-[48%] rounded-lg object-cover border-2 shadow-black shadow-[4px_4px]"
            />
          </div>

          <Quadrilateral1Star className="absolute w-28 -bottom-10 -left-12 z-10" />

          <Nonagram1Star className="absolute w-24 -top-10 -right-12" />
        </div>

        <div className="pl-8">
          <Text className="text-base my-3 text-muted text-left">
            Most watched shows:
          </Text>
          <div>
            {totalShows.top.map((show, index) => {
              return (
                <div
                  key={`${show.title}-${index}`}
                  className="flex-center-y font-bold text-2xl mb-1.5"
                >
                  <p className="w-6">{index + 1}</p>
                  <p className="capitalize">{show.title}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </StoryDownloadContainer>
  );
};
