/* eslint-disable @next/next/no-img-element */
import { Circle } from "@/components/icon";
import { useUserData } from "@/components/providers/user";
import {
  PageHeader,
  ShareButton,
  StoryDownloadContainer,
  Text,
} from "@/components/themed";
import { VerticalSlider } from "@/components/themed/slider";
import {
  getRottenTomatoeScoreText,
  getStoryDownloadSelector,
  rottenTomatoeImages,
  rottenTomatoeTexts,
} from "@/helpers/story";
import { cn } from "@/helpers/utils";
import {
  SliderOptionType,
  StoryContentProps,
  StoryDownloadContentProps,
} from "@/types";

const sliderOptions: SliderOptionType[] = [
  {
    value: "certified fresh",
    content: (
      <div className="flex-center-y gap-x-1">
        <img
          src={rottenTomatoeImages["certified fresh"]}
          alt="icon"
          className="w-14"
        />
        <p className="font-semibold uppercase">
          {rottenTomatoeTexts["certified fresh"]}
        </p>
      </div>
    ),
  },
  {
    value: "fresh",
    content: (
      <div className="flex-center-y gap-x-1">
        <img src={rottenTomatoeImages.fresh} alt="icon" className="w-14" />
        <p className="font-semibold uppercase">{rottenTomatoeTexts.fresh}</p>
      </div>
    ),
  },
  {
    value: "rotten",
    content: (
      <div className="flex-center-y gap-x-1">
        <img src={rottenTomatoeImages.rotten} alt="icon" className="w-14" />
        <p className="font-semibold uppercase">{rottenTomatoeTexts.rotten}</p>
      </div>
    ),
  },
];

export const RottenTomatoeStory = ({
  storyProps,
  className,
  ...props
}: StoryContentProps) => {
  const { reportCard } = useUserData();

  const { rtScore, reason } = reportCard?.personality;

  return (
    <div
      className={cn(
        "py-6 px-4 bg-primary-lavender w-full h-full flex flex-col",
        className,
      )}
    >
      <div className="offset-content flex-1 flex-col flex-center">
        <PageHeader storyProps={storyProps} name="tv Report Card" />

        <div className="gap-y-10 story-content">
          <Text className="text-2xl uppercase" font="heading">
            Rotten Tomatoes Score
          </Text>

          <div className="flex-center-y gap-2 py-5">
            <div className="relative translate-y-10">
              <Text
                className="w-16 text-sm -rotate-90 uppercase whitespace-nowrap opacity-50"
                font="heading"
              >
                The tomatometer ©
              </Text>
            </div>
            <VerticalSlider
              options={sliderOptions}
              value={getRottenTomatoeScoreText(rtScore).toLowerCase()}
            />
          </div>

          <div className="pt-4">
            <Text className="text-xl font-bold">{rtScore}%</Text>
            <Text className="text-base my-3 font-medium">
              Your taste is{" "}
              <strong>{getRottenTomatoeScoreText(rtScore)}</strong>!
            </Text>
            <Text className="text-base" font="caption">
              {reason}
            </Text>
          </div>
        </div>
      </div>

      <Circle
        className="absolute top-[7%] -left-[85%] w-[65vh] h-[60vh] pointer-events-none"
        strokeWidth={0.2}
      />

      <div className="flex-center-x pb-4">
        <ShareButton
          storyProps={{
            id: "rottenTomatoesScore",
            ...storyProps,
          }}
        />
      </div>

      <RottenTomatoeScoreDownloadStory />
    </div>
  );
};

export const RottenTomatoeScoreDownloadStory = ({
  ...props
}: StoryDownloadContentProps) => {
  const { reportCard } = useUserData();

  const { rtScore } = reportCard?.personality;

  return (
    <StoryDownloadContainer
      id={getStoryDownloadSelector("rottenTomatoesScore").id}
      className="bg-primary-lavender"
      title="My Rotten Tomatoes Score"
      {...props}
    >
      <div className="gap-y-10 flex-1 flex-col flex-center text-center">
        <div className="flex-center-y gap-2 py-5 relative z-20">
          <div className="relative translate-y-10">
            <Text
              className="w-16 text-sm -rotate-90 uppercase whitespace-nowrap opacity-50"
              font="heading"
            >
              The tomatometer ©
            </Text>
          </div>
          <VerticalSlider
            options={sliderOptions}
            value={getRottenTomatoeScoreText(rtScore).toLowerCase()}
          />
        </div>

        <div>
          <Text className="text-2xl font-bold">{rtScore}%</Text>
          <Text className="text-xl my-3 font-medium">
            My taste is <strong>{getRottenTomatoeScoreText(rtScore)}</strong>!
          </Text>
        </div>

        <Circle
          className="absolute top-[6%] -left-[90%] w-[60vh] h-[60vh] pointer-events-none"
          strokeWidth={0.2}
        />
      </div>
    </StoryDownloadContainer>
  );
};
