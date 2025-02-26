import { Context } from 'src/types/context'; // Import types for context (includes Prisma and more)
import { StatusUs, UpdatePromiseInput } from 'src/types/graphql'; // Import custom types for GraphQL

const resolvers = {
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
            editedBy: true, // Include user info for each promise
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
          editedBy: true, // Include the user who edited the promise
        },
      });
      
    },

    testQuery: async () => "This is a test response",
  },
  
  // Mutation resolvers (for modifying data)
  Mutation: {
    // Create a new user in the database
    createUser: async (_: unknown, { input }: { input: { name: string; email: string } }, context: Context) => {
      const { prisma } = context;
      return await prisma.user.create({
        data: {
          name: input.name, // Set the user's name
          email: input.email, // Set the user's email
        },
      });
    },
    
    // Create a new promise (SoulPromise) with associated user (editor)
    createPromise: async (_: unknown, { input }: { input: { title: string; description: string; editedById: string, version: number, status: string } }, context: Context) => {
      const { prisma } = context;

      try {
        const status = input.status as StatusUs; // Convert status to enum type
        return await prisma.soulpromise.create({
          data: {
            title: input.title, // Set the promise's title
            description: input.description, // Set the promise's description
            version: input.version, // Set the promise's version
            status: status, // Set the promise's status
            editedBy: { connect: { id: input.editedById } }, // Connect the promise to the user who edited it
          },
        });
      } catch (error) {
        throw new Error(`Failed to create promise: ${error}`); // Throw error if creation fails
      }
    },
    
    // Update an existing promise
    updatePromise: async (_: unknown, {id, input }: {id:string, input: UpdatePromiseInput }, context: Context) => {
      const { prisma } = context;

      const updatedPromise = await prisma.soulpromise.update({
        where: { id }, // Find promise by ID
        data: {
          title: input.title || undefined, // Update title if provided
          description: input.description || undefined, // Update description if provided
          status: input.status, // Update status if provided
          editedById: input.editedById, // Set the editor's ID (for now, defaults to John)
          version: { increment: 1 }, // Increment the version
        },
      });

      return updatedPromise;
    },
  },

  // Custom resolvers for fields in the User type
  User: {
    // Resolve the `edits` field (all promises edited by the user)
    edits: async (parent: any, _: any, { prisma }: Context) => {
      return await prisma.soulpromise.findMany({
        where: { editedById: parent.id }, // Fetch promises edited by the user
      });
    },
  },

  // Custom resolvers for fields in the PromiseType (SoulPromise) type
  PromiseType: {
    // Resolve the `editedBy` field (find the user who edited the promise)
    editedBy: async (parent: any, _: any, { prisma }: Context) => {
      return await prisma.user.findUnique({ where: { id: parent.editedById } }); // Fetch the user by ID
    },
  },
};

export default resolvers;