import { Context } from 'src/types/context'; // Import types for context (includes Prisma and more)
import { PromiseType, StatusUs, UpdatePromiseInput, User, Edits } from 'src/types/graphql'; // Import custom types for GraphQL

const resolvers: any = {
  // Query resolvers (for fetching data)
  Query: {
    // Fetch all users from the database
    getUsers: async (_: unknown, __: unknown, context: Context) => {
      const { prisma } = context; // Get Prisma client from context
      return await prisma.user.findMany(); // Fetch all users
    },
    
    // Fetch a specific user by ID
    getUser: async (_: unknown, { id }: { id: string }, context: Context) => {
      const { prisma } = context;
      return await prisma.user.findUnique({ where: { id } }); // Fetch user by ID
    },

    // Fetch all promises (SoulPromise) with associated user data
    getPromises: async (_: unknown, __: unknown, context: Context) => {
      const { prisma } = context;
      try{
        return await prisma.soulpromise.findMany({
          include: {
            createdBy: true, // Include user info for each promise
          },
        });   
      }catch(error){
        console.error("Error resolver fetch soulpromises ", error);
        throw new Error("fail to fetch soul promises")
      }
    },

    
    // Fetch a specific promise by ID
    getPromise: async (_: unknown, { id }: { id: string }, context: Context) => {
      const { prisma } = context;
      return await prisma.soulpromise.findUnique({
        where: { id }, // Fetch promise by ID
        include: {
          edits: true, // Include related edits for the promise
        },
      });
      
    },

    testQuery: async () => "This is a test response",
  },
}

export default resolvers;