import { Stories, StoriesProps } from "./base";
import { reportsStories } from "./reports";
import { statsStories } from "./stats";

export const UserStories = ({ stories, ...props }: Partial<StoriesProps>) => {
  return (
    <Stories
      width="100%"
      height="100%"
      stories={stories || [...statsStories, ...reportsStories]}
      {...props}
    />
  );
};
