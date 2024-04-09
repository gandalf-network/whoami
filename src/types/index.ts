export type Show = {
  id: string;
  title: string;
  dateFirstPlayed: string;
  watchCount?: number;
  imageURL?: string;
};

export type Episode = {
  id: string;
  episode: string;
  season: string;
  watchCount?: number;
};

export type YourCrossoverStar = {
  name: string;
  topShows: string[];
  imageURL: string;
};

export type WatchHistory = {
  totalShowsWatched: number;
  topShows: Show[];
};

export type MostWatchedTvShowWithEpisode = Show & Episode;

export type UserStats = {
  firstTvShow: Show;
  watchHistory: WatchHistory;
  mostWatchedTvShow: MostWatchedTvShowWithEpisode;
  yourCrossoverStar: YourCrossoverStar;
};

export type Actors = {
  name: string;
  imageURL: string;
};

export type TVDBSearchReturn = {
  episodeCount: number;
  imageURL: string;
  genres: string[];
  actors: Actors[];
};
