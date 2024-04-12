import { Circle, Nonagram1Star } from "@/components/icon";
import { BlueWaveBackground, PageHeader, Text } from "@/components/themed";
import { cn } from "@/helpers/utils";

import { StoryContentProps } from "@/types";

export const TVStatDetails = ({
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
        <PageHeader storyProps={storyProps} />

        <div className="gap-y-4 flex-1 flex-col flex-center text-center">
          <Text className="text-3xl" font="heading">
            Explore Your TV Stats
          </Text>
          <Text className="text-xl" font="caption">
            From your most-rewatched shows to your favourite genres, dive into
            your TV journey!
          </Text>
        </div>
      </div>

      <Circle
        className="absolute top-[15%] -left-[45%] w-64 h-64 opacity-50 pointer-events-none"
        strokeWidth={0.5}
      />

      <Nonagram1Star className="absolute -right-14 top-[55%] pointer-events-none opacity-50 w-28" />

      <BlueWaveBackground className="justify-end" />
    </div>
  );
};
