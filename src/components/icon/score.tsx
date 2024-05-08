import { getRottenTomatoeScoreText } from "@/helpers/story";

import { DownArrow, MidArrow, UpArrow } from "./shapes";

export const RottenTomatoeScoreIcon = ({
  score,
  ...props
}: React.SVGProps<SVGSVGElement> & { score: string | number }) => {
  const scoreText = getRottenTomatoeScoreText(+score);
  switch (scoreText.toLowerCase()) {
    case "certified fresh":
      return <UpArrow {...props} />;
    case "fresh":
      return <MidArrow {...props} />;
    case "rotten":
      return <DownArrow {...props} />;
    default:
      return null;
  }
};
