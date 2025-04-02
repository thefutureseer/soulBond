import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed editslog data
  const editsLogSeedData = [
    {
      //id: "edit1 generate a unique ID by Prisma to handle it"
      version: 3, //let resolver handle 2nd version of parent promise
      parentId: "bd369beb-5246-48cf-bb0b-6902aa9e1499", // Provided parent ID
      changes: {
        title: "More Empathy and Understanding", // Example title
        description: "I will practice empathy and understanding.", // Provided description
        status: "PENDING", // Default status
      },
      createdAt: new Date(), // Current timestamp
      editedByUserId: "449c2f6d-b39e-4cc5-8562-6412cc9e0c5f", // Provided user ID
    },


  ];

  for (const edit of editsLogSeedData) {
    await prisma.editslog.create({
      data: edit,
    });
  }

  console.log("Seed data inserted successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });