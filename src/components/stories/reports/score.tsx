/* eslint-disable @next/next/no-img-element */
import { Circle } from "@/components/icon";
import { PageHeader, ShareButton, Text } from "@/components/themed";
import { VerticalSlider } from "@/components/themed/slider";
import { ReportsCardMockedData } from "@/helpers/mocked";
import { getRottenTomatoeScoreText } from "@/helpers/story";
import { cn } from "@/helpers/utils";

import { StoryContentProps } from "../base";

export const RottenTomatoeStory = ({
  storyProps,
  className,
  ...props
}: StoryContentProps) => {
  const { rottenTomatoeScore } = ReportsCardMockedData;

  return (
    <div
      className={cn(
        "py-6 px-4 bg-primary-lavender w-full h-full flex flex-col",
        className,
      )}
    >
      <div className="offset-content flex-1 flex-col flex-center">
        <PageHeader name="tv Report Card" />

        <div className="gap-y-10 flex-1 flex-col flex-center text-center">
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
              options={[
                {
                  value: "certified fresh",
                  content: (
                    <div className="flex-center-y gap-x-1">
                      <img
                        src="https://res.cloudinary.com/dmsic9qmj/image/upload/v1712387315/gandalf/whoami/icons8-tomato-100-2_ezrhu9.png"
                        alt="icon"
                        className="w-[74px]"
                      />
                      <p className="font-semibold uppercase">Certified Fresh</p>
                    </div>
                  ),
                },
                {
                  value: "fresh",
                  content: (
                    <div className="flex-center-y gap-x-1">
                      <img
                        src="https://res.cloudinary.com/dmsic9qmj/image/upload/v1712387316/gandalf/whoami/icons8-tomato-100_xjuhq0.png"
                        alt="icon"
                        className="w-[74px]"
                      />
                      <p className="font-semibold uppercase">Fresh</p>
                    </div>
                  ),
                },
                {
                  value: "rotten",
                  content: (
                    <div className="flex-center-y gap-x-1">
                      <img
                        src="https://res.cloudinary.com/dmsic9qmj/image/upload/v1712387317/gandalf/whoami/icons8-tomato-100-1_ubnrdh.png"
                        alt="icon"
                        className="w-[74px]"
                      />
                      <p className="font-semibold uppercase">Rotten</p>
                    </div>
                  ),
                },
              ]}
              value={getRottenTomatoeScoreText(
                rottenTomatoeScore.score,
              ).toLowerCase()}
            />
          </div>

          <div>
            <Text className="text-xl font-bold">
              {rottenTomatoeScore.score}%
            </Text>
            <Text className="text-base my-3">
              Your taste is certified{" "}
              <strong>
                {getRottenTomatoeScoreText(rottenTomatoeScore.score)}
              </strong>
              !
            </Text>
            <Text className="text-base" font="caption">
              {rottenTomatoeScore.summary}
            </Text>
          </div>
        </div>
      </div>

      <Circle
        className="absolute top-[10%] -left-[85%] w-[60vh] h-[60vh] pointer-events-none"
        strokeWidth={0.2}
      />

      <div className="flex-center-x pb-4">
        <ShareButton />
      </div>
    </div>
  );
};
