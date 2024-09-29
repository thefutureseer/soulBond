// pages/api/graphql.ts
import { ApolloServer } from 'apollo-server-micro';
import typeDefs from '../../graphql/schema/index';
import resolvers from '../../graphql/resolvers/index';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Context } from '../../app/types/context';
import prisma from '../../app/utils/prisma';

const allowedOrigins = [
  'https://soulbond.vercel.app',
  'http://localhost:3000', // development URL
];

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }): Context => {
   return {prisma};
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const startServer = apolloServer.start();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await startServer;

  const origin = req.headers.origin;

  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', origin && allowedOrigins.includes(origin) ? origin : '');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.end();
    return;
  }

  // Set the Access-Control-Allow-Origin for all other requests
  if (origin && typeof origin === 'string' && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', ''); // Deny access for other origins
  }

  try {
    return apolloServer.createHandler({
      path: '/api/graphql',
    })(req, res);
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).send('Internal Server Error');
  }
};