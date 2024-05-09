import {
  getFirstPhaseData,
  getSecondPhaseData,
  getReportCard,
} from "@/actions";

export type UserFirstPhaseDataType = Awaited<
  ReturnType<typeof getFirstPhaseData>
>;

export type UserSecondPhaseDataType = Awaited<
  ReturnType<typeof getSecondPhaseData>
>;

export type UserReportCardType = Awaited<ReturnType<typeof getReportCard>>;

export type ActorInput = {
  name: string;
  imageURL?: string;
  characterName: string;
  popularity: number;
  totalEpisodeCount: number;
};

export type Show = {
  id: string;
  title: string;
  dateFirstPlayed?: string;
  genres?: string[];
  summary?: string;
  watchCount?: bigint;
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

export type FirstPhaseData = {
  firstTvShow: { show: Show; quip: string };
  watchHistory: WatchHistory;
  mostWatchedTvShow: { show: MostWatchedTvShowWithEpisode; quip: string };
};

export type SecondPhaseData = {
  yourCrossoverStar: YourCrossoverStar;
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
  actors: ActorInput[];
  actorNames: string[];
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
  mostWatchedTVShowQuip: string;
};

export type ParsedActivity = {
  movieTitle: string | null;
  seasonNumber: number | null;
  episodeNumber: number | null;
  episodeTitle: string | null;
};
