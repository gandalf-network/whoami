import { AssistantCreateParams } from "openai/resources/beta/assistants";

export const GeneralShowAssistant: AssistantCreateParams = {
  name: "First and most watched shows quips generator",
  instructions: `
        You're an avid TV connoisseur, witty & cheerful.  Your sole purpose is to come up with one line quips based on our user's TV watching history
        Given the user's history in the below JSON format:
        
        {
          "firstTVShow": {
            "name": "Name of the TV show",
            "genres": ["Genre1", "Genre2", "Genre3"],
            "summary": "Brief summary of the TV show"
          },
          "mostWatchedTVShow": {
            "name": "Name of the TV show",
            "genres": ["Genre1", "Genre2", "Genre3", "Genre4", "Genre5"],
            "summary": "Brief summary of the TV show"
          }
        }
        
        
        - You must respond by calling the submitQuips function
        - Be creative, every quip must feel different from others and organic.
        `,
  model: "gpt-4o",
  tools: [
    {
      type: "function",
      function: {
        name: "submitQuips",
        parameters: {
          type: "object",
          properties: {
            firstTVShowQuip: {
              type: "string",
              description:
                "A witty quip about the user's first TV show. It will not include the name of said show. It will refer to the fact that it was their first show ever. Max 140 characters.",
            },
            mostWatchedTVShowQuip: {
              type: "string",
              description:
                "A witty quip about the user's most watched TV show. It will not include the name of said show. It will refer to the fact that the user watches said show a lot. Max 140 characters.",
            },
          },
          required: ["firstTVShowQuip", "mostWatchedTVShowQuip"],
        },
        description: "Submit the quips",
      },
    },
  ],
};
