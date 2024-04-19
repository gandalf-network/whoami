import { AssistantName } from "@prisma/client";
import OpenAI from "openai";
import { AssistantCreateParams } from "openai/resources/beta/assistants/assistants.mjs";

import {
  createAssistant,
  getAssistantByName,
} from "@/actions/database/assistant";
import { OPENAI_API_KEY } from "@/actions/helpers/constants";
import { BFFAssistant } from "@/helpers/assistants/bff-picker";
import { GeneralShowAssistant } from "@/helpers/assistants/first-and-most-rewatched-shows-quips";
import { StarSignAssistant } from "@/helpers/assistants/top-genres-star-sign-rtscore-and-personality-quips";
import {
  BFF,
  Show,
  TopGenresPersonalityAndStarSignAIResults,
  TopGenres,
  TVShowQuips,
} from "../../../types";

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

export async function getTVBFF(
  topGenres: TopGenres,
  characterPersonalities: string,
): Promise<BFF> {
  const input = {
    topGenres,
    characterPersonalities,
  };

  return callOpenAI(input, BFFAssistant, "TV_BFF");
}

export async function getStarSign(
  topGenres: TopGenres,
  avgRottenTomatoScore: number,
): Promise<TopGenresPersonalityAndStarSignAIResults> {
  const input = {
    topGenres,
    RTScore: avgRottenTomatoScore,
  };
  return callOpenAI(input, StarSignAssistant, "TOP_GENRES_STAR_SIGN");
}

type OAIShowInput = {
  name: string;
  genres: string[];
  summary: string;
};
export async function getFirstAndMostRewatchedShowQuips(
  firstShow: Show,
  mostRewatchedShow: Show[],
): Promise<TVShowQuips> {
  const firstTVShow: OAIShowInput = {
    name: firstShow.title,
    summary: firstShow.summary as string,
    genres: firstShow.genres as string[],
  };

  const mostRewatchedTVShow: OAIShowInput = {
    name: mostRewatchedShow[0].title,
    summary: mostRewatchedShow[0].summary as string,
    genres: mostRewatchedShow[0].genres as string[],
  };

  const input = {
    firstTVShow,
    mostRewatchedTVShow,
  };
  return callOpenAI(
    input,
    GeneralShowAssistant,
    "FIRST_AND_MOST_REWATCHED_SHOW_QUIPS",
  );
}

async function callOpenAI(
  input: object,
  assistantCreateParams: AssistantCreateParams,
  assistantName: AssistantName,
) {
  const inputJSON = JSON.stringify(input);

  let assistantID: string;

  try {
    const savedAssistant = await getAssistantByName(assistantName);
    assistantID = savedAssistant.assistantID;
  } catch (error: any) {
    console.log(error);

    const assistant = await openai.beta.assistants.create(
      assistantCreateParams,
    );
    assistantID = assistant.id;
    await createAssistant({
      assistantID,
      name: assistantName,
    });
  }

  let res: string = "";
  const stream = await openai.beta.threads.createAndRunStream({
    assistant_id: assistantID,
    thread: {
      messages: [
        {
          content: inputJSON,
          role: "user",
        },
      ],
    },
  });

  await stream.on("event", async (listner) => {
    if (listner.event === "thread.run.requires_action") {
      res = listner.data.required_action?.submit_tool_outputs.tool_calls[0]
        .function.arguments as string;
    }
  });

  await stream.done();

  const resOBJ = JSON.parse(res);
  return resOBJ;
}
