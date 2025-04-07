import prisma from '@prisma/client';
import { ReactNode } from 'react';

export interface Context {
  prisma: prisma.PrismaClient; // Explicitly define prisma as PrismaClient
  // Add any other context properties you need
}

export interface ClientApolloProviderProps {
  children: ReactNode; // Explicitly define children as ReactNode
}