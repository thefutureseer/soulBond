import { ApolloServer } from 'apollo-server-micro';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { makeExecutableSchema } from '@graphql-tools/schema';
const { WebSocketServer } = require('ws');
import { useServer } from 'graphql-ws/lib/use/ws';
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
  context: (): Context => ({ prisma }),
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

// Start the Apollo Server
const startServer = apolloServer.start();

// Create the HTTP handler
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // If it's an HTTP request, handle with Apollo
  if (req.url === '/api/graphql') {
    await startServer;
    const apolloHandler = apolloServer.createHandler({ path: '/api/graphql' });
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

// Initialize the WebSocket server on the same HTTP server
const wsServer = new WebSocketServer({
  noServer: true, // We don't want WebSocketServer to listen on a port, we want to integrate it with httpServer
});

// Handle WebSocket connections for subscriptions
useServer({ schema }, wsServer);

// Upgrade HTTP to WebSocket if needed
httpServer.on('upgrade', (request, socket, head) => {
  if (request.url === '/api/graphql') {
    wsServer.handleUpgrade(request, socket, head, (websocket: any) => {
      wsServer.emit('connection', websocket, request);
    });
  }
});

// Listen on port 3000 for both HTTP and WebSocket connections
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`HTTP server running on  http://localhost:${PORT}/api/graphql`);
  console.log(`WebSocket server ready for subscriptions at ws://localhost:${PORT}/api/graphql`);
});

// Export the handler for Next.js
export default handler;

// Optional: Configuration to disable bodyParser for Apollo
export const config = {
  api: {
    bodyParser: false, // Disable body parsing so Apollo can handle the request
  },
};