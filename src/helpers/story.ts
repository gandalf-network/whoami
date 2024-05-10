import { AllStoryIds, TopGenres, UserStats } from "@/types";

import { createOrGetSessionId } from "./storage";
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
  // If score is not within any range, return first range text
  return rottenTomatoeScoreBar["0-40"];
};

// get the story link
export const getStoryLink = (storyId: AllStoryIds) => {
  const { url } = getEnvDetails();

  const sessionID = createOrGetSessionId();

  return `${url}/stories?story=${storyId}&id=${sessionID}`;
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

export const getStoryDownloadSelector = (storyId: AllStoryIds) => {
  const id = `${storyId}-story-download`;
  return {
    id,
    selector: `#${id}`,
  };
};

export const getStoryShareText = (storyId: AllStoryIds, info: any) => {
  if (!info) {
    return "";
  }

  switch (storyId) {
    // tv stats
    case "firstTvShow":
      return `My first Netflix TV show is ${info}. Try it out to find out yours.`;
    case "mostWatchedTvShow":
      return `My most watched Netflix TV show is ${info}. Try it out to find out yours.`;
    case "totalShows":
      return `I have watched ${info} Netflix shows. Try it out to find out yours.`;
    case "crossoverStar":
      return `My crossover star is ${info}. Try it out to find out yours.`;
    case "tvGenre":
      return `My favorite Netflix TV genres are ${info.join(", ")}. Try it out to find out yours.`;
    case "rottenTomatoesScore":
      return `My avg. Rotten Tomatoes score is ${info}. Try it out to find out yours.`;
    case "tvBff":
      return `My Netflix TV BFF is ${info}. Try it out to find out yours.`;
    case "starSign":
      return `My starsign is ${info}. Try it out to find out yours.`;
    case "overview":
      return `My Netflix personality is ${info}. Try it out to find out yours.`;
    // default
    default:
      return "";
  }
};

export const getHighestPercentageGenre = (genres: TopGenres) => {
  // Initialize variables to first genre in the array
  let highestGenre = genres?.[0];

  // Iterate over the array of genres
  genres.forEach((genre) => {
    // If the current genre's percentage is higher than the current highest percentage
    if (genre.percentage > highestGenre.percentage) {
      // Update the highest percentage and corresponding genre
      highestGenre = genre;
    }
  });

  // Return the genre with the highest percentage
  return highestGenre;
};

export const parseStatsBigIntValueAsJSONReady = (
  stats: UserStats,
): UserStats => {
  const watchCount = stats?.mostWatchedTvShow?.show?.watchCount;

  return {
    ...stats,
    mostWatchedTvShow: {
      ...stats.mostWatchedTvShow,
      show: {
        ...stats.mostWatchedTvShow.show,
        watchCount: (watchCount ? Number(watchCount) : 0).toString() as any,
      },
    },
    watchHistory: {
      ...stats.watchHistory,
      topShows: stats.watchHistory.topShows.map((show) => {
        return {
          ...show,
          watchCount: (show.watchCount
            ? Number(show.watchCount)
            : 0
          ).toString() as any,
        };
      }),
    },
  };
};
