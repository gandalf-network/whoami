import { AssistantName, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type CreateAssistantInput = {
  name: AssistantName;
  assistantID: string;
};

export async function createAssistant(
  createAssistantInput: CreateAssistantInput,
) {
  const assistant = await prisma.assistant.create({
    data: {
      name: createAssistantInput.name,
      assistantID: createAssistantInput.assistantID,
    },
  });

  return assistant;
}

export async function getAssistantByName(name: AssistantName) {
  const assistant = await prisma.assistant.findFirstOrThrow({
    where: {
      name,
    },
  });

  return assistant;
}
