import {
  Resolvers,
  QueryGetStatsArgs,
  QueryGetReportCardArgs,
  QueryGetSessionArgs,
} from "../../../__generated__/graphql";

const resolvers: Resolvers = {
  Query: {
    getStats: (_, { sessionID }: QueryGetStatsArgs) => {
      return {};
    },

    getReportCard: (_, { sessionID }: QueryGetReportCardArgs) => {
      return [{ id: "hello user" }];
    },

    getSession: (_, { sessionID }: QueryGetSessionArgs) => {
      return "sessionID";
    },
  },

  Mutation: {
    startSession: (_, { sessionID }: QueryGetSessionArgs) => {
      return "new user created";
    },
  },
};

export default resolvers;
