import { Stories, StoriesProps } from "./base";
import { statsStories } from "./stats";

export const UserStories = ({ stories, ...props }: Partial<StoriesProps>) => {
  return (
    <Stories
      width="100%"
      height="100%"
      stories={stories || [...statsStories]}
      {...props}
    />
  );
};
