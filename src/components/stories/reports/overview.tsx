/* eslint-disable @next/next/no-img-element */
import {
  Heart,
  PentagramStar,
  RottenTomatoeScoreIcon,
} from "@/components/icon";
import {
  Box,
  GridLineBackground,
  PageHeader,
  ShareButton,
  StoryDownloadContainer,
  Text,
} from "@/components/themed";
import { ReportsCardMockedData } from "@/helpers/mocked";
import {
  getRottenTomatoeScoreText,
  getStoryDownloadSelector,
  rottenTomatoeImages,
} from "@/helpers/story";
import { cn } from "@/helpers/utils";
import { StoryContentProps, StoryDownloadContentProps } from "@/types";

export const getOverviewSummary = ({
  score,
  tvBFF,
  sign,
}: {
  score: number;
  tvBFF: string;
  sign: string;
}) => {
  return [
    {
      title: "Your Rotten Tomatoes Score is",
      value: `${score}%`,
      className: "bg-primary-pink",
      icon: (
        <div className="absolute w-full -top-6 -left-4 flex">
          <RottenTomatoeScoreIcon score={score} className="w-14" />
        </div>
      ),
    },
    {
      title: "Your Tomatometer result is",
      value: getRottenTomatoeScoreText(score),
      className: "bg-primary-tomatoe",
      icon: (
        <div className="absolute w-full -top-4 -right-4 flex justify-end">
          <img
            className="w-[3.25rem] rotate-[16deg]"
            src={
              rottenTomatoeImages[
                getRottenTomatoeScoreText(
                  score,
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
      value: tvBFF,
      className: "bg-primary-purple",
      icon: (
        <div className="absolute w-full -top-2 -left-2 flex">
          <Heart className="w-9" />
        </div>
      ),
    },
    {
      title: "Your Real Star Sign is",
      value: sign,
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
};

export const ReportOverviewStory = ({
  storyProps,
  className,
  ...props
}: StoryContentProps) => {
  const { overview, rottenTomatoeScore, tvBFF, realStarSign } =
    ReportsCardMockedData;

  const overviewSummary = getOverviewSummary({
    score: +rottenTomatoeScore.score,
    tvBFF: tvBFF.name,
    sign: realStarSign.name,
  });

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
        <ShareButton
          storyProps={{
            id: "overview",
            ...storyProps,
          }}
        />
      </div>

      <ReportOverviewDownloadStory />
    </div>
  );
};

export const ReportOverviewDownloadStory = ({
  ...props
}: StoryDownloadContentProps) => {
  const { overview, rottenTomatoeScore, tvBFF, realStarSign } =
    ReportsCardMockedData;

  const overviewSummary = getOverviewSummary({
    score: +rottenTomatoeScore.score,
    tvBFF: tvBFF.name,
    sign: realStarSign.name,
  });

  return (
    <StoryDownloadContainer
      id={getStoryDownloadSelector("overview").id}
      className="bg-background"
      title={overview.title}
      {...props}
    >
      <div className="gap-y-10 flex-1 flex-col flex-center text-center relative z-20">
        <Text className="max-w-sm text-lg -translate-y-8" font="caption">
          {overview.summary}
        </Text>

        <div className="w-full -translate-y-4 grid grid-cols-1 gap-4">
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

      <GridLineBackground iconClassName="scale-110" />
    </StoryDownloadContainer>
  );
};
