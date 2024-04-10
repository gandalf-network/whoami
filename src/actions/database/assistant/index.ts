import { AssistantName, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type CreateAssistantInput = {
  name: AssistantName;
  assistantID: string;
};

export async function createAssistant(
  createAssistantInput: CreateAssistantInput,
) {
  try {
    const assistant = await prisma.assistant.create({
      data: {
        name: createAssistantInput.name,
        assistantID: createAssistantInput.assistantID,
      },
    });

    return { assistant, error: null };
  } catch (error: any) {
    return { assistant: null, error };
  }
}

export async function getAssistantByName(name: AssistantName) {
  try {
    const assistant = await prisma.assistant.findFirstOrThrow({
      where: {
        name,
      },
    });

    return { assistant, error: null };
  } catch (error: any) {
    return { assistant: null, error };
  }
}
