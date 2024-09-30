import { ApolloServer } from 'apollo-server-micro';
import type { NextApiRequest, NextApiResponse } from 'next';
import typeDefs from '../../graphql/schema/index';
import resolvers from '../../graphql/resolvers/index';
import prisma from '../../app/utils/prisma'; //Prisma here instead of resolvers
import { Context } from '../../app/types/context'; 

// Create a new ApolloServer instance
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: (): Context => ({ prisma }), //context, only passing Prisma
});

export const config = {
  api: {
    bodyParser: false, // Required for `apollo-server-micro`
  },
};

const startServer = apolloServer.start();

// Main handler function for the API route
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Start Apollo server once
  await startServer;
  
  // Delegate request handling to Apollo Server
  return apolloServer.createHandler({ path: '/api/graphql' })(req, res);
};;