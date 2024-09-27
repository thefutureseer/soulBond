import { ApolloServer } from 'apollo-server-micro';
import typeDefs from '../../graphql/schema';
import resolvers from '../../graphql/resolvers';

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
export default async function handler(req:any, res:any) {
  await startServer; // Ensure the server is started
  await apolloServer.createHandler({ path: '/api/graphql' })(req, res);
}