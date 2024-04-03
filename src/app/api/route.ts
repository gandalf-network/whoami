import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextRequest } from "next/server";

import resolvers from "./resolvers";
import typeDefs from "./schema";

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

const handler = startServerAndCreateNextHandler<NextRequest, any>(server, {
  context: async (req: NextRequest) => ({
    req,
    dataSources: {},
  }),
});

export { handler as GET, handler as POST };
