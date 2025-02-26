// Import the PrismaClient from the Prisma package
import { PrismaClient } from '@prisma/client';

// Use TypeScript’s global object to store a PrismaClient instance
// This ensures that the same instance is reused across hot reloads in development.
const globalForPrisma = global as unknown as { prisma?: PrismaClient };

// Create a new PrismaClient instance if one does not already exist in the global scope.
// This prevents unnecessary database connections when the server restarts in development mode.
export const prisma = globalForPrisma.prisma ?? new PrismaClient();

// If the app is NOT running in production, store the Prisma instance in the global object.
// This ensures that the Prisma client persists across hot module reloads in development,
// preventing multiple instances from being created and leading to potential connection issues.
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Export the Prisma client so it can be imported and used in other parts of the application.
export default prisma;