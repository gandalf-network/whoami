export const rottenTomatoeImages = {
  rotten:
    "https://res.cloudinary.com/dmsic9qmj/image/upload/v1712387317/gandalf/whoami/icons8-tomato-100-1_ubnrdh.png",
  fresh:
    "https://res.cloudinary.com/dmsic9qmj/image/upload/v1712387316/gandalf/whoami/icons8-tomato-100_xjuhq0.png",
  "certified fresh":
    "https://res.cloudinary.com/dmsic9qmj/image/upload/v1712387315/gandalf/whoami/icons8-tomato-100-2_ezrhu9.png",
};

export const rottenTomatoeScoreBar = {
  "0-40": "Rotten",
  "40-70": "Fresh",
  "70-100": "Certified Fresh",
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
