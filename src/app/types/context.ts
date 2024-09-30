import { PrismaClient } from '@prisma/client';

export interface Context {
  prisma: PrismaClient;
 // user?: { id: number; email: string }; // Example user type if you have authentication
}