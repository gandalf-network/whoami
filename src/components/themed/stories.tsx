"use client";

import DefaultStories from "react-insta-stories";
import type { ReactInstaStoriesProps } from "react-insta-stories/dist/interfaces";

interface StoriesProps extends ReactInstaStoriesProps {}

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
      {...props}
    />
  );
};
