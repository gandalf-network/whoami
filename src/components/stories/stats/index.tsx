import { Story } from "react-insta-stories/dist/interfaces";

import { TVStatDetails } from "./details";
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
];
