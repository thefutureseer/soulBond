import { Context } from '../../app/types/context';
import { StatusUs } from '../../app/types/graphql'

const resolvers = {
  Query: {
    // Fetch all users
    getUsers: async (_: unknown, __: unknown, context: Context) => {
      const { prisma } = context;
      return await prisma.user.findMany();
    },
    
    // Fetch a single user by ID
    getUser: async (_: unknown, { id }: { id: string }, context: Context) => {
      const { prisma } = context;
      return await prisma.user.findUnique({ where: { id } });
    },
    
    // Fetch all promises
    getPromises: async (_: unknown, __: unknown, context: Context) => {
      const { prisma } = context;
      return await prisma.soulpromise.findMany({
        include: {
          editedBy: true, // Include user information for each promise
        },
      });
    },
    
    // Fetch a single promise by ID
    getPromise: async (_: unknown, { id }: { id: string }, context: Context) => {
      const { prisma } = context;
      return await prisma.soulpromise.findUnique({
        where: { id },
        include: {
          editedBy: true, // Include user information for the promise
        },
      });
    },
  },

  Mutation: {
    // Create a new user
    createUser: async (_: unknown, { input }: { input: { name: string; email: string } }, context: Context) => {
      const { prisma } = context;
      return await prisma.user.create({
        data: {
          name: input.name,
          email: input.email,
        },
      });
    },
    
    // Create a new promise
    createPromise: async (_: unknown, { input }: { input: { title: string; description: string; editedById: string } }, context: Context) => {
      const { prisma } = context;
      return await prisma.soulpromise.create({
        data: {
          title: input.title,
          description: input.description,
          editedBy: { connect: { id: input.editedById } }
              },
      });
    },
    
    // Update an existing promise
    updatePromise: async (_: unknown, { input }: { input: { id: string; title?: string; description?: string; status?: string; editedById: string } }, context: Context) => {
      const { prisma } = context;
            // Determine if status is a valid StatusUs enum
      const status = input.status as StatusUs | undefined; // Cast to StatusUs if it exists

      return await prisma.soulpromise.update({
        where: { id: input.id },
        data: {
          title: input.title || undefined,
          description: input.description || undefined,
          status: status,
          editedById: input.editedById, // Set the ID of the user making the edit
        },
      });
    },
  },

  User: {
    // Resolve the `edits` field for User
    edits: async (parent: any, _: any, { prisma }: Context) => {
      return await prisma.soulpromise.findMany({
        where: { editedById: parent.id }, // Fetch promises edited by this user
      });
    },
  },

  PromiseType: {
    // Resolve the `editedBy` field for PromiseType
    editedBy: async (parent: any, _: any, { prisma }: Context) => {
      return await prisma.user.findUnique({ where: { id: parent.editedById } });
    },
  },
};

export default resolvers;