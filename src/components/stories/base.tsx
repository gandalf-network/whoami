"use client";

import DefaultStories from "@enipx/react-insta-stories";
import type {
  ReactInstaStoriesProps,
  Story,
  Action,
} from "@enipx/react-insta-stories/dist/interfaces";

// --- types
export type { Story };

export interface StoriesProps extends ReactInstaStoriesProps {}

export interface StoryContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  storyProps: {
    action?: Action;
    isPaused?: boolean;
  };
}

// --- component
export const Stories = ({ ...props }: StoriesProps) => {
  const progressStyleConfig = {
    height: "3px",
    borderRadius: "8px",
    spacing: "4px",
    bg: "rgba(0, 0, 0, 0.3)",
    activeBg: "rgba(0, 0, 0, 1)",
    padding: "0.75rem",
  };

  return (
    <DefaultStories
      progressStyles={{
        height: progressStyleConfig.height,
        borderRadius: progressStyleConfig.borderRadius,
        backgroundColor: progressStyleConfig.activeBg,
      }}
      progressWrapperStyles={{
        height: progressStyleConfig.height,
        borderRadius: progressStyleConfig.borderRadius,
        backgroundColor: progressStyleConfig.bg,
        overflow: "hidden",
        margin: progressStyleConfig.spacing,
      }}
      progressContainerStyles={{
        padding: progressStyleConfig.padding,
        marginTop: "4rem",
        filter: "none",
      }}
      pauseDivStyles={{
        flex: 1,
      }}
      {...props}
    />
  );
};
