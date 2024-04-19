import axios from "axios";
import levenshtein from "js-levenshtein";

import {
  ROTTEN_TOMATOES_ALGOLIA_API_KEY,
  ROTTEN_TOMATOES_ALGOLIA_APPLICATION_ID,
  ROTTEN_TOMATOES_ALGOLIA_BASE_URL,
} from "@/actions/helpers/constants";
import { standardizeName } from "@/actions/helpers/utils";

export async function getRottenTomatoScore(title: string, cast: string[]) {
  const agentQuery =
    "x-algolia-agent=Algolia for JavaScript (4.23.3); Browser (lite)";
  const apiKey = `x-algolia-api-key=${ROTTEN_TOMATOES_ALGOLIA_API_KEY}`;
  const appID = `x-algolia-application-id=${ROTTEN_TOMATOES_ALGOLIA_APPLICATION_ID}`;
  const url = `${ROTTEN_TOMATOES_ALGOLIA_BASE_URL}/1/indexes/*/queries?${agentQuery}&${apiKey}&${appID}`;

  const body = {
    requests: [
      {
        indexName: "content_rt",
        query: title,
        params:
          "filters=isEmsSearchable%20%3D%201&hitsPerPage=5&analyticsTags=%5B%22header_search%22%5D&clickAnalytics=true",
      },
    ],
  };

  const response = await axios.post(url, body, {
    headers: {
      Accept: "application/json",
    },
  });

  if (response.status !== 200) {
    throw new Error(
      `Rotten Tomatoes request failed with status code: ${response.status}`,
    );
  }

  if (response.data.results.length < 1) {
    throw new Error(`Rotten Tomatoes returned no data`);
  }

  if (response.data.results[0].hits < 1) {
    throw new Error(`Rotten Tomatoes returned no data`);
  }

  let tomatoScore = 0;
  const hits = response.data.results[0].hits;

  for (let i = 0; i < hits.length; i++) {
    const hit = hits[i];
    if (hit.type !== "tv") {
      continue;
    }

    const normalizedTitle = hit.title
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

    if (!hit.castCrew?.cast) {
      continue;
    }

    const castIsSimilar = compareCastArrays(hit.castCrew.cast, cast);

    const levenshteinDistance = levenshtein(normalizedTitle, title);
    const threshold = 0.25 * Math.max(normalizedTitle.length, title.length);

    if (levenshteinDistance > threshold) {
      continue;
    }
    if (!castIsSimilar) {
      continue;
    }

    tomatoScore = hit.rottenTomatoes.criticsScore;
    break;
  }

  return tomatoScore;
}

function compareCastArrays(cast1: string[], cast2: string[]): boolean {
  const standardizedCast1 = cast1.map(standardizeName);
  const standardizedCast2 = cast2.map(standardizeName);

  const setCast2 = new Set(standardizedCast2);

  const intersection = new Set(
    [...standardizedCast1].filter((x) => setCast2.has(x)),
  );

  const minimumSize = Math.min(cast1.length, cast2.length);

  return intersection.size >= Math.ceil(minimumSize / 2);
}
