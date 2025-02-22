import { ApolloServer } from 'apollo-server-micro';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { InMemoryLRUCache } from '@apollo/utils.keyvaluecache';
import { makeExecutableSchema } from '@graphql-tools/schema';
import type { NextApiRequest, NextApiResponse } from 'next';
import resolvers from 'graphql/resolvers';
import typeDefs from 'graphql/schema';
import prisma from '../../../app/utils/prisma';
import { Context } from 'types/context';

// Define the GraphQL schema
const schema = makeExecutableSchema({ typeDefs, resolvers });

// Create the Apollo Server
const apolloServer = new ApolloServer({
  schema,
  context: (): Context => {return ({ prisma })},
  persistedQueries: {
    cache: new InMemoryLRUCache({ maxSize: 100 }), // Bounded cache with a max of 100 items
  },
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

// Start the Apollo Server
const startServer = apolloServer.start();

// Create the HTTP handler
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await startServer;
  if (req.method === 'POST' || req.method ==='OPTIONS') {

     await apolloServer.createHandler({ path: '/api/graphql' })(req, res);
  } else {
    res.setHeader('Allow', ['POST', 'OPTIONS']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

// Export the handler for Next.js
export default handler;

// Optional: Configuration to disable bodyParser for Apollo
export const config = {
  api: {
    bodyParser: false, // Disable body parsing so Apollo can handle the request
  },
};