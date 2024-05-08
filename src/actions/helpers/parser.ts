import { ParsedActivity } from "../../types";

export function parseActivityInput(input: string): ParsedActivity | null {
  const regex = /^(.+?): Season (\d+):(?: Episode (\d+))?(.*)$/;
  const matches = input.match(regex);
  if (!matches) return null;

  const movieTitle = matches[1];
  const seasonNumber = parseInt(matches[2], 10);

  let episodeNumber: number | null = null;
  if (matches[3]) {
    episodeNumber = parseInt(matches[3], 10);
  }

  const episodeTitle = matches[4].trim();
  return {
    movieTitle,
    seasonNumber,
    episodeNumber,
    episodeTitle,
  };
}

export function extractEpisodeNumberFromTitle(
  episodeTitle: string,
): [number | null, string] {
  const episodeRegex = /Episode (\d+)/;
  const episodeMatches = episodeRegex.exec(episodeTitle);
  if (episodeMatches && episodeMatches.length > 1) {
    const episodeNumber = parseInt(episodeMatches[1], 10);
    const cleanTitle = episodeTitle.replace(episodeRegex, "").trim();
    return [episodeNumber, cleanTitle];
  }
  return [null, episodeTitle];
}

export function parseDate(dateStr: string) {
  const parts = dateStr.split("/");
  if (parts.length === 3) {
    const day = parseInt(parts[1], 10);
    const month = parseInt(parts[0], 10) - 1;
    const year = parseInt(parts[2], 10);
    return new Date(year, month, day);
  } else {
    throw new Error("Invalid date format.");
  }
}
