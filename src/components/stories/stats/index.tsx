import { Story } from "@enipx/react-insta-stories/dist/interfaces";

import { TVStatDetails } from "./details";
import { GenreDistributionStory } from "./genre";
import { CrossOverStarStory } from "./star";
import {
  FirstTVShowStory,
  MostRewatchTVShowStory,
  TotalTVShowStory,
} from "./tv-show";

export const statsStories: Story[] = [
  { content: (props) => <TVStatDetails storyProps={props} /> },
  { content: (props) => <FirstTVShowStory storyProps={props} /> },
  { content: (props) => <MostRewatchTVShowStory storyProps={props} /> },
  { content: (props) => <TotalTVShowStory storyProps={props} /> },
  { content: (props) => <CrossOverStarStory storyProps={props} /> },
  { content: (props) => <GenreDistributionStory storyProps={props} /> },
];
