import { Story } from "react-insta-stories/dist/interfaces";

import { TVBFFStory } from "./bff";
import { ReportstDetails } from "./details";
import { ReportOverviewStory } from "./overview";
import { RottenTomatoeStory } from "./score";
import { StarSignStory } from "./star";

export const reportsStories: Story[] = [
  { content: (props) => <ReportstDetails storyProps={props} /> },
  { content: (props) => <RottenTomatoeStory storyProps={props} /> },
  { content: (props) => <TVBFFStory storyProps={props} /> },
  { content: (props) => <StarSignStory storyProps={props} /> },
  { content: (props) => <ReportOverviewStory storyProps={props} /> },
];
