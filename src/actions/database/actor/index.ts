import { PrismaClient } from "@prisma/client";
import levenshtein from "js-levenshtein";

import { standardizeName } from "@/actions/helpers/utils";
import { Actor } from "@/types";
const prisma = new PrismaClient();

type CreateActorInput = {
  name: string;
  characterName: string;
  popularity: number;
  showID: string;
  imageURL?: string;
};

export async function createAndConnectActorToShow(
  createActorInput: CreateActorInput,
) {
  try {
    await prisma.show.update({
      where: {
        id: createActorInput.showID,
      },
      data: {
        actors: {
          create: {
            characterName: createActorInput.characterName,
            popularity: createActorInput.popularity,
            actor: {
              connectOrCreate: {
                where: {
                  name: createActorInput.name,
                },
                create: {
                  name: createActorInput.name,
                  imageURL: createActorInput.imageURL,
                },
              },
            },
          },
        },
      },
    });
  } catch (error: any) {
    if (error.code !== "P2002") throw error;
  }
}

export async function findActorByNameAndShow(name: string, showID: string) {
  const actorRes = await prisma.actor.findUnique({
    where: {
      name,
    },
    include: {
      shows: {
        where: {
          showID,
        },
        select: {
          characterName: true,
        },
      },
    },
  });

  if (!actorRes) throw new Error(`"actor ${name} not found`);
  const actor: Actor = {
    id: actorRes.id,
    name: actorRes.name,
    characterName: actorRes.shows[0].characterName,
    imageURL: actorRes.imageURL as string,
  };

  return actor;
}


export async function getActorsByShow(showID: string) {
  const actorsRes = await prisma.showActor.findMany({
    where: { showID },
    include: {
      actor: true,
    },
    orderBy: {
      popularity: "desc",
    },
  });

  if (!actorsRes) throw new Error(`"actor ${name} not found`);

  return actorsRes;
}

export async function getActorsImageByCharacterNameAndShow(
  name: string,
  showID: string,
) {
  const actorRes = await prisma.showActor.findMany({
    where: {
      showID,
    },
    include: {
      actor: true,
    },
  });

  if (!actorRes) throw new Error(`"actor ${name} not found`);

  let imageURL = "";
  for (const actor of actorRes) {
    const levenshteinDistance = levenshtein(
      standardizeName(actor.characterName),
      standardizeName(name),
    );
    console.log(actor.characterName, "=", standardizeName(name))
    const threshold = 0.25 * Math.max(actor.characterName.length, name.length);

    if (levenshteinDistance > threshold) {
      continue;
    }

    imageURL = actor.actor.imageURL ? actor.actor.imageURL : "";
  }

  return imageURL;
}

type UpdateActorInput = {
  id: string;
  imageURL: string;
};

export async function updateActorDetails(updateActorInput: UpdateActorInput) {
  const actor = await prisma.show.update({
    where: {
      id: updateActorInput.id,
    },
    data: {
      imageURL: updateActorInput.imageURL,
    },
  });
  return actor;
}
