import { Flash } from "@/components/icon";
import { PageHeader, PinkWaveBackground, Text } from "@/components/themed";
import { cn } from "@/helpers/utils";

import { StoryContentProps } from "../base";

export const ReportstDetails = ({
  storyProps,
  className,
  ...props
}: StoryContentProps) => {
  return (
    <div
      className={cn(
        "py-6 px-4 bg-background w-full h-full flex flex-col",
        className,
      )}
    >
      <div className="offset-content flex-1 flex flex-col">
        <PageHeader />

        <div className="gap-y-4 flex-1 flex-col flex-center text-center">
          <Text className="text-3xl" font="heading">
            Your TV Report Card
          </Text>
          <Text className="text-xl max-w-sm" font="caption">
            Find out your Rotten Tomatoes Score, your TV BFF and more.
          </Text>
        </div>
      </div>

      <Flash className="absolute left-2/4 top-[10%] pointer-events-none opacity-50 w-20" />

      <PinkWaveBackground className="justify-end" />
    </div>
  );
};
