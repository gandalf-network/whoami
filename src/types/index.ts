export * from "./opengraph";
export * from "./story";
export * from "./components";

export type Show = {
  id: string;
  title: string;
  dateFirstPlayed?: string;
  genres?: string[];
  summary?: string;
  watchCount?: number;
  numberOfEpisodes?: number;
  imageURL?: string;
  actors?: Actor[];
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

export type Actor = {
  id: string;
  name: string;
  imageURL: string;
  characterName: string;
};

export type TVDBSearchReturn = {
  episodeCount: number;
  imageURL: string;
  summary: string;
  genres: string[];
  actors: Actor[];
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

export type TopGenresPersonalityAndStarSignAIResults = {
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

export type ParsedActivity = {
  movieTitle: string | null;
  seasonNumber: number | null;
  episodeNumber: number | null;
  episodeTitle: string | null;
};
