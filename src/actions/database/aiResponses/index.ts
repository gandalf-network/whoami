import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export type CreateOrUpdateUsersAIResponseInput = {
  topGenresQuip?: string;
  starSign?: string;
  starSignQuip?: string;
  rtScoreQuip?: string;
  personality?: string;
  personalityQuip?: string;
  firstTVShowQuip?: string;
  mostWatchedTVShowQuip?: string;
  bffImageURL?: string;
  userID: string;
  BFF?: string;
  BFFQuip?: string;
};

export async function createOrUpdateUsersAIResponse(
  input: CreateOrUpdateUsersAIResponseInput,
) {
  const assistant = await prisma.aiResponse.upsert({
    where: {
      userID: input.userID,
    },
    create: {
      userID: input.userID,
      ...getData(input),
    },
    update: {
      ...getData(input),
    },
  });

  return assistant;
}

function getData(input: CreateOrUpdateUsersAIResponseInput) {
  return {
    ...(input.topGenresQuip && { topGenresQuip: input.topGenresQuip }),
    ...(input.starSign && { starSign: input.starSign }),
    ...(input.starSignQuip && { starSignQuip: input.starSignQuip }),
    ...(input.rtScoreQuip && { rtScoreQuip: input.rtScoreQuip }),
    ...(input.personality && { personality: input.personality }),
    ...(input.personalityQuip && { personalityQuip: input.personalityQuip }),
    ...(input.firstTVShowQuip && { firstTVShowQuip: input.firstTVShowQuip }),
    ...(input.mostWatchedTVShowQuip && {
      mostWatchedTVShowQuip: input.mostWatchedTVShowQuip,
    }),
    ...(input.BFF && { bff: input.BFF }),
    ...(input.BFFQuip && { bffQuip: input.BFFQuip }),
    ...(input.bffImageURL && { bffImageURL: input.bffImageURL }),
  };
}
