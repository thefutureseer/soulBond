import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { NextRequest } from 'next/server';
import { InMemoryLRUCache } from '@apollo/utils.keyvaluecache';
import { makeExecutableSchema } from '@graphql-tools/schema';
import resolvers from 'graphql/resolvers';
import typeDefs from 'graphql/schema';
import prisma from 'src/utils/prisma';
import { Context } from 'src/types/context';

// Define the GraphQL schema
const schema = makeExecutableSchema({ typeDefs, resolvers });

// Create Apollo Server with explicit type for Context
const apolloServer = new ApolloServer<Context>({
  schema,
  persistedQueries: {
    cache: new InMemoryLRUCache({ maxSize: 100 }), // Cache up to 100 queries
  },
  formatError: (error) => {
    console.error(error);
    return error;
  },
});

// Create Apollo handler
const handler = startServerAndCreateNextHandler(apolloServer, {
  context: async (): Promise<Context> => ({ prisma }),
});

export async function POST(req: NextRequest) {
  return handler(req);
};