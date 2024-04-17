import { PrismaClient } from "@prisma/client";

import { Show, TopGenres, YourCrossoverStar } from "@/types";

const prisma = new PrismaClient();

type insertEpisodeInput = {
  title: string;
  datePlayed: string;
  userShowID: string;
  season: number;
  episode: number;
};

export async function batchInertEpisodes(input: insertEpisodeInput[]) {
  await prisma.userEpisode.createMany({
    data: input,
    skipDuplicates: true,
  });
}

type CreateShowInput = {
  title: string;
  userID: string;
};

export async function createAndConnectShowToUser(
  createShowInput: CreateShowInput,
) {
  const showRes = await prisma.show.upsert({
    where: {
      title: createShowInput.title,
    },
    create: {
      title: createShowInput.title,
    },
    update: {},
  });

  if (!showRes)
    throw new Error(
      `could not find or update this show: ${createShowInput.title}`,
    );

  const userShow = await prisma.userShow.upsert({
    where: {
      userShowID: {
        userID: createShowInput.userID,
        showID: showRes.id,
      },
    },
    create: {
      userID: createShowInput.userID,
      showID: showRes.id,
    },
    update: {},
  });

  const show = {
    ...showRes,
    userShowID: userShow.id,
  };

  return show;
}

type UpdateShowInput = {
  id: string;
  imageURL?: string;
  summary?: string;
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
      ...(updateShowInput.rottenTomatoScore && {
        rottenTomatoScore: updateShowInput.rottenTomatoScore,
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

export async function getTop5ShowsByUser(
  userID: string,
  lastOneYear: boolean = false,
) {
  const topShows: Show[] = await prisma.$queryRaw`
      SELECT 
        s.id AS id, 
        s.title AS title, 
        s.summary as summary,
        s.genre as genres,
        s."imageURL",
        s."numberOfEpisodes" as numberOfEpisodes,
      COUNT(ue.id) AS watchCount,
      COUNT(ue.id)::FLOAT / s."numberOfEpisodes" AS score
      FROM 
        "userEpisode" ue
      INNER JOIN 
        "userShow" us ON ue."userShowID" = us.id
      INNER JOIN 
        "show" s ON us."showID" = s.id
      WHERE 
        us."userID" = ${userID}
        AND
          ${lastOneYear} = false
          OR ue."datePlayed" > CURRENT_DATE - INTERVAL '1 year'
      GROUP BY 
        s.id
      ORDER BY 
        score DESC, numberOfEpisodes DESC
      LIMIT 5;
    `;
  return topShows;
}

export async function getUsersMostWatchedActor(userID: string) {
  const mostWatchedActor: any = await prisma.$queryRaw`
      SELECT 
        a.id, a.name, a."imageURL", COUNT(DISTINCT sa."showID") AS shows_count
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
        shows_count DESC
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
      [genre.genre]: genre.percentage,
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
        us."userID" = ${userID}
      GROUP BY
        us."showID", s."numberOfEpisodes", s."rottenTomatoScore"
    )
    SELECT
      SUM(
        (CAST(episodesWatched AS FLOAT) / CAST(totalEpisodes AS FLOAT)) * score
      ) AS "weightedScore"
    FROM
      EpisodeCounts;
    `;
  const weightedScore = result[0].weightedScore as number;
  return Number(weightedScore.toPrecision(3));
}