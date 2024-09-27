import prisma from '../../app/utils/prisma';

const resolvers = {
  Query: {
    // Fetch all users
    getUsers: async () => {
      return await prisma.user.findMany();
    },
    // Fetch a single user by ID
    getUser: async (_: any, { id }: { id: string }) => {
      return await prisma.user.findUnique({ where: { id } });
    },
    // Fetch all promises
    getPromises: async () => {
      return await prisma.promise.findMany({
        include: {
          editedBy: true, // Include user information for each promise
        },
      });
    },
    // Fetch a single promise by ID
    getPromise: async (_: any, { id }: { id: string }) => {
      return await prisma.promise.findUnique({
        where: { id },
        include: {
          editedBy: true, // Include user information for the promise
        },
      });
    },
  },

  Mutation: {
    // Create a new user
    createUser: async (_: any, { input }: { input: { name: string; email: string } }) => {
      return await prisma.user.create({
        data: {
          name: input.name,
          email: input.email,
        },
      });
    },
    // Create a new promise
    createPromise: async (_: any, { input }: { input: { title: string; description: string; editedById: string } }) => {
      return await prisma.promise.create({
        data: {
          title: input.title,
          description: input.description,
          editedBy: { connect: { id: input.editedById } },
        },
      });
    },
    // Update an existing promise
    updatePromise: async (_: any, { input }: { input: { id: string; title?: string; description?: string; status?: string } }) => {
      return await prisma.promise.update({
        where: { id: input.id },
        data: {
          title: input.title || undefined,
          description: input.description || undefined,
          // status: input.status || undefined,
        },
      });
    },
  },

  // Resolve the `editedBy` field for PromiseType
  PromiseType: {
    editedBy: async (parent: any) => {
      return await prisma.user.findUnique({ where: { id: parent.editedById } });
    },
  },
};

export default resolvers;