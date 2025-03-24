import { PrismaClient } from "@prisma/client";
import { parse } from "csv-parse/sync"; // Install via `pnpm add csv-parse`

const prisma = new PrismaClient();

// CSV Data
const csvData = `
id,name,createdAt,email,updatedAt
449c2f6d-b39e-4cc5-8562-6412cc9e0c5f,John V,2025-03-23 15:03:49.344,1john.v@example.com,2025-03-23 15:03:49.344
`;

// Parse CSV
const users = parse(csvData, { columns: true, skip_empty_lines: true });

async function seedSoulPromises() {
  for (const user of users) {
    const { id, name, email, createdAt, updatedAt } = user;
    // user.id = "449c2f6d-b39e-4cc5-8562-6412cc9e0c5f";
    
    // Check if user exists
    let existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      // Create user if they don't exist
      existingUser = await prisma.user.create({
        data: {
          id,
          name,
          email,
          createdAt: new Date(createdAt),
          updatedAt: new Date(updatedAt),
        },
      });
      console.log(`Created user: ${name}`);
    }

    // Seed soul promises for each user
    const exampleSoulPromises = [
      {
        title: "I promise to be kind to myself",
        description: "I will practice self-compassion and self-care.",
      },
      {
        title: "I promise to be kind to others",
        description: "I will practice empathy and understanding.",
      },
      {
        title: "I promise to be kind to the planet",
        description: "I will practice sustainability and environmental stewardship.",
      },
      {
        title: "Connecting with Nature",
        description: "I commit to spending at least one hour in nature every week, reconnecting with the earth's energy.",
        status: "PENDING",
      },
    ];  

    for (const promise of exampleSoulPromises) {  
      const existingPromise = await prisma.soulpromise.findFirst({
        where: {
          title: promise.title,
          createdById: existingUser.id,
        },  
      });

      if (!existingPromise) {
        //
        await prisma.soulpromise.create({
          data:{
            title: promise.title,
            description: promise.description,
            createdById: existingUser.id,
            createdAt: new Date(),
            updatedAt: new Date(),
          }
        });
        console.log(`Seeded soul promise: ${promise.title} for user ${name}`);
      }
    }
  }
};

seedSoulPromises()
  .catch((error) => console.error("Error seeding soul promises:", error))
  .finally(async () => {
    await prisma.$disconnect();
   });