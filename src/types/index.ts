export type FirstTvShow = {
  date: string;
  title: string;
  imageURL?: string;
};

export type MostWatchedTvShow = {
  numberOfTimes: number;
  title: string;
  episode: string;
  season: string;
  imageURL: string;
};

export type YourCrossoverStar = {
  name: string;
  topShows: string[];
  imageURL: string;
};

export type WatchHistory = {
  totalShowsWatched: number;
  topShows: MostWatchedTvShow[];
};
