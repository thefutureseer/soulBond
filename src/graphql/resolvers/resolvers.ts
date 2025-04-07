import prisma from 'utils/prisma'; // Import Prisma client for database operations
import { Context } from 'src/types/context'; // Import types for context (includes Prisma and more)
import { StatusUs, CreatePromiseInput, SoulPromise, EditsLog } from 'src/types/graphql.d'; // Import custom types for GraphQL
import { Prisma, PrismaClient } from '@prisma/client';

//Set up context, parent, and info for resolvers
const withPrisma = (resolver: Function) => async (parent: any, args: any, context: Context, info: any) => {
  const { prisma } = context;
  return resolver(parent, args, prisma, info);
};

const resolvers: any = {
  // Query resolvers (for fetching data)
  Query: {
  
    //WITHOUT EDITS Fetch all UP TO DATE VERSION promises (SoulPromise) with associated user data
    getPromises: withPrisma(async (_: unknown, __: unknown, prisma: PrismaClient ) => {
      try {
        const getEdits = await prisma.editslog.findMany({
          include: {
            editedBy: true, // Include user who edited the promise
            parent: true, // Include parent promise info
          },
          orderBy: [
            { id: 'asc' }, // Order by parentId in descending order
          ]
        });

        const latestEdits = Object.values(
          getEdits.reduce((accu, edit) => {
            if (!accu[edit.id]){
              accu[edit.id] = edit; 
            }// Keep the latest edit for each parentId)
          return accu;
          }, {} as Record<string, typeof getEdits[0]>)
        )
        return latestEdits;
      }catch (error) {
        console.error("Error fetching latest soulpromises from editslog: ", error);
        throw new Error(`Failed to fetch latest promises from edits log: ${error}`);
      }
    }),
    // Fetch a specific promise by ID
    getPromise: withPrisma(async (_: unknown, { id }: { id: string }, prisma: PrismaClient) => {
      return await prisma.editslog.findUnique({
        where: { id }, // Fetch promise by ID
        include: {
          parent: true, // Include parent promise info
          // changes: true, // Include changes made to the promise 
        },  
      });
      
    }),
  },

  // Mutation resolvers (for modifying data)
  Mutation: {

    // Create a new promise
    createPromise: async (_: unknown, { input }: { input: CreatePromiseInput }, context: Context) => {
      const { prisma } = context;

      console.log("Received input:", input, " and x2 ", input.input); // Log the input object

      // if (!input || !input.title || !in.input.description || !input.createdById) {
      //   throw new Error("Invalid input: input is undefined or malformed");
      // }
      //1) create a new promise to the database as the parent of all parents
      const soulPromise = await prisma.soulpromise.create({
        data: {
          title: input.input.title,
          description: input.input.description,
          createdById: input.input.createdById,
          },
      });

      //2) create a new edit log for the promise at the same time as the first soulpromise
      const editsLog = await prisma.editslog.create({
        data: {
          parentId: soulPromise.id, //Get ID of the parent promise 
          editedByUserId: input.input.createdById,
          changes: {
            title: soulPromise.title,
            description: input.input.description,
            updatedAt: new Date().toISOString(),
          },
        },
      });
      return editsLog; // Return the created editslog from db 
    }
  },

  SoulPromise: {
    //edits data
    edits: async (parent: SoulPromise, { offset, limit }: { offset: number, limit: number }, context: Context) => { 
      const { prisma } = context;
      const edits = await prisma.editslog.findMany({
        where: { parentId: parent.id },
        skip: offset,
        take: limit,
        orderBy: { version: 'desc' },
      });
      return edits;
    }
  },

  EditsLog: { 
    changes: {status: (parent: EditsLog) => parent.changes?.status || StatusUs.PENDING }// Return the status from changes or default to PENDING
  }
};
export default resolvers;