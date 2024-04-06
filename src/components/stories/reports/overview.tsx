/* eslint-disable @next/next/no-img-element */
import { Box, PageHeader, ShareButton, Text } from "@/components/themed";
import { ReportsCardMockedData } from "@/helpers/mocked";
import { getRottenTomatoeScoreText } from "@/helpers/story";
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
                  "flex-center flex-col gap-y-2 px-5 py-4 shadow-[1px_2px] rounded-2xl h-[110px]",
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
