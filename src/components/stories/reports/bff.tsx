/* eslint-disable @next/next/no-img-element */
import { Cross, Heart, QuadrilateralStar } from "@/components/icon";
import { StoryLoader } from "@/components/loader/story";
import { useUserData } from "@/components/providers/user";
import {
  StoryDownloadContainer,
  PageHeader,
  ShareButton,
  Text,
  ThemedImage,
  ThemedBaseImage,
} from "@/components/themed";
import { getStoryDownloadSelector } from "@/helpers/story";
import { cn } from "@/helpers/utils";
import { StoryContentProps, StoryDownloadContentProps } from "@/types";

export const TVBFFStory = ({
  storyProps,
  className,
  ...props
}: StoryContentProps) => {
  const { reportCard } = useUserData();

  const { show, name, reason, imageURL } = reportCard?.tvBFF || {};

  const isLoading = !reportCard;

  return (
    <div
      className={cn(
        "py-6 px-4 bg-primary-purple w-full h-full flex flex-col",
        className,
      )}
    >
      <PageHeader name="tv Report Card" storyProps={storyProps} />

      {isLoading ? (
        <StoryLoader title="TV BFF" />
      ) : (
        <>
          <div className="gap-y-10 story-content">
            <Text className="text-2xl uppercase" font="heading">
              TV BFF
            </Text>

            <div className="relative p-0 w-52 h-72">
              <Heart className="absolute w-12 -top-5 -right-5 z-30" />
              <Cross className="absolute w-[250px] rotate-45 bottom-10 -left-[80%] z-10" />

              <ThemedBaseImage src={imageURL || ""} className="z-20" />
            </div>

            <div>
              <Text className="text-xl font-bold">{name}</Text>
              <Text className="text-base my-3 font-medium">
                From &quot;<span className="capitalize">{show}</span>&quot;
              </Text>
              <Text className="max-w-xs text-base" font="caption">
                {reason}
              </Text>
            </div>
          </div>

          <QuadrilateralStar
            className="absolute w-28 -right-8 -bottom-8"
            strokeWidth={1}
          />

          <div className="flex-center-x pb-4">
            <ShareButton
              storyProps={{
                id: "tvBff",
                info: name,
                ...storyProps,
              }}
            />
          </div>
        </>
      )}

      <TVBFFDownloadStory />
    </div>
  );
};

export const TVBFFDownloadStory = ({ ...props }: StoryDownloadContentProps) => {
  const { reportCard } = useUserData();

  const { show, name, imageURL } = reportCard?.tvBFF || {};

  return (
    <StoryDownloadContainer
      id={getStoryDownloadSelector("tvBff").id}
      className="bg-primary-purple"
      title="TV BFF"
      {...props}
    >
      <div className="gap-y-10 flex-1 flex-col flex-center text-center">
        <div className="relative p-0 w-52 h-72">
          <Heart className="absolute w-12 -top-5 -right-5 z-30" />
          <Cross className="absolute w-[250px] rotate-45 bottom-10 -left-[80%] z-10" />
          <ThemedImage src={imageURL || ""} className="z-20" />
        </div>

        <div>
          <Text className="text-2xl font-bold mb-3">{name}</Text>
          <Text className="text-xl font-semibold">
            From &quot;<span className="capitalize">{show}</span>&quot;
          </Text>
        </div>

        <QuadrilateralStar
          className="absolute w-28 -right-8 bottom-2"
          strokeWidth={0.8}
        />
      </div>
    </StoryDownloadContainer>
  );
};
