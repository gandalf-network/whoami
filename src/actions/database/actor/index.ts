import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type CreateActorInput = {
  name: string;
  showID: string;
  imageURL?: string;
};

export async function createAndConnectActorToShow(
  createActorInput: CreateActorInput,
) {
  await prisma.show.update({
    where: {
      id: createActorInput.showID,
    },
    data: {
      actors: {
        connectOrCreate: {
          where: {
            name: createActorInput.name,
          },
          create: {
            name: createActorInput.name,
            ...(createActorInput.imageURL && {
              imageURL: createActorInput.imageURL,
            }),
          },
        },
      },
    },
  });

  const actor = await prisma.actor.findUnique({
    where: {
      name: createActorInput.name,
    },
  });

  return actor;
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
