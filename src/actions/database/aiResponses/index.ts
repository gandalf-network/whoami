import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type CreateOrUpdateUsersAIResponseInput = {
  topGenresQuip?: string;
  starSign?: string;
  starSignQuip?: string;
  rtScoreQuip?: string;
  personality?: string;
  personalityQuip?: string;
  firstTVShowQuip?: string;
  mostRewatchedTVShowQuip?: string;
  bff?: string;
  bffQuip?: string;
  userID: string;
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
    ...(input.mostRewatchedTVShowQuip && {
      mostRewatchedTVShowQuip: input.mostRewatchedTVShowQuip,
    }),
    ...(input.bff && { bff: input.bff }),
    ...(input.bffQuip && { bffQuip: input.bffQuip }),
  };
}
