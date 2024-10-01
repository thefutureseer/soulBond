import { PrismaClient } from '@prisma/client';
import { ReactNode } from 'react';

export interface Context {
  prisma: PrismaClient;
 // user?: { id: number; email: string }; // Example user type if you have authentication
}

export interface ClientApolloProviderProps {
  children: ReactNode; // Explicitly define children as ReactNode
}