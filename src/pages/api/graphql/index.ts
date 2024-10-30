import { ApolloServer } from 'apollo-server-micro';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { createServer } from 'http';
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
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

// Start the Apollo Server
const startServer = apolloServer.start();

let apolloHandler: any;


// Create the HTTP handler
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // If it's an HTTP request, handle with Apollo
  if (req.url === '/api/graphql') {
    if(!apolloHandler) {

      await startServer;
      apolloHandler = apolloServer.createHandler({ path: '/api/graphql' });
    };
      return apolloHandler(req, res);
  } else {
    res.setHeader('Allow', ['POST', 'OPTIONS']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

// Create the HTTP server
const httpServer = createServer(async (req, res) => {
  // Handle HTTP requests
  await handler(req as NextApiRequest, res as NextApiResponse);
});

// Listen on port 3000 for both HTTP and WebSocket connections
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`HTTP server running on http: port# ${PORT}/api/graphql`);
  console.log(`WebSocket server ready for subscriptions at ws:port# ${PORT}/api/graphql`);
});

// Export the handler for Next.js
export default handler;

// Optional: Configuration to disable bodyParser for Apollo
export const config = {
  api: {
    bodyParser: false, // Disable body parsing so Apollo can handle the request
  },
};