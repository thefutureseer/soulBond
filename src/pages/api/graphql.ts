import { ApolloServer } from 'apollo-server-micro';
import typeDefs from '../../graphql/schema/index';
import resolvers from '../../graphql/resolvers/index';
import type { NextApiRequest, NextApiResponse } from 'next'; // Importing types for request and response
import Cors from 'cors';

const cors = Cors({
  origin: 'https://soulbond-u4ynixe6j-thefutureseers-projects.vercel.app', // Specify the allowed origin
  methods: ['POST', 'GET', 'OPTIONS'], // Specify allowed methods
  allowedHeaders: ['Content-Type'], // Specify allowed headers
})

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

// Middleware to run CORS
const runMiddleware = (req: NextApiRequest, res: NextApiResponse, fn: any) =>
  new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) return reject(result);
      resolve(result);
    });
  });

// Export default async function to handle requests
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await runMiddleware(req, res, cors); // Run the CORS middleware

  try {
    await startServer; // Ensure the server is started
    return apolloServer.createHandler({ path: '/api/graphql' })(req, res);
  } catch (error) {
    console.error('Error starting Apollo Server:', error);
    res.status(500).send('Internal Server Error');
  }
}