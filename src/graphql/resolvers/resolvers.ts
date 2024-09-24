import { PrismaClient } from '@prisma/client';
import prisma from 'utils/prisma';

const resolvers = {
  Query: {
    users: async () => {return await prisma.user.findMany()},

  },

};

export default resolvers;