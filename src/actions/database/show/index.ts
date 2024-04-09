import { PrismaClient } from "@prisma/client";

import { Episode, Show, YourCrossoverStar } from "@/types";

const prisma = new PrismaClient();

type CreateShowInput = {
  title: string;
  numberOfEpisodes: number;
  episodeTitle: string;
  datePlayed: string;
  userID: string;
  genre?: string;
  imageURL?: string;
  season?: number;
  episode?: number;
};

export async function createAndConnectShowToUser(
  createShowInput: CreateShowInput,
) {
  try {
    let show = await prisma.show.findUnique({
      where: {
        title: createShowInput.title,
      },
    });

    if (!show) {
      show = await prisma.show.create({
        data: {
          title: createShowInput.title,
          numberOfEpisodes: createShowInput.numberOfEpisodes,
          ...(createShowInput.imageURL && {
            imageURL: createShowInput.imageURL,
          }),
          ...(createShowInput.genre && { genre: createShowInput.genre }),
        },
      });
    }

    if (!show) {
      return {
        episode: null,
        error: new Error(
          `could not find or update this show: ${createShowInput.title}`,
        ),
      };
    }

    const episode = await prisma.episode.upsert({
      where: {
        uniqueShowSeasonEpisode: {
          showID: show.id,
          episode: createShowInput.episode || 0,
          season: createShowInput.season || 0,
        },
      },
      update: {},
      create: {
        showID: show.id,
        ...(createShowInput.season && { season: createShowInput.season }),
        ...(createShowInput.episode && { episode: createShowInput.episode }),
      },
    });

    await prisma.userEpisode.create({
      data: {
        userID: createShowInput.userID,
        episodeID: episode.id,
        datePlayed: createShowInput.datePlayed,
      },
    });

    await prisma.userShow.upsert({
      where: {
        userShowID: {
          userID: createShowInput.userID,
          showID: show.id,
        },
      },
      create: {
        userID: createShowInput.userID,
        showID: show.id,
      },
      update: {},
    });
    episode.showID = show.id;
    return { episode, error: null };
  } catch (error: any) {
    return { episode: null, error };
  }
}

type UpdateShowInput = {
  id: string;
  imageURL?: string;
  numberOfEpisodes: number;
};

export async function updateShow(updateShowInput: UpdateShowInput) {
  try {
    const show = await prisma.show.update({
      where: {
        id: updateShowInput.id,
      },
      data: {
        ...(updateShowInput.imageURL && { imageURL: updateShowInput.imageURL }),
        ...(updateShowInput.numberOfEpisodes && {
          numberOfEpisodes: updateShowInput.numberOfEpisodes,
        }),
      },
    });
    return { show, error: null };
  } catch (error: any) {
    return { show: null, error };
  }
}

type UpdateEpisodeInput = {
  id: string;
  season?: number;
  episode?: number;
};

export async function updateEpisode(updateEpisodeInput: UpdateEpisodeInput) {
  try {
    const episode = await prisma.episode.upsert({
      where: {
        id: updateEpisodeInput.id,
      },
      update: {
        ...(updateEpisodeInput.season && { season: updateEpisodeInput.season }),
        ...(updateEpisodeInput.episode && {
          episode: updateEpisodeInput.episode,
        }),
      },
      create: {},
    });
    return { episode, error: null };
  } catch (error: any) {
    return { episode: null, error };
  }
}

export async function getTotalNumberOfShowsWatchedByUser(userID: string) {
  try {
    const watchCount = await prisma.userShow.count({
      where: {
        userID,
      },
    });
    return { watchCount, error: null };
  } catch (error: any) {
    return { watchCount: null, error };
  }
}

export async function getUsersFirstShow(userID: string) {
  try {
    const usersFirstShowRes = await prisma.user.findUnique({
      where: { id: userID },
      select: {
        episodes: {
          orderBy: {
            datePlayed: "asc",
          },
          take: 1,
          select: {
            datePlayed: true,
            episode: {
              select: {
                id: true,
                show: true,
              },
            },
          },
        },
      },
    });

    if (!usersFirstShowRes)
      return { usersFirstShow: null, error: new Error("show not found`") };

    const usersFirstShow: Show = {
      id: usersFirstShowRes.episodes[0].episode.show?.id as string,
      dateFirstPlayed: usersFirstShowRes.episodes[0].datePlayed.toString(),
      title: usersFirstShowRes.episodes[0].episode.show?.title as string,
      imageURL: usersFirstShowRes.episodes[0].episode.show?.imageURL as string,
    };

    return { usersFirstShow, error: null };
  } catch (error) {
    return { usersFirstShow: null, error };
  }
}

export async function getTop5ShowsByUser(
  userID: string,
  lastOneYear: boolean = false,
) {
  try {
    const topShows: Show[] = await prisma.$queryRaw`
      SELECT 
        s.id AS id, 
        s.title AS title, 
        s."imageURL",
      COUNT(ue.id) AS watchCount,
      COUNT(ue.id)::FLOAT / s."numberOfEpisodes" AS score
      FROM 
        "user_episode" ue
      INNER JOIN 
        "episode" e ON ue."episodeID" = e.id
      INNER JOIN 
        "show" s ON e."showID" = s.id
      WHERE 
        ue."userID" = ${userID}
        AND
          ${lastOneYear} = false
          OR ue."datePlayed" > CURRENT_DATE - INTERVAL '1 year'
      GROUP BY 
        s.id
      ORDER BY 
        score DESC
      LIMIT 5;
    `;
    return { topShows, error: null };
  } catch (error) {
    return { topShows: null, error };
  }
}

export async function getTop5ShowsByUserByDuration(userID: string) {
  try {
    const topShows: Show[] = await prisma.$queryRaw`
      SELECT 
        s.id AS id, 
        s.title AS title, 
        s."imageURL",
      COUNT(ue.id) AS watchCount,
      COUNT(ue.id)::FLOAT / s."numberOfEpisodes" AS score
      FROM 
        "user_episode" ue
      INNER JOIN 
        "episode" e ON ue."episodeID" = e.id
      INNER JOIN 
        "show" s ON e."showID" = s.id
      WHERE 
        ue."userID" = ${userID}
      GROUP BY 
        s.id
      ORDER BY 
        score DESC
      LIMIT 5;
    `;
    return { topShows, error: null };
  } catch (error) {
    return { topShows: null, error };
  }
}

export async function getUsersMostWatchedEpisodeByShow(
  userID: string,
  showID: string,
) {
  try {
    const topEpisodes: Episode[] = await prisma.$queryRaw`
      SELECT 
        e.id, 
        e.season, 
        e.episode, 
      COUNT(ue.id) AS watchCount
      FROM 
        "user_episode" ue
      INNER JOIN 
        "episode" e ON ue."episodeID" = e.id
      WHERE 
        ue."userID" = ${userID}
        AND e."showID" = ${showID}
      GROUP BY 
        e.id
      ORDER BY 
        watchCount DESC
      LIMIT 1;
    `;
    return { topEpisode: topEpisodes[0], error: null };
  } catch (error) {
    return { topEpisode: null, error };
  }
}

export async function getUsersMostWatchedActor(userID: string) {
  try {
    const mostWatchedActor: any = await prisma.$queryRaw`
      SELECT 
        a.id, a.name, a."imageURL", COUNT(DISTINCT sa."B") AS shows_count
      FROM 
        "user_show" us
      INNER JOIN 
        "show" s ON us."showID" = s.id
      INNER JOIN 
        "_actorToshow" sa ON s.id = sa."B"
      INNER JOIN 
        "actor" a ON sa."A" = a.id
      WHERE 
        us."userID" = ${userID}
      GROUP BY 
        a.id
      ORDER BY 
        shows_count DESC
      LIMIT 1;
    `;
    return { mostWatchedActor, error: null };
  } catch (error) {
    return { mostWatchedActor: null, error };
  }
}

export async function getUsersTopShowsByActor(userID: string) {
  try {
    const { mostWatchedActor, error } = await getUsersMostWatchedActor(userID);
    if (error || !mostWatchedActor) {
      return { topShowsForActorByUser: null, error };
    }

    const topShowsForActorByUserRes: any = await prisma.$queryRaw`
      SELECT 
        s.id AS "showID",
        s.title,
        COUNT(DISTINCT ue."episodeID") AS "episodesWatched"
      FROM 
        "user_episode" ue
      INNER JOIN 
        "episode" e ON ue."episodeID" = e.id
      INNER JOIN 
        "show" s ON e."showID" = s.id
      INNER JOIN 
        "_actorToshow" sa ON s.id = sa."B"
      WHERE 
        ue."userID" = ${userID} AND sa."A" = ${mostWatchedActor[0].id}
      GROUP BY 
        s.id
      ORDER BY 
        "episodesWatched" DESC
      LIMIT 5;
    `;

    if (!topShowsForActorByUserRes)
      return {
        topShowsForActorByUser: null,
        error: new Error("actors shows not found`"),
      };

    const actorsTop5: string[] = topShowsForActorByUserRes.map(
      (show: any) => show.title,
    );
    const topShowsForActorByUser: YourCrossoverStar = {
      topShows: actorsTop5,
      name: mostWatchedActor[0].name,
      imageURL: mostWatchedActor[0].imageURL,
    };

    return { topShowsForActorByUser, error: null };
  } catch (error) {
    return { topShowsForActorByUser: null, error };
  }
}
