export type Show = {
  id: string;
  title: string;
  dateFirstPlayed: string;
  genres?: string[];
  summary?: string;
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

export type MostWatchedTvShowWithEpisode = Show;

export type UserStats = {
  firstTvShow: { show: Show; quip: string };
  watchHistory: WatchHistory;
  mostWatchedTvShow: { show: MostWatchedTvShowWithEpisode; quip: string };
  yourCrossoverStar: YourCrossoverStar;
  genreDistribution: { genres: TopGenres; quip: string };
};

export type Actors = {
  name: string;
  imageURL: string;
};

export type TVDBSearchReturn = {
  episodeCount: number;
  imageURL: string;
  summary: string;
  genres: string[];
  actors: Actors[];
};

type Genre = {
  genre: string;
  percentage: number;
};

export type TopGenres = Genre[];

export type BFF = {
  BFF: string;
  BFFQuip: string;
};

export type StarSign = {
  topGenresQuip: string;
  starSign: string;
  starSignQuip: string;
  RTScoreQuip: string;
  personality: string;
  personalityQuip: string;
};

export type TVShowQuips = {
  firstTVShowQuip: string;
  mostRewatchedTVShowQuip: string;
};
