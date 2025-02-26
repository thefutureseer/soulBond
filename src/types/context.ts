import { PrismaClient } from '@prisma/client';
import { ReactNode } from 'react';

export interface Context {
  prisma: PrismaClient;
}

export interface ClientApolloProviderProps {
  children: ReactNode; // Explicitly define children as ReactNode
}