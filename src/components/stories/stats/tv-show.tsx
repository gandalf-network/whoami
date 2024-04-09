/* eslint-disable @next/next/no-img-element */
import {
  DodecagramStar,
  Nonagram1Star,
  NonagramStar,
  PentagramStar,
  Quadrilateral1Star,
  QuadrilateralStar,
} from "@/components/icon";
import { PageHeader, ShareButton, Text } from "@/components/themed";
import { getDate } from "@/helpers/date";
import { TVStatsMockedData } from "@/helpers/mocked";
import { cn } from "@/helpers/utils";
import { StoryContentProps } from "@/types";

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
      <PageHeader name="tv Stats" />

      <div className="gap-y-10 flex-1 flex-col flex-center text-center">
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
          <Text className="text-base my-3">
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
    </div>
  );
};

export const MostRewatchTVShowStory = ({
  storyProps,
  className,
  ...props
}: StoryContentProps) => {
  const { mostWatchedTvShow } = TVStatsMockedData;

  return (
    <div
      className={cn(
        "py-6 px-4 bg-primary-green w-full h-full flex flex-col",
        className,
      )}
    >
      <PageHeader name="tv Stats" />

      <div className="gap-y-10 flex-1 flex-col flex-center text-center">
        <Text className="text-2xl uppercase" font="heading">
          Most Rewatched TV Show
        </Text>

        <div className="relative p-0 w-52 h-72">
          <NonagramStar className="absolute w-10 -top-5 -right-5" />
          <PentagramStar className="absolute w-24 -bottom-10 -left-12 z-10" />
          <img
            src={mostWatchedTvShow.imageURL}
            alt="image"
            className="rounded-lg w-full h-full object-cover border-2 shadow-black shadow-[4px_4px] relative z-20"
          />
        </div>

        <div>
          <Text className="text-xl font-bold">{mostWatchedTvShow.title}</Text>
          <Text className="text-base my-3">
            You have played S{mostWatchedTvShow.season}:E
            {mostWatchedTvShow.episode} {mostWatchedTvShow.numberOfTimes} times
          </Text>
          <Text className="text-base" font="caption">
            {mostWatchedTvShow.summary}
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
    </div>
  );
};

export const TotalTVShowStory = ({
  storyProps,
  className,
  ...props
}: StoryContentProps) => {
  const { totalShows } = TVStatsMockedData;

  return (
    <div
      className={cn(
        "py-6 px-4 bg-primary-green w-full h-full flex flex-col",
        className,
      )}
    >
      <PageHeader name="tv Stats" />

      <div className="gap-y-10 flex-1 flex-col flex-center text-center">
        <Text className="text-xl uppercase" font="heading">
          You have watched a total of {totalShows.length} show
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
    </div>
  );
};
