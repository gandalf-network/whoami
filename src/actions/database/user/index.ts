import { UserState } from "@prisma/client";

import { prisma } from "@/actions/store/prisma";

export async function createUserBySessionID(sessionID: string) {
  const user = await prisma.user.create({
    data: {
      identifier: sessionID,
    },
  });
  return user;
}

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

export async function findUserBySessionID(sessionID: string) {
  const user = await prisma.user.findFirst({
    where: {
      identifier: sessionID,
    },
  });

  return user;
}

export async function upsertUser(sessionID: string, dataKey: string) {
  const user = await prisma.user.upsert({
    where: {
      identifier: sessionID,
    },
    create: {
      identifier: sessionID,
      dataKey,
    },
    update: {
      dataKey,
    },
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
