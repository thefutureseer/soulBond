import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { NextRequest } from 'next/server';
import { InMemoryLRUCache } from '@apollo/utils.keyvaluecache';
import { makeExecutableSchema } from '@graphql-tools/schema';
import resolvers from 'graphql/resolvers';
import typeDefs from 'graphql/schema';
import prisma from 'utils/prisma';
import { Context } from 'src/types/context';
import { ApolloServerPluginLandingPageGraphQLPlayground } from "@apollo/server-plugin-landing-page-graphql-playground";

// Utility function to create Apollo Server
const Apollo_Server = () => {

  // Define the GraphQL schema
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  // Create Apollo Server with explicit type for Context
  return new ApolloServer<Context>({
    schema,
    persistedQueries: {
      cache: new InMemoryLRUCache({ maxSize: 100 }), // Cache up to 100 queries
    },
    formatError: (error) => {
      console.error(`[GraphQL Error]: ${error.message}`);
      if (error.extensions?.exception) {
        console.error(`[Exception: GraphQL Rout.ts error: ]:`, error.extensions.exception);
      }
      return {
        message: error.message,
        locations: error.locations,
        path: error.path,
      };
    },
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
  });
};
// Create Apollo handler
const apolloServer = Apollo_Server();
const handler = startServerAndCreateNextHandler(apolloServer, {
  context: async (): Promise<Context> => ({ prisma }),
});

export async function POST(req: NextRequest) {
  return handler(req);
};