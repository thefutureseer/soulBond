import { ApolloServer } from 'apollo-server-micro';
import typeDefs from '../../graphql/schema/index';
import resolvers from '../../graphql/resolvers/index';
import type { NextApiRequest, NextApiResponse } from 'next'; // Importing types for request and response


// Initialize the Apollo Server
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true, // Enables schema introspection
  plugins: [
    // Enables the GraphQL Playground
    require('apollo-server-core').ApolloServerPluginLandingPageGraphQLPlayground(),
  ],
});

export const config = {
  api: {
    bodyParser: false, // Required for Apollo Server
  },
};

// Start the server
const startServer = apolloServer.start();

// Export default async function to handle requests
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await startServer; // Ensure the server is started
    return apolloServer.createHandler({ path: '/api/graphql' })(req, res);
  } catch (error) {
    console.error('Error starting Apollo Server:', error);
    res.status(500).send('Internal Server Error');
  }
}