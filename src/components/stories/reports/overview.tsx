/* eslint-disable @next/next/no-img-element */
import { Heart, PentagramStar, UpArrow } from "@/components/icon";
import {
  Box,
  GridLineBackground,
  PageHeader,
  ShareButton,
  Text,
} from "@/components/themed";
import { ReportsCardMockedData } from "@/helpers/mocked";
import {
  getRottenTomatoeScoreText,
  rottenTomatoeImages,
} from "@/helpers/story";
import { cn } from "@/helpers/utils";

import { StoryContentProps } from "../base";

export const ReportOverviewStory = ({
  storyProps,
  className,
  ...props
}: StoryContentProps) => {
  const { overview, rottenTomatoeScore, tvBFF, realStarSign } =
    ReportsCardMockedData;

  const overviewSummary = [
    {
      title: "Your Rotten Tomatoes Score is",
      value: `${rottenTomatoeScore.score}%`,
      className: "bg-primary-pink",
      icon: (
        <div className="absolute w-full -top-6 -left-4 flex">
          <UpArrow className="w-14" />
        </div>
      ),
    },
    {
      title: "Your Tomatometer result is",
      value: getRottenTomatoeScoreText(rottenTomatoeScore.score),
      className: "bg-primary-tomatoe",
      icon: (
        <div className="absolute w-full -top-4 -right-4 flex justify-end">
          <img
            className="w-[3.25rem] rotate-[16deg]"
            src={
              rottenTomatoeImages[
                getRottenTomatoeScoreText(
                  rottenTomatoeScore.score,
                ).toLowerCase() as keyof typeof rottenTomatoeImages
              ]
            }
            alt="img"
          />
        </div>
      ),
    },
    {
      title: "Your TV BFF is ",
      value: tvBFF.name,
      className: "bg-primary-purple",
      icon: (
        <div className="absolute w-full -top-2 -left-2 flex">
          <Heart className="w-9" />
        </div>
      ),
    },
    {
      title: "Your Real Star Sign is",
      value: realStarSign.name,
      className: "bg-primary-blue",
      icon: (
        <div className="absolute w-full -top-3 -right-5 flex justify-end">
          <PentagramStar
            className="w-12 rotate-[15deg]"
            fill="#BBFCA2"
            strokeWidth={4}
          />
        </div>
      ),
    },
  ];

  return (
    <div
      className={cn(
        "py-6 px-4 bg-background w-full h-full flex flex-col",
        className,
      )}
    >
      <div className="flex-1 flex flex-col relative z-10">
        <PageHeader name="tv Report Card" />

        <div className="gap-y-3 flex-1 flex-col flex-center text-center">
          <div>
            <Text className="text-2xl uppercase mb-1.5" font="heading">
              {overview.title}
            </Text>

            <Text className="max-w-sm text-base" font="caption">
              {overview.summary}
            </Text>
          </div>

          <div className="w-full mt-8 grid grid-cols-1 gap-4">
            {overviewSummary.map((summary, index) => {
              return (
                <Box
                  key={`w-full summary-${index}`}
                  className={cn(
                    "flex-center flex-col gap-y-2 px-5 py-4 shadow-[1px_2px] rounded-2xl h-[5.7rem] relative",
                    summary.className,
                  )}
                >
                  {summary.icon}
                  <Text className="text-sm">{summary.title}</Text>
                  <Text className="text-lg" font="heading">
                    {summary.value}
                  </Text>
                </Box>
              );
            })}
          </div>
        </div>
      </div>

      <GridLineBackground iconClassName="scale-110" />

      <div className="flex-center-x pb-4">
        <ShareButton />
      </div>
    </div>
  );
};

export const ReportOverviewGifStory = ({
  storyProps,
  className,
  ...props
}: StoryContentProps) => {
  const { overview, rottenTomatoeScore, tvBFF, realStarSign } =
    ReportsCardMockedData;

  const overviewSummary = [
    {
      title: "Your Rotten Tomatoes Score is",
      value: `${rottenTomatoeScore.score}%`,
      className: "bg-primary-pink",
    },
    {
      title: "Your Tomatometer result is",
      value: getRottenTomatoeScoreText(rottenTomatoeScore.score),
      className: "bg-primary-tomatoe",
    },
    {
      title: "Your TV BFF is ",
      value: tvBFF.name,
      className: "bg-primary-purple",
    },
    {
      title: "Your Real Star Sign is",
      value: realStarSign.name,
      className: "bg-primary-blue",
    },
  ];

  return (
    <div
      className={cn(
        "py-6 px-4 bg-background w-full h-full flex flex-col",
        className,
      )}
    >
      <PageHeader name="tv Report Card" />

      <div className="gap-y-4 flex-1 flex-col flex-center text-center">
        <div>
          <Text className="text-base mb-1">You are</Text>
          <Text className="text-2xl uppercase" font="heading">
            {overview.title}
          </Text>
        </div>

        <div className="relative p-0 w-48 h-48">
          <img
            src={overview.imageUrl}
            alt="image"
            className="rounded-2xl w-full h-full object-cover border-2 shadow-black shadow-[4px_4px] relative z-20"
          />
        </div>

        <div>
          <Text className="max-w-sm text-base" font="caption">
            {overview.summary}
          </Text>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-2.5">
          {overviewSummary.map((summary, index) => {
            return (
              <Box
                key={`summary-${index}`}
                className={cn(
                  "flex-center flex-col gap-y-2 px-5 py-4 shadow-[1px_2px] rounded-2xl h-[6.9rem]",
                  summary.className,
                )}
              >
                <Text className="text-sm">{summary.title}</Text>
                <Text className="text-lg" font="heading">
                  {summary.value}
                </Text>
              </Box>
            );
          })}
        </div>
      </div>

      <div className="flex-center-x pb-4">
        <ShareButton />
      </div>
    </div>
  );
};
