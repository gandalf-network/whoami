/* eslint-disable @next/next/no-img-element */
import { DodecagramStar, StarSignIcon } from "@/components/icon";
import { StoryLoader } from "@/components/loader/story";
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

export const StarSignStory = ({
  storyProps,
  className,
  ...props
}: StoryContentProps) => {
  const { reportCard } = useUserData();

  const starSign = reportCard?.starSign || {};

  const isLoading = !reportCard;

  return (
    <div
      className={cn(
        "py-6 px-4 bg-primary-blue w-full h-full flex flex-col",
        className,
      )}
    >
      <PageHeader storyProps={storyProps} name="tv Report Card" />

      {isLoading ? (
        <StoryLoader title="Star Sign" />
      ) : (
        <>
          <div className="gap-y-8 story-content">
            <Text className="text-2xl uppercase" font="heading">
              Real Star Sign
            </Text>

            <StarSignIcon sign={starSign?.name || ""} className="w-80" />

            <div>
              <Text className="text-xl font-bold capitalize">
                {starSign?.name}
              </Text>
              {/* <Text className="text-base my-2 font-medium">
                From &quot;<span className="capitalize">{starSign?.show}</span>
                &quot;
              </Text> */}
              <Text className="max-w-xs text-base" font="caption">
                {starSign?.reason}
              </Text>
            </div>
          </div>

          <DodecagramStar className="absolute w-20 rotate-[-40deg] -left-5 -bottom-7" />

          <div className="flex-center-x pb-4">
            <ShareButton
              storyProps={{
                id: "starSign",
                info: starSign.name,
                ...storyProps,
              }}
            />
          </div>
        </>
      )}

      <StarSignDownloadStory />
    </div>
  );
};

export const StarSignDownloadStory = ({
  ...props
}: StoryDownloadContentProps) => {
  const { reportCard } = useUserData();

  const starSign = reportCard?.starSign || {};

  return (
    <StoryDownloadContainer
      id={getStoryDownloadSelector("starSign").id}
      className="bg-primary-blue"
      title="My Real Star Sign"
      {...props}
    >
      <div className="gap-y-10 flex-1 flex-col flex-center text-center">
        <StarSignIcon sign={starSign?.name || ""} className="w-80" />

        <div>
          <Text className="text-2xl font-bold mt-2 mb-4 capitalize">
            {starSign?.name}
          </Text>
          <Text className="text-xl font-semibold">{starSign?.show}</Text>
        </div>

        <DodecagramStar className="absolute w-20 rotate-[-40deg] -left-5 -bottom-7" />
      </div>
    </StoryDownloadContainer>
  );
};
