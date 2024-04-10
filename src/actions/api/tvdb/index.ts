import axios from "axios";
// import RateLimiter from "bottleneck";

import { TVDB_BASE_URL } from "@/actions/helpers/constants";
import { Actors, TVDBSearchReturn } from "@/types";

export default class TVDBClient {
  private token: string = "";

  async login(apiKey: string): Promise<void> {
    const url = `/login`;
    try {
      const response = await axios.post(
        TVDB_BASE_URL + url,
        {
          APIKey: apiKey,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status === 200) {
        this.token = response.data.data.token;
      } else {
        throw new Error(`Login failed with status code: ${response.status}`);
      }
    } catch (error) {
      throw new Error(`Error during login: ${(error as Error).message}`);
    }
  }

  async getSeasonExtended(imdbID: string): Promise<TVDBSearchReturn> {
    const { data } = await this.doRequest(
      `${TVDB_BASE_URL}/series/${imdbID}/extended?meta=episodes`,
    );
    console.log(data.overview);
    const episodeCount = data.episodes.length as number;
    const genres = data.genres.map((genre: any) => genre.name);

    let actors: Actors[] = [];

    for (let i = 0; i < data.characters.length; i++) {
      const character = data.characters[i];
      if (character.sort > 10) continue;
      actors = [
        ...actors,
        {
          name: character.personName as string,
          imageURL: character.image as string,
        },
      ];
    }

    const returnObject: TVDBSearchReturn = {
      imageURL: data.image,
      genres,
      summary: data.overview,
      episodeCount,
      actors,
    };

    return returnObject;
  }

  private async doRequest(url: string) {
    try {
      if (this.token === "") {
        throw new Error(`Login to TVDB and try again`);
      }

      const response = await axios.get(url, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${this.token}`,
        },
      });

      if (response.status !== 200) {
        throw new Error(`Request failed with status code: ${response.status}`);
      }
      return response.data;
    } catch (error) {
      throw new Error(`Error during request: ${(error as Error).message}`);
    }
  }
}