/* eslint-disable @next/next/no-img-element */
import { Cross, Heart } from "@/components/icon";
import {
  StoryDownloadContainer,
  PageHeader,
  ShareButton,
  Text,
} from "@/components/themed";
import { ReportsCardMockedData } from "@/helpers/mocked";
import { getStoryDownloadSelector } from "@/helpers/story";
import { cn } from "@/helpers/utils";
import { StoryContentProps, StoryDownloadContentProps } from "@/types";

export const TVBFFStory = ({
  storyProps,
  className,
  ...props
}: StoryContentProps) => {
  const { tvBFF } = ReportsCardMockedData;

  return (
    <div
      className={cn(
        "py-6 px-4 bg-primary-purple w-full h-full flex flex-col",
        className,
      )}
    >
      <PageHeader name="tv Report Card" />

      <div className="gap-y-10 flex-1 flex-col flex-center text-center">
        <Text className="text-2xl uppercase" font="heading">
          TV BFF
        </Text>

        <div className="relative p-0 w-52 h-72">
          <Heart className="absolute w-12 -top-5 -right-5 z-30" />
          <Cross className="absolute w-[250px] rotate-45 bottom-10 -left-[80%] z-10" />
          <img
            src={tvBFF.imageURL}
            alt="image"
            className="rounded-lg w-full h-full object-cover border-2 shadow-black shadow-[4px_4px] relative z-20"
          />
        </div>

        <div>
          <Text className="text-xl font-bold">{tvBFF.name}</Text>
          <Text className="text-base my-3">
            From &quot;<span className="capitalize">{tvBFF.show}</span>&quot;
          </Text>
          <Text className="max-w-xs text-base" font="caption">
            {tvBFF.reason}
          </Text>
        </div>
      </div>

      <div className="flex-center-x pb-4">
        <ShareButton
          storyProps={{
            id: "tvBff",
            ...storyProps,
          }}
        />
      </div>

      <TVBFFDownloadStory />
    </div>
  );
};

export const TVBFFDownloadStory = ({ ...props }: StoryDownloadContentProps) => {
  const { tvBFF } = ReportsCardMockedData;

  return (
    <StoryDownloadContainer
      id={getStoryDownloadSelector("tvBff").id}
      title="TV BFF"
      {...props}
    >
      <div className="gap-y-10 flex-1 flex-col flex-center text-center">
        <div className="relative p-0 w-52 h-72">
          <Heart className="absolute w-12 -top-5 -right-5 z-30" />
          <Cross className="absolute w-[250px] rotate-45 bottom-10 -left-[80%] z-10" />
          <img
            src={tvBFF.imageURL}
            alt="image"
            className="rounded-lg w-full h-full object-cover border-2 shadow-black shadow-[4px_4px] relative z-20"
          />
        </div>

        <div>
          <Text className="text-2xl font-bold mb-3">{tvBFF.name}</Text>
          <Text className="text-xl font-medium">
            From &quot;<span className="capitalize">{tvBFF.show}</span>&quot;
          </Text>
        </div>
      </div>
    </StoryDownloadContainer>
  );
};
