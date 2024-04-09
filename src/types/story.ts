import type {
  ReactInstaStoriesProps,
  Story,
  Action,
} from "@enipx/react-insta-stories/dist/interfaces";

// --- types
export type { Story, Action };

export interface StoriesProps extends ReactInstaStoriesProps {}

export interface StoryContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  storyProps: {
    action?: Action;
    isPaused?: boolean;
  };
}

export interface StoryDownloadContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export type AllStoryIds =
  | "firstTvShow"
  | "mostWatchedTvShow"
  | "totalShows"
  | "crossoverStar"
  | "tvGenre"
  | "rottenTomatoesScore"
  | "tvBff"
  | "starSign"
  | "overview";

export type ShareMediumType = "download" | "tiktok" | "instagram" | "copy";
