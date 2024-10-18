import { ApolloServer } from 'apollo-server-micro';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { makeExecutableSchema } from '@graphql-tools/schema';
const { WebSocketServer } = require('ws');
import { useServer } from 'graphql-ws/lib/use/ws';
import type { NextApiRequest, NextApiResponse } from 'next';
import resolvers from 'graphql/resolvers';
import typeDefs from 'graphql/schema';
import prisma from '../../../app/utils/prisma';
import { createServer } from 'http';
import { Context } from 'types/context';

// Use the environment variable for the port (Render provides PORT automatically)
const wsPort = process.env.PORT || 4000; // Default to 4000 in development

const httpServer = createServer();

// Initialize the WebSocket server
const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/api/graphql', // WebSocket endpoint path
});

useServer({ schema: makeExecutableSchema({ typeDefs, resolvers }) }, wsServer);

// Create Apollo Server
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: (): Context => ({ prisma }),
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()], // Playground for dev
});

export const config = {
  api: {
    bodyParser: false, // GraphQL doesn't use body parsing
  },
};

const startServer = apolloServer.start();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await startServer;
  const apolloHandler = apolloServer.createHandler({ path: '/api/graphql' });
  await apolloHandler(req, res);
};

// Ensure the HTTP server starts listening on Render's dynamic port
if (!httpServer.listening) {
  httpServer.listen(wsPort, () => {
    console.log(`Server ready at http://localhost:${wsPort}/api/graphql`);
    console.log(`WebSocket ready at ws://localhost:${wsPort}/api/graphql`);
  });
};