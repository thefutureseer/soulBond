import { ApolloServer } from 'apollo-server-micro';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import type { NextApiRequest, NextApiResponse } from 'next';
import typeDefs from 'app/graphql/schema/index'; // Adjust if necessary
import resolvers from 'app/graphql/resolvers/index'; // Adjust if necessary
import prisma from 'app/utils/prisma'; // Ensure this is correct

const plugins = [];
if (process.env.NODE_ENV === 'development') {
  plugins.push(ApolloServerPluginLandingPageGraphQLPlayground());
}

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({ prisma }),
  plugins,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const startServer = apolloServer.start();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await startServer;
  return apolloServer.createHandler({ path: '/api/graphql' })(req, res);
}