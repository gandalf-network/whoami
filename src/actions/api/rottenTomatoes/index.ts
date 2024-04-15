import axios from "axios";
import * as cheerio from "cheerio";

import { ROTTEN_TOMATOES_BASE_URL } from "@/actions/helpers/constants";

export async function getRottenTomatoScore(title: string) {
  title = title.replaceAll(" ", "_");
  const url = `${ROTTEN_TOMATOES_BASE_URL}/tv/${title}`;
  const response = await axios.get(url);

  const html = response.data;
  const $ = cheerio.load(html);

  const score = $("rt-text[slot='criticsScore']").first().text();
  return score;
}

getRottenTomatoScore("the big bang theory");
