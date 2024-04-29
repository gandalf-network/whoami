import axios, { AxiosInstance } from "axios";

interface TVShow {
  id: number;
  name: string;
  overview: string;
  first_air_date: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
}

interface SearchTVShowsResponse {
  page: number;
  results: TVShow[];
  total_pages: number;
  total_results: number;
}

interface Genre {
  id: number;
  name: string;
}

interface Network {
  id: number;
  name: string;
  logo_path: string;
  origin_country: string;
}

interface Season {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
}

interface Role {
  length: number;
  character: string;
}

interface CastMember {
  id: number;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  total_episode_count: number;
  roles: Role[];
}

interface TVShowDetails {
  id: number;
  name: string;
  overview: string;
  first_air_date: string;
  genres: Genre[];
  networks: Network[];
  seasons: Season[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  backdrop_path: string;
  in_production: boolean;
  aggregate_credits: {
    cast: CastMember[];
  };
}

class TMDBClient {
  private apiKey: string;
  private client: AxiosInstance;

  constructor(url: string, apiKey: string) {
    this.apiKey = apiKey;
    this.client = axios.create({
      baseURL: url,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async searchTVShows(
    query: string,
    page: number = 1,
  ): Promise<SearchTVShowsResponse> {
    try {
      const response = await this.client.get<SearchTVShowsResponse>(
        "/search/tv",
        {
          params: {
            query,
            include_adult: false,
            language: "en-US",
            page,
            api_key: this.apiKey,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error("Error searching TV shows:", error);
      throw error;
    }
  }
  async getTVShowDetails(
    tvShowId: number,
    language: string = "en-US",
  ): Promise<TVShowDetails> {
    try {
      const response = await this.client.get<TVShowDetails>(`/tv/${tvShowId}`, {
        params: {
          language,
          append_to_response: "aggregate_credits",
          api_key: this.apiKey,
        },
      });
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching details for TV show ID ${tvShowId}:`,
        error,
      );
      throw error;
    }
  }
}

export default TMDBClient;
