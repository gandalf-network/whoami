import { AssistantName } from "@prisma/client";
import OpenAI from "openai";
import { AssistantCreateParams } from "openai/resources/beta/assistants";
import { Run } from "openai/resources/beta/threads/runs/runs";

import {
  createAssistant,
  getAssistantByName,
} from "@/actions/database/assistant";
import { BFFAssistant } from "@/helpers/assistants/bff-picker";
import { GeneralShowAssistant } from "@/helpers/assistants/first-and-most-watched-shows-quips";
import { StarSignAssistant } from "@/helpers/assistants/top-genres-star-sign-rtscore-and-personality-quips";
import { OPENAI_API_KEY } from "@/helpers/constants";
import {
  BFF,
  Show,
  TopGenresPersonalityAndStarSignAIResults,
  TopGenres,
  TVShowQuips,
} from "@/types";

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

export async function getTVBFF(
  topGenres: TopGenres,
  characterPersonalities: string,
): Promise<BFF> {
  const openAITopGenresInput = topGenres.map((genre) => {
    return {
      [genre.genre]: genre.percentage,
    };
  });
  const input = {
    topGenres: openAITopGenresInput,
    characterPersonalities,
  };

  return callOpenAI(input, BFFAssistant, "TV_BFF");
}

export async function getStarSign(
  topGenres: TopGenres,
  avgRottenTomatoScore: number,
): Promise<TopGenresPersonalityAndStarSignAIResults> {
  const openAITopGenresInput = topGenres.map((genre) => {
    return {
      [genre.genre]: genre.percentage,
    };
  });
  const input = {
    topGenres: openAITopGenresInput,
    RTScore: avgRottenTomatoScore,
  };
  return callOpenAI(input, StarSignAssistant, "TOP_GENRES_STAR_SIGN");
}

type OAIShowInput = {
  name: string;
  genres: string[];
  summary: string;
};
export async function getFirstAndMostWatchedShowQuips(
  firstShow: Show,
  mostWatchedShow: Show[],
): Promise<TVShowQuips> {
  const firstTVShow: OAIShowInput = {
    name: firstShow.title,
    summary: firstShow.summary as string,
    genres: firstShow.genres as string[],
  };

  const mostWatchedTVShow: OAIShowInput = {
    name: mostWatchedShow[0].title,
    summary: mostWatchedShow[0].summary as string,
    genres: mostWatchedShow[0].genres as string[],
  };

  const input = {
    firstTVShow,
    mostWatchedTVShow,
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error: any) {
    // console.info(error);

    const assistant = await openai.beta.assistants.create(
      assistantCreateParams,
    );
    assistantID = assistant.id;
    await createAssistant({
      assistantID,
      name: assistantName,
    });
  }

  const thread = await openai.beta.threads.create();
  await openai.beta.threads.messages.create(thread.id, {
    role: "user",
    content: inputJSON,
  });

  // Create and poll run
  const run = await openai.beta.threads.runs.createAndPoll(thread.id, {
    assistant_id: assistantID,
  });

  let result;
  const runs = 0;
  const res = await handleRunStatus(run, thread.id, result, runs);
  try {
    const resOBJ = JSON.parse(res);
    return resOBJ;
  } catch (error) {
    console.log(
      `Error Parsing ${assistantName} AI JSON: ${res}. With Input: ${inputJSON}`,
      error,
    );
    throw error;
  }
}

const handleRequiresAction = async (
  run: Run,
  threadID: string,
  res: any,
  runs: number,
) => {
  if (
    run.required_action &&
    run.required_action.submit_tool_outputs &&
    run.required_action.submit_tool_outputs.tool_calls
  ) {
    run = await openai.beta.threads.runs.submitToolOutputsAndPoll(
      threadID,
      run.id,
      {
        tool_outputs: [
          {
            output: JSON.stringify(
              run.required_action?.submit_tool_outputs.tool_calls[0].function
                .arguments,
            ),
            tool_call_id:
              run.required_action.submit_tool_outputs.tool_calls[0].id,
          },
        ],
      },
    );

    return handleRunStatus(run, threadID, res, runs);
  }
};

const handleRunStatus = async (
  run: Run,
  threadID: string,
  res: any,
  runs: number,
): Promise<any> => {
  if (run.status === "requires_action") {
    runs++;
    res = run.required_action?.submit_tool_outputs.tool_calls[0].function
      .arguments as string;
    if (runs > 1) {
      return res;
    }
    return await handleRequiresAction(run, threadID, res, runs);
  } else {
    return res;
  }
};
