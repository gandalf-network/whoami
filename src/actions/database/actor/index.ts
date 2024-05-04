import { PrismaClient } from "@prisma/client";
import levenshtein from "js-levenshtein";

import { standardizeName } from "@/actions/helpers/utils";
import { Actor, ActorInput } from "@/types";
const prisma = new PrismaClient();

export async function createActorsAndConnectToShow(
  actors: ActorInput[],
  showID: string,
) {
  try {
    await prisma.actor.createMany({
      data: actors.map((actor) => ({
        name: actor.name,
        imageURL: actor.imageURL,
      })),
      skipDuplicates: true,
    });

    const actorNames = actors.map((actor) => actor.name);
    const createdActors = await prisma.actor.findMany({
      where: { name: { in: actorNames } },
      select: { id: true, name: true },
    });
    const actorMap = new Map(
      createdActors.map((actor) => [actor.name, actor.id]),
    );

    const showActors = actors.map((actor) => {
      const actorID = actorMap.get(actor.name);
      if (!actorID) {
        throw new Error(`Failed to find ID for actor ${actor.name}`);
      }
      return {
        actorID,
        showID,
        characterName: actor.characterName,
        popularity: actor.popularity,
      };
    });

    await prisma.showActor.createMany({
      data: showActors,
      skipDuplicates: true,
    });
  } catch (error: any) {
    console.error("An error occurred:", error);
    throw error;
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

export async function getActorIdsByNames(names: string[]) {
  const actors = await prisma.actor.findMany({
    where: {
      name: { in: names },
    },
    select: { id: true, name: true },
  });
  return actors;
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
