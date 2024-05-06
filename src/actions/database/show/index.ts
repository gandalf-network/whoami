import { PrismaClient } from "@prisma/client";

import { Show, TopGenres, YourCrossoverStar } from "../../../types";

const prisma = new PrismaClient();

export type insertEpisodeInput = {
  title: string;
  datePlayed: Date;
  userShowID: string;
  season: number | null;
  episode: number | null;
};

export async function batchInsertEpisodes(input: insertEpisodeInput[]) {
  await prisma.userEpisode.createMany({
    data: input,
    skipDuplicates: true,
  });
}

export async function upsertShow(title: string) {
  const show = await prisma.show.upsert({
    where: { title },
    create: { title },
    update: {},
  });

  if (!show) {
    throw new Error(`could not upsert this show: ${title}`);
  }
  return show;
}

export async function upsertUserShow(userID: string, showID: string) {
  const userShow = await prisma.userShow.upsert({
    where: {
      userShowID: { userID, showID },
    },
    create: { userID, showID },
    update: {},
  });
  return userShow;
}

export type UpdateShowInput = {
  id: string;
  imageURL?: string;
  summary?: string;
  genres?: string[];
  rottenTomatoScore?: number;
  numberOfEpisodes?: number;
};

export async function updateShow(updateShowInput: UpdateShowInput) {
  const show = await prisma.show.update({
    where: {
      id: updateShowInput.id,
    },
    data: {
      ...(updateShowInput.imageURL && { imageURL: updateShowInput.imageURL }),
      ...(updateShowInput.summary && { summary: updateShowInput.summary }),
      ...(updateShowInput.rottenTomatoScore !== undefined && {
        rottenTomatoScore: updateShowInput.rottenTomatoScore,
      }),
      ...(updateShowInput.genres && {
        genre: updateShowInput.genres,
      }),
      ...(updateShowInput.numberOfEpisodes && {
        numberOfEpisodes: updateShowInput.numberOfEpisodes,
      }),
    },
  });
  return show;
}

export async function getTotalNumberOfShowsWatchedByUser(userID: string) {
  const watchCount = await prisma.userShow.count({
    where: {
      userID,
    },
  });
  return watchCount;
}

export async function getNumberOfUpdatedShowsByUser(userID: string) {
  const watchCount = await prisma.userShow.count({
    where: {
      userID,
      show: {
        numberOfEpisodes: {
          gt: 0,
        },
        genre: {
          isEmpty: false,
        },
      },
    },
  });
  return watchCount;
}

export async function getNumberOfUpdatedTomatoeScores(userID: string) {
  const watchCount = await prisma.userShow.count({
    where: {
      userID,
      show: {
        rottenTomatoScore: {
          gte: 0,
        },
      },
    },
  });
  return watchCount;
}

export async function getUsersFirstShow(userID: string): Promise<Show> {
  const usersFirstShowRes = await prisma.userEpisode.findFirst({
    where: {
      userShow: {
        userID,
      },
    },
    orderBy: {
      datePlayed: "asc",
    },
    include: {
      userShow: {
        include: {
          show: true,
        },
      },
    },
  });

  if (!usersFirstShowRes) throw new Error("show not found`");
  const usersFirstShow: Show = {
    id: usersFirstShowRes.userShow?.show.id as string,
    dateFirstPlayed: usersFirstShowRes.datePlayed.toString(),
    title: usersFirstShowRes.userShow?.show.title as string,
    summary: usersFirstShowRes.userShow?.show.summary as string,
    genres: usersFirstShowRes.userShow?.show.genre as string[],
    imageURL: usersFirstShowRes.userShow?.show.imageURL as string,
  };

  return usersFirstShow;
}

export async function getTop3ShowsByUser(
  userID: string,
  lastOneYear: boolean = true,
) {
  const topShows: Show[] = await prisma.$queryRaw`
    WITH ShowDetails AS (
      SELECT 
          s.id AS id, 
          s.title AS title, 
          s.summary AS summary,
          s.genre AS genres,
          s."imageURL",
          s."numberOfEpisodes",
          COUNT(ue.id) AS "watchCount"
      FROM 
          "userEpisode" ue
      INNER JOIN 
          "userShow" us ON ue."userShowID" = us.id
      INNER JOIN 
          "show" s ON us."showID" = s.id
      WHERE 
          us."userID" = ${userID}
          AND (
            ${lastOneYear} = false
            OR ue."datePlayed" > CURRENT_DATE - INTERVAL '1 year'
          )
      GROUP BY 
          s.id
    )
    SELECT 
      id, 
      title, 
      summary, 
      genres, 
      "imageURL", 
      "numberOfEpisodes",
      "watchCount"
    FROM 
      ShowDetails
    ORDER BY  
      "watchCount" DESC,
      "numberOfEpisodes" DESC
    LIMIT 3;
    `;
  for (const show of topShows) {
    if (show?.watchCount && show?.numberOfEpisodes) {
      // eslint-disable-next-line no-unused-expressions
      show.watchCount > show.numberOfEpisodes
        ? console.info(
            `INFO: ${show.title} has more watchCounts ${show.watchCount} than episodes ${show.numberOfEpisodes}`,
          )
        : "";
    }
  }
  return topShows;
}

export async function getUsersMostWatchedActor(userID: string) {
  const mostWatchedActor: any = await prisma.$queryRaw`
      SELECT 
        a.id, a.name, a."imageURL", COUNT(DISTINCT sa."showID") AS shows_count, AVG(sa.popularity) AS avg_popularity
      FROM 
        "userShow" us
      INNER JOIN 
        "show" s ON us."showID" = s.id
      INNER JOIN 
        "showActor" sa ON s.id = sa."showID"
      INNER JOIN 
        "actor" a ON sa."actorID" = a.id
      WHERE 
        us."userID" = ${userID}
      GROUP BY 
        a.id
      ORDER BY 
        shows_count DESC, avg_popularity DESC
      LIMIT 1;
    `;
  return mostWatchedActor;
}

export async function getUsersTopShowsByActor(userID: string) {
  const mostWatchedActor = await getUsersMostWatchedActor(userID);

  const topShowsForActorByUserRes: any = await prisma.$queryRaw`
      SELECT 
        s.id AS "showID",
        s.title,
        COUNT(DISTINCT ue."id") AS "episodesWatched"
      FROM 
        "userEpisode" ue
      INNER JOIN 
        "userShow" us ON ue."userShowID" = us.id
      INNER JOIN 
        "show" s ON us."showID" = s.id
      INNER JOIN 
        "showActor" sa ON s.id = sa."showID"
      WHERE 
        us."userID" = ${userID} AND sa."actorID" = ${mostWatchedActor[0].id}
      GROUP BY 
        s.id
      ORDER BY 
        "episodesWatched" DESC
      LIMIT 5;
    `;

  if (!topShowsForActorByUserRes) throw new Error("actors shows not found`");

  const actorsTop5: string[] = topShowsForActorByUserRes.map(
    (show: any) => show.title,
  );

  const topShowsForActorByUser: YourCrossoverStar = {
    topShows: actorsTop5,
    name: mostWatchedActor[0].name,
    imageURL: mostWatchedActor[0].imageURL,
  };

  return topShowsForActorByUser;
}

export async function getUsersTopGenres(userID: string, count = 2) {
  const topGenresRes: any = await prisma.$queryRaw`
    WITH GenreFrequency AS (
      SELECT
        UNNEST(s.genre) AS genre,
        COUNT(*) AS frequency
      FROM
        "userShow" us
      JOIN "show" s ON us."showID" = s.id
      WHERE
        us."userID" = ${userID}
      GROUP BY
        UNNEST(s.genre)
    ), TotalGenres AS (
      SELECT
        SUM(frequency) AS total
      FROM
        GenreFrequency
    )
    SELECT
      gf.genre,
      ROUND((gf.frequency::DECIMAL / tg.total) * 100, 2) AS percentage
    FROM
      GenreFrequency gf, TotalGenres tg
    ORDER BY
      percentage DESC
    LIMIT ${count};
    `;
  const topGenres: TopGenres = topGenresRes.map((genre: any) => {
    return {
      genre: genre.genre,
      percentage: genre.percentage,
    };
  });
  return topGenres;
}

export async function getUserAverageRottenTomatoScore(userID: string) {
  const result: any = await prisma.$queryRaw`
    WITH EpisodeCounts AS (
      SELECT
        us."showID" AS showId,
        COUNT(ue.id) AS episodesWatched,
        s."numberOfEpisodes" AS totalEpisodes,
        s."rottenTomatoScore" AS score
      FROM
        "userEpisode" ue
        INNER JOIN "userShow" us ON ue."userShowID" = us.id
        INNER JOIN "show" s ON us."showID" = s.id
      WHERE
        us."userID" = ${userID} AND
        s."rottenTomatoScore" > 0
      GROUP BY
        us."showID", s."numberOfEpisodes", s."rottenTomatoScore"
    ),
    TotalShows AS (
        SELECT
          COUNT(DISTINCT showId) AS totalShows
        FROM
          EpisodeCounts
    )
    SELECT
      SUM(
        (CAST(episodesWatched AS FLOAT) / CAST(totalEpisodes AS FLOAT)) * score
      ) / (SELECT totalShows FROM TotalShows) AS "weightedScore"
    FROM
      EpisodeCounts;
    `;
  const weightedScore = result[0].weightedScore as number;
  return weightedScore ? Number(weightedScore.toPrecision(3)) : 0;
}
