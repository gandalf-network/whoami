import { PrismaClient, UserState } from "@prisma/client";
const prisma = new PrismaClient();

export async function findOrCreateUserBySessionID(sessionID: string) {
  const user = await prisma.user.upsert({
    where: {
      identifier: sessionID,
    },
    create: {
      identifier: sessionID,
    },
    update: {},
  });
  return user;
}

type UpdateUserInput = {
  id: string;
  state: UserState;
};

export async function updateUser(updateUserInput: UpdateUserInput) {
  const user = await prisma.user.update({
    where: {
      id: updateUserInput.id,
    },
    data: {
      state: updateUserInput.state,
    },
  });
  return user;
}
