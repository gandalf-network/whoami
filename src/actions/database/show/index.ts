import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type CreateShowInput = {
  title: string;
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
          ...(createShowInput.imageURL && {
            imageURL: createShowInput.imageURL,
          }),
          ...(createShowInput.season && { season: createShowInput.season }),
          ...(createShowInput.genre && { genre: createShowInput.genre }),
          ...(createShowInput.episode && { episode: createShowInput.episode }),
        },
      });
    }

    if (!show) {
      return {
        show: null,
        error: new Error(
          `could not find or update this show: ${createShowInput.title}`,
        ),
      };
    }

    await prisma.userShow.upsert({
      where: {
        userId_showId: {
          userId: createShowInput.userID,
          showId: show.id,
        },
      },
      update: {},
      create: {
        userId: createShowInput.userID,
        showId: show.id,
        datePlayed: createShowInput.datePlayed,
      },
    });

    return { show, error: null };
  } catch (error: any) {
    return { show: null, error };
  }
}

type UpdateShowInput = {
  id: string;
  genre?: string;
  imageURL?: string;
  season?: number;
  episode?: number;
};

export async function updateShow(updateShowInput: UpdateShowInput) {
  try {
    const show = await prisma.show.update({
      where: {
        id: updateShowInput.id,
      },
      data: {
        ...(updateShowInput.imageURL && { imageURL: updateShowInput.imageURL }),
        ...(updateShowInput.season && { season: updateShowInput.season }),
        ...(updateShowInput.genre && { genre: updateShowInput.genre }),
        ...(updateShowInput.episode && { episode: updateShowInput.episode }),
      },
    });
    return { show, error: null };
  } catch (error: any) {
    return { show: null, error };
  }
}
