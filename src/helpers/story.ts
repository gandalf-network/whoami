import { AllStoryIds } from "@/types";

import { getEnvDetails } from "./utils";

export const rottenTomatoeImages = {
  rotten:
    "https://res.cloudinary.com/dmsic9qmj/image/upload/v1712387317/gandalf/whoami/icons8-tomato-100-1_ubnrdh.png",
  fresh:
    "https://res.cloudinary.com/dmsic9qmj/image/upload/v1712387316/gandalf/whoami/icons8-tomato-100_xjuhq0.png",
  "certified fresh":
    "https://res.cloudinary.com/dmsic9qmj/image/upload/v1712387315/gandalf/whoami/icons8-tomato-100-2_ezrhu9.png",
};

export const rottenTomatoeTexts = {
  rotten: "Rotten",
  fresh: "Fresh",
  "certified fresh": "Certified Fresh",
};

export const rottenTomatoeScoreBar = {
  "0-40": rottenTomatoeTexts.rotten,
  "40-70": rottenTomatoeTexts.fresh,
  "70-100": rottenTomatoeTexts["certified fresh"],
};

export const getRottenTomatoeScoreText = (score: number) => {
  // Iterate over the keys of scoresBar object
  for (const range in rottenTomatoeScoreBar) {
    if (rottenTomatoeScoreBar.hasOwnProperty(range)) {
      // Extract min and max values from range
      const [min, max] = range.split("-").map(Number);
      // Check if score falls within the range
      if (score >= min && score <= max) {
        // Return corresponding score text
        return rottenTomatoeScoreBar[
          range as keyof typeof rottenTomatoeScoreBar
        ];
      }
    }
  }
  // If score is not within any range, return undefined or an appropriate value
  return "Score not available";
};

// get the story link
export const getStoryLink = (storyId: AllStoryIds) => {
  const { url } = getEnvDetails();

  return `${url}/stories/?id=${storyId}`;
};

// get story index
export const getStoryIndex = (storyId: AllStoryIds) => {
  switch (storyId) {
    // tv stats
    case "firstTvShow":
      return 1;
    case "mostWatchedTvShow":
      return 2;
    case "totalShows":
      return 3;
    case "crossoverStar":
      return 4;
    case "tvGenre":
      return 5;

    // reports
    case "rottenTomatoesScore":
      return 7;
    case "tvBff":
      return 8;
    case "starSign":
      return 9;
    case "overview":
      return 10;

    // default
    default:
      return 0;
  }
};