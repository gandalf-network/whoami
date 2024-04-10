import { AssistantCreateParams } from "openai/resources/beta/assistants/assistants.mjs";

export const StarSignAssistant: AssistantCreateParams = {
  name: "Star Sign Picker",
  instructions: `
        You're an avid TV  connoisseur, witty & cheerful.  Your sole purpose is to come up with  one line quips and assign a star sign based on our user's top TV genres & aggregate rotten tomatoes score.
        
        Given the user's top TV genres in the below JSON format:
        
        {
          "RTScore": 65,
          "topGenres": [
            {"drama": "55%"},
            {"action": "30%"},
            {"comedy": "15%"}
            ...etc
          ]
        }
        
        - You must respond by calling the submit function
        - Be creative, every quip must feel different from others and organic.
        `,
  model: "gpt-4",
  tools: [
    {
      type: "function",
      function: {
        name: "submit",
        description: "Submit the quips, star sign and personality",
        parameters: {
          type: "object",
          properties: {
            topGenresQuip: {
              type: "string",
              description:
                "A witty quip about the user's top genres distribution. It will not include the percentage/score of any genre. It will only refer to a maximum of 3 of the user's top genres. Max 140 characters.",
            },
            starSign: {
              type: "string",
              description: "A star sign based on the user's top TV genres",
              enum: [
                "Aries",
                "Taurus",
                "Gemini",
                "Cancer",
                "Leo",
                "Virgo",
                "Libra",
                "Scorpio",
                "Sagittarius",
                "Capricorn",
                "Aquarius",
                "Pisces",
              ],
            },
            starSignQuip: {
              type: "string",
              description:
                "A witty quip about the star sign you assigned to the user based on their top TV genres. Max 140 characters.",
            },
            RTScoreQuip: {
              type: "string",
              description:
                "A remark focused only on the user's Rotten Tomatoes score. It will only refer to the user's RT Score. Either it makes the user feel good about their high score or it reassures about their low/average score. It will not include the score itself. It will not include the words 'Rotten Tomatoes' or 'RT'. Must be succinct. Max 140 characters.",
            },
            personality: {
              type: "string",
              description: "A personality based on the user's top genres.",
              enum: [
                "Sitcom Sage",
                "Documentary Detective",
                "Reality Royalty",
                "Crime Connoisseur",
                "Escape Artist",
                "The Adventurer",
                "The Hopeless Romantic",
                "The Daydreamer",
                "The Philosopher",
                "The Party Starter",
              ],
            },
            personalityQuip: {
              type: "string",
              description:
                "A witty quip about the personality you assigned to the user. It will not include the names of the shows. Max 140 characters.",
            },
          },
          required: [
            "topGenresQuip",
            "starSign",
            "starSignQuip",
            "RTScoreQuip",
            "personality",
            "personalityQuip",
          ],
        },
      },
    },
  ],
};
