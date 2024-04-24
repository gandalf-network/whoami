import api from "api";

import { PERPLEXITY_API_KEY } from "../../../actions/helpers/constants";

const perplexityAPI = api("@pplx/v0#29jnn2rlt35the2");

export async function getPersonalities(characters: string[], topShow: string) {
  perplexityAPI.auth(PERPLEXITY_API_KEY);
  const { data } = await perplexityAPI.post_chat_completions({
    model: "sonar-small-online",
    messages: [
      { role: "system", content: "Be precise and concise." },
      {
        role: "user",
        content: `Given the following characters ${characters} from the TV show "${topShow}". What are their personalities`,
      },
    ],
  });
  
  return data?.choices[0]?.message?.content as string;
}