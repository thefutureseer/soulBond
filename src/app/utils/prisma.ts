import { PrismaClient } from '@prisma/client';

// Create a singleton instance of PrismaClient
const prisma = new PrismaClient();

// Export singleton instance
export default prisma;