import api from "api";

import { PERPLEXITY_API_KEY } from "@/actions/helpers/constants";

const perplexityAPI = api("@pplx/v0#29jnn2rlt35the2");

export async function getPersonalities(topShow: string) {
  try {
    perplexityAPI.auth(PERPLEXITY_API_KEY);
    const { data } = await perplexityAPI.post_chat_completions({
      model: "sonar-small-online",
      messages: [
        { role: "system", content: "Be precise and concise." },
        {
          role: "user",
          content: `What are the personalities of the top 5 characters in the series "${topShow}"`,
        },
      ],
    });
    return { personalities: data?.choices[0]?.message?.content, error: null };
  } catch (error) {
    return { personalities: null, error };
  }
}
